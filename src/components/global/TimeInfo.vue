<template>
  <div class="flex items-center justify-center gap-6 p-4">
    <div class="space-y-7">
      <h3 class="text-5xl font-semibold text-gray-600">
        <span class="text-primary-600">{{ dayName }}</span> {{ dateStr }}
      </h3>

      <h4 class="text-9xl font-semibold text-gray-900">
        <span class="bg-primary-700 rounded-2xl px-2 text-white">{{ hour }}:</span>
        {{ minute }}
      </h4>
    </div>

    <div class="space-y-4">
      <div class="text-primary-600">
        <p class="text-lg font-semibold text-gray-600">Cuaca Kotakulon</p>
        <p class="text-6xl font-semibold">{{ weather.temp }}<sup>o</sup></p>
        <p class="text-base font-medium">{{ weather.description }}</p>
      </div>


      <div class="text-primary-600">
        <p class="text-4xl font-semibold">
          {{ getPrayerLabel(nextPrayerName) }} {{ nextPrayerTime }}
        </p>
        <p class="text-lg font-semibold text-gray-600">-{{ countdown }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'

// Konstanta API
const BASE_URL = 'http://sihat.kemenag.go.id'
const TOKEN_KEY = 'ccc'
const TOKEN = 'ccc'
const ID_PROVINSI = 'c20ad4d76fe97759aa27a0c99bff6710'
const ID_KABUPATEN = '8f53295a73878494e9bc8dd6c3c7104f'

// Waktu & Tanggal
const hour = ref('00')
const minute = ref('00')
const dayName = ref('')
const dateStr = ref('')

// Data Cuaca
const weather = reactive({
  temp: 0,
  description: ''
})

// Jadwal Salat
const prayerTime = reactive<Record<string, string>>({
  Fajr: '',
  Dhuhr: '',
  Asr: '',
  Maghrib: '',
  Isha: ''
})

// Salat berikutnya
const nextPrayerName = ref('')
const nextPrayerTime = ref('')
const countdown = ref('')

// Map nama salat
const prayerNameMap = {
  Fajr: 'Sub',
  Dhuhr: 'Dzu',
  Asr: 'Ash',
  Maghrib: 'Magh',
  Isha: 'Isy'
} as const

type PrayerKey = keyof typeof prayerNameMap

function getPrayerLabel(prayerKey: string): string {
  const today = new Date()
  const isFriday = today.getDay() === 5
  if (prayerKey === 'Dhuhr' && isFriday) return 'Jumt'
  return prayerNameMap[prayerKey as PrayerKey] ?? prayerKey
}

function updateTime() {
  const now = new Date()
  const [h, m] = new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Jakarta'
  }).format(now).split(':')

  hour.value = h
  minute.value = m

  const optionsDay: Intl.DateTimeFormatOptions = { weekday: 'long', timeZone: 'Asia/Jakarta' }
  const optionsDate: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', timeZone: 'Asia/Jakarta' }

  dayName.value = new Intl.DateTimeFormat('id-ID', optionsDay).format(now)
  dateStr.value = new Intl.DateTimeFormat('id-ID', optionsDate).format(now)
}

function updateNextPrayer() {
  const now = new Date()
  const schedule = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha']
  const nowTime = now.getHours() * 60 + now.getMinutes()

  for (const name of schedule) {
    const [h, m] = prayerTime[name].split(':').map(Number)
    const totalMinutes = h * 60 + m
    if (totalMinutes > nowTime) {
      nextPrayerName.value = name
      nextPrayerTime.value = prayerTime[name]
      return
    }
  }

  nextPrayerName.value = 'Fajr'
  nextPrayerTime.value = prayerTime.Fajr
}

function updateCountdown() {
  const [h, m] = nextPrayerTime.value.split(':').map(Number)
  const now = new Date()
  const target = new Date()
  target.setHours(h, m, 0, 0)
  if (target < now) target.setDate(target.getDate() + 1)

  const diff = target.getTime() - now.getTime()
  const hh = String(Math.floor(diff / 3600000)).padStart(2, '0')
  const mm = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0')
  const ss = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0')

  countdown.value = `${hh}:${mm}:${ss}`
}

async function fetchWeather() {
  try {
    const res = await fetch('https://api.bmkg.go.id/publik/prakiraan-cuaca?adm4=32.11.17.1002')
    const json = await res.json()

    const now = new Date()
    const nowTime = now.getTime()

    // Gabungkan semua entri cuaca dari 3 hari
    const allForecasts = json.data[0].cuaca.flat()

    // Cari entri terdekat dari waktu saat ini
    let closest = allForecasts[0]
    let minDiff = Math.abs(new Date(closest.local_datetime).getTime() - nowTime)

    for (const item of allForecasts) {
      const diff = Math.abs(new Date(item.local_datetime).getTime() - nowTime)
      if (diff < minDiff) {
        closest = item
        minDiff = diff
      }
    }

    weather.temp = closest.t
    weather.description = closest.weather_desc
  } catch (e) {
    console.error('Gagal fetch cuaca:', e)
  }
}

async function fetchPrayerTime() {
  try {
    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth() + 1
    const day = now.getDate()
    const todayKey = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`

    const url = `${BASE_URL}/data-shalat/jadwal?${TOKEN_KEY}=${TOKEN}&id_provinsi=${ID_PROVINSI}&id_kabupaten=${ID_KABUPATEN}&tahun=${year}&bulan=${month}`

    const res = await fetch(url)
    const data = await res.json()
    const todayData = data.data[todayKey]

    if (!todayData) {
      console.error('Jadwal tidak ditemukan untuk hari ini:', todayKey)
      return
    }

    prayerTime.Fajr = todayData.subuh
    prayerTime.Dhuhr = todayData.dzuhur
    prayerTime.Asr = todayData.ashar
    prayerTime.Maghrib = todayData.maghrib
    prayerTime.Isha = todayData.isya

    updateNextPrayer()
  } catch (e) {
    console.error('Gagal fetch jadwal salat:', e)
  }
}

onMounted(() => {
  updateTime()
  fetchWeather()
  fetchPrayerTime()

  setInterval(updateTime, 1000)
  setInterval(() => {
    updateNextPrayer()
    updateCountdown()
  }, 1000)

  // Refresh cuaca tiap 10 menit
  setInterval(fetchWeather, 10 * 60 * 1000)
})
</script>

<template>
  <div class="min-h-screen py-6 bg-gray-50">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <!-- Left Column (Offers + Contracts) -->
        <div class="space-y-6">
          <!-- Offer Section -->
          <div class="bg-white rounded-lg shadow p-6">
            <h1 class="text-lg font-semibold text-gray-800">Offer</h1>
            <p class="text-sm text-gray-500 mb-3">List penawaran berlangsung</p>

            <div class="w-full overflow-x-auto">
              <AppTable :data="offerTableData" class="w-full h-full">
                <template v-if="offerTableData.body.length > 0">
                  <tr
                    v-for="(row, rowIndex) in offerTableData.body"
                    :key="rowIndex"
                    :class="rowIndex % 2 !== 0 ? 'bg-gray-50' : ''"
                  >
                    <td
                      v-for="(col, colIndex) in row"
                      :key="colIndex"
                      :class="[
                        'text-center px-6 py-3',
                        colIndex === row.length - 1 ? 'min-w-[180px]' : ''
                      ]"
                    >
                      <template v-if="offerTableData.head[colIndex] === 'Status'">
                        <AppBadge
                          :text="col"
                          :variant="col === 'Done' ? 'success' : 'default'"
                        />
                      </template>
                      <template v-else>
                        {{ col }}
                      </template>
                    </td>
                  </tr>
                </template>
                <template v-else>
                  <tr>
                    <td
                      :colspan="offerTableData.head.length"
                      class="text-center text-sm text-gray-500 py-4"
                    >
                      Data Tidak Tersedia
                    </td>
                  </tr>
                </template>
              </AppTable>
            </div>
          </div>

          <!-- Contract Section -->
          <div class="bg-white rounded-lg shadow p-6">
            <h1 class="text-lg font-semibold text-gray-800">Contract</h1>
            <p class="text-sm text-gray-500 mb-3">List kontrak berlangsung</p>

            <div class="w-full overflow-x-auto">
              <AppTable :data="contractTableData" class="w-full h-full">
                <template v-if="contractTableData.body.length > 0">
                  <tr
                    v-for="(row, rowIndex) in contractTableData.body"
                    :key="rowIndex"
                    :class="rowIndex % 2 !== 0 ? 'bg-gray-50' : ''"
                  >
                    <td
                      v-for="(col, colIndex) in row"
                      :key="colIndex"
                      :class="[
                        'text-center px-6 py-3',
                        colIndex === row.length - 1 ? 'min-w-[180px]' : ''
                      ]"
                    >
                      <template v-if="contractTableData.head[colIndex] === 'Status'">
                        <AppBadge
                          :text="col"
                          :variant="col === 'Done' ? 'success' : 'default'"
                        />
                      </template>
                      <template v-else>
                        {{ col }}
                      </template>
                    </td>
                  </tr>
                </template>
                <template v-else>
                  <tr>
                    <td
                      :colspan="contractTableData.head.length"
                      class="text-center text-sm text-gray-500 py-4"
                    >
                      Data Tidak Tersedia
                    </td>
                  </tr>
                </template>
              </AppTable>
            </div>
          </div>
        </div>



        <!-- Right Column (Time, Weather & Prayer) -->
        <div class="bg-white rounded-lg shadow p-6 h-full flex items-center justify-center">
          <div class="flex flex-col sm:flex-row justify-center items-center gap-10 text-center">
            <!-- Waktu dan Cuaca -->
            <div class="space-y-7">
              <h3 class="text-5xl font-semibold text-gray-600">
                <span class="text-primary-600">{{ dayName }}</span> {{ dateStr }}
              </h3>
              <h4 class="text-9xl font-semibold text-gray-900">
                <span class="bg-primary-700 rounded-2xl px-2 text-white">{{ hour }}:</span>{{ minute }}
              </h4>
            </div>

            <div class="space-y-4 text-primary-600">
              <p class="text-lg font-semibold text-gray-600">Cuaca Kotakulon</p>
              <p class="text-6xl font-semibold">{{ weather.temp }}<sup>o</sup></p>
              <p class="text-base font-medium">{{ weather.description }}</p>

              <div class="pt-6 space-y-1">
                <p class="text-lg font-semibold text-gray-600">Menuju Adzan</p>
                <p class="text-4xl font-bold">
                  {{ getPrayerLabel(nextPrayerName) }} - {{ nextPrayerTime }}
                </p>
                <p class="text-lg font-semibold text-gray-800">⏳ {{ countdown }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Progress Section -->
      <div class="w-full mt-6">
        <div class="flex items-start gap-2 mb-4">
          <div class="w-full">
            <h1 class="text-lg font-semibold text-gray-800">Progress</h1>
            <p class="text-xs text-gray-500 mb-4">Progress penawaran dan kontrak hari ini</p>

            <div v-if="hasProject" class="space-y-4 w-full">
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 w-full">
                <ProgressCard
                  v-for="project in projects"
                  :key="project.id"
                  :title="project.title"
                  :description="project.description"
                  :progress="project.progress"
                  :range="project.range"
                />
              </div>
            </div>

            <div v-else class="flex flex-col items-center text-center space-y-2 py-6">
              <MonitoringProjectIcon class="w-10 h-10 text-green-700" />
              <h1 class="text-xl font-semibold text-gray-800">Belum Projek Masuk</h1>
              <p class="text-sm text-gray-500">Yahh, belum ada projek masuk nihh</p>
            </div>
          </div>
        </div>
      </div>

      <!-- BreakScreen -->
      <BreakScreen v-if="showBreakScreen" :salat="breakPrayer" />

    </div>
  </div>

</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch } from 'vue'
import ProgressCard from '@/components/cards/ProgressCard.vue'

import { fetchOffersOrContact } from '@/API'
import type { TableDataOfferOrContract } from '@/types/offerOrContract'
import { fetchProjects } from '@/API'
import type { Project } from '@/types/projects'

const nextPrayerName = ref('')
const nextPrayerTime = ref('')
const countdown = ref('')

const showBreakScreen = ref(false)
const breakSound = ref('')
const breakPrayer = ref('')
let hasTriggeredAdzan = false

const offerTableData = ref<TableDataOfferOrContract>({ head: [], body: [] })
const contractTableData = ref<TableDataOfferOrContract>({ head: [], body: [] })

const loading = ref(true)
const error = ref<string | null>(null)

const loadTableData = async () => {
  loading.value = true
  try {
    const offerRes = await fetchOffersOrContact('offer')
    if (offerRes.status) {
      offerTableData.value = offerRes.data
    }

    const contractRes = await fetchOffersOrContact('contract')
    if (contractRes.status) {
      contractTableData.value = contractRes.data
    }
  } catch (err: any) {
    console.error('Gagal memuat tabel:', err)
    error.value = err.message || 'Terjadi kesalahan'
  } finally {
    loading.value = false
  }
}


const projects = ref<Project[]>([])
const hasProject = ref(false)

const loadProjects = async () => {
  try {
    const res = await fetchProjects()
    if (res.status && res.data.length > 0) {
      projects.value = res.data
      hasProject.value = true
    } else {
      hasProject.value = false
    }
  } catch (err) {
    hasProject.value = false
    console.error('Gagal memuat data proyek:', err)
  } finally {
    loading.value = false
  }
}



const BASE_URL = import.meta.env.VITE_BASE_URL
const TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY
const TOKEN = import.meta.env.VITE_TOKEN
const ID_PROVINSI = import.meta.env.VITE_ID_PROVINSI
const ID_KABUPATEN = import.meta.env.VITE_ID_KABUPATEN

const hour = ref('00')
const minute = ref('00')
const dayName = ref('')
const dateStr = ref('')

const weather = reactive({
  temp: 0,
  description: ''
})

const prayerTime = reactive<Record<string, string>>({
  Fajr: '',
  Dhuhr: '',
  Asr: '',
  Maghrib: '',
  Isha: ''
})


const prayerNameMap = {
  Fajr: 'Subuh',
  Dhuhr: 'Dzuhur',
  Asr: 'Ashar',
  Maghrib: 'Maghrib',
  Isha: 'Isya'
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

watch(countdown, (value) => {
  if (value === '00:00:00' && !showBreakScreen.value && !hasTriggeredAdzan) {
    hasTriggeredAdzan = true
    showBreakScreen.value = true
    breakPrayer.value = getPrayerLabel(nextPrayerName.value)

    setTimeout(() => {
      showBreakScreen.value = false
      breakSound.value = ''
      breakPrayer.value = ''
      hasTriggeredAdzan = false
    }, 4 * 60 * 1000)
  }
})

async function fetchWeather() {
  try {
    const res = await fetch('https://api.bmkg.go.id/publik/prakiraan-cuaca?adm4=32.11.17.1002')
    const json = await res.json()
    const now = new Date()
    const nowTime = now.getTime()
    const allForecasts = json.data[0].cuaca.flat()
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

  setInterval(fetchWeather, 10 * 60 * 1000)
  loadTableData()
  loadProjects()
})
</script>

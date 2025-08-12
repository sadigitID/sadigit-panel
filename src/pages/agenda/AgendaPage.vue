<template>
  <main class="min-h-screen w-full px-16 py-12">
    <div class="flex gap-5">
      <!-- Kolom kiri -->
      <div class="w-[60%] space-y-12">
        <ServerAgenda />
        <PresenceAgenda />
      </div>

      <!-- Kolom kanan -->
      <div class="w-[40%] space-y-4">
        <SectionHeader
          :icon="PhVideoConference"
          title="Agenda"
          subtitle="List agenda harian"
        />

        <!-- Scroll tanggal pakai tombol -->
        <div class="relative">
          <!-- Tombol kiri -->
          <button
            class="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white border rounded-full shadow p-1"
            @click="scrollLeft"
          >
            ‹
          </button>

          <!-- List tanggal -->
          <div
            ref="scrollContainer"
            class="flex gap-2 overflow-x-hidden scroll-smooth px-8"
          >
            <DateItem
              v-for="(item, index) in daysRange"
              :key="index"
              :date-number="item.dateNumber"
              :date-text="item.dateText"
              :variant="item.fullDate.isSame(selectedDate, 'day') ? 'active' : 'default'"
              @select="selectedDate = item.fullDate"
            />
          </div>

          <!-- Tombol kanan -->
          <button
            class="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white border rounded-full shadow p-1"
            @click="scrollRight"
          >
            ›
          </button>
        </div>

        <!-- List agenda -->
        <div class="p-4">
          <div class="relative space-y-3" v-if="filteredAgenda.length > 0">
            <AgendaCard
              v-for="(item, index) in filteredAgenda"
              :key="index"
              :title="item.title"
              :description="item.description"
              :time="item.time"
              :participant-type="item.participant.type"
              :participants="item.participant.list"
            />
          </div>

          <!-- Jika kosong -->
          <EmptyState
            v-else
            :icon="PhCalendarDots"
            title="Agenda Kosong"
            description="Tidak ada agenda yang ditemukan"
          />
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, computed, onMounted  } from 'vue'
import dayjs from 'dayjs'
import { PhCalendarDots, PhVideoConference } from '@phosphor-icons/vue'

import AgendaCard from '@/components/cards/AgendaCard.vue'
import DateItem from '@/components/DateItem.vue'
import PresenceAgenda from '@/pages/agenda/PresenceAgenda.vue'
import ServerAgenda from '@/pages/agenda/ServerAgenda.vue'

import { fetchAgendaList } from '@/API'
import type { AgendaItem } from '@/types/services/agenda-service'

// Data agenda
const data = ref<AgendaItem[]>([])

// Tanggal hari ini dan yang dipilih
const today = dayjs()
const selectedDate = ref(today)

// List tanggal ±7 hari
const daysRange = computed(() => {
  const start = today.subtract(7, 'day')
  const end = today.add(7, 'day')
  const range = []

  for (let i = 0; i <= end.diff(start, 'day'); i++) {
    const date = start.add(i, 'day')
    range.push({
      dateNumber: Number(date.format('DD')),
      dateText: date.format('ddd'),
      fullDate: date
    })
  }

  return range
})

// Filter berdasarkan tanggal
const filteredAgenda = computed(() => {
  return data.value.filter((item: AgendaItem) =>
    dayjs(item.date).isSame(selectedDate.value, 'day')
  )
})

// Scroll container dan tombol navigasi
const scrollContainer = ref<HTMLElement | null>(null)

const scrollLeft = () => {
  scrollContainer.value?.scrollBy({ left: -150, behavior: 'smooth' })
}

const scrollRight = () => {
  scrollContainer.value?.scrollBy({ left: 150, behavior: 'smooth' })
}

onMounted(async () => {
  try {
    const res = await fetchAgendaList()
    if (res.status) {
      data.value = res.data
    } else {
      console.error(res.message)
    }
  } catch (err) {
    console.error('Gagal fetch agenda:', err)
  }
})
</script>

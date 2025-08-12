<template>
  <section class="space-y-4">
    <SectionHeader :icon="PhDresser" title="Server" subtitle="Total 10 server" />

    <div class="space-y-4 p-4">
      <div class="flex gap-4">
        <div
          class="bg-primary-50 border-primary-100 flex items-center gap-2 rounded-md border px-2 py-1"
        >
          <PhArrowUp class="text-primary-500" :size="20" />

          <span class="text-2xl font-semibold text-gray-600">{{ totalActive }}</span>
        </div>

        <div class="flex items-center gap-2 rounded-md border border-red-100 bg-red-50 px-2 py-1">
          <PhArrowDown class="text-red-500" :size="20" />

          <span class="text-2xl font-semibold text-gray-600">{{ totalDown }}</span>
        </div>
      </div>

      <div class="grid grid-cols-3 gap-x-6 gap-y-4" v-if="data.length > 0">
        <ServerCard
          v-for="(item, index) in data"
          :key="index"
          :name="item.name"
          :status="item.status"
        />
      </div>

      <EmptyState
        v-else
        :icon="PhDresser"
        title="Server Aman"
        description="Semua server dalam kondisi UP"
      />
    </div>
  </section>
</template>

<script setup lang="ts">

import { ref, computed, onMounted } from 'vue'
import { PhArrowDown, PhArrowUp, PhDresser } from '@phosphor-icons/vue'

import type { ServerResponse } from '@/types/services/server-service'

import ServerCard from '@/components/cards/ServerCard.vue'

import { fetchServer } from '@/API'

const data = ref<ServerResponse[]>([])

// Hitung total server UP (active)
const totalActive = computed(() =>
  data.value.filter(item => item.status === 'active').length
)

// Hitung total server DOWN
const totalDown = computed(() =>
  data.value.filter(item => item.status === 'down').length
)
// Ambil data saat mounted
onMounted(async () => {
  const res = await fetchServer()
  if (res.status) {
    data.value = res.data
  }
})
</script>

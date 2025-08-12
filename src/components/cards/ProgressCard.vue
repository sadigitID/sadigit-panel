<template>
  <div class="flex items-center gap-6 rounded-2xl border-2 mr-2 mb-2 border-gray-100 bg-white p-4">
    <div class="relative h-24 w-48">
      <svg class="absolute top-0 left-0" viewBox="0 0 100 50">
        <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#F5F9F4" stroke-width="12" />
        <path
          d="M 10 50 A 40 40 0 0 1 90 50"
          fill="none"
          stroke="#3D9130"
          stroke-width="12"
          stroke-dasharray="126"
          :stroke-dashoffset="progressOffset"
        />
      </svg>
      <div
        class="text-primary-600 absolute inset-0 top-12 flex items-center justify-center text-2xl font-semibold"
      >
        {{ progress }}%
      </div>
    </div>

    <div class="space-y-2">
      <AppBadge :icon="PhCalendarBlank" :text="`Range: ${range}`" />

      <div>
        <h5 class="text-2xl font-semibold text-gray-700">{{ title }}</h5>
        <p class="text-lg font-medium text-gray-500">{{ description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PhCalendarBlank } from '@phosphor-icons/vue'
import { computed } from 'vue'

import type { ProgressCardProps } from '@/types/components/cards/progress-card'

const { title, description, range, progress = 0 } = defineProps<ProgressCardProps>()

const progressOffset = computed(() => {
  const maxOffset = 126

  return maxOffset - (progress / 100) * maxOffset
})
</script>

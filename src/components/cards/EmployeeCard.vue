<template>
  <div class="flex items-center gap-3 rounded-lg border-2 border-neutral-100 bg-white p-3">
    <img
      :src="image"
      alt="profile"
      class="aspect-square h-16 w-16 rounded-md object-cover"
      @error="handleImageError"
    />

    <div>
      <div class="flex gap-1">
        <AppBadge :text="status" :icon="PhCalendarBlank" :variant="statusVariant" />
        <AppBadge :icon="PhBroom" v-if="isOnCleaningDuty" />
      </div>

      <h5 class="mt-1 text-xl font-semibold text-gray-700">{{ name }}</h5>
      <p class="text-sm font-normal text-gray-500">{{ description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PhBroom, PhCalendarBlank } from '@phosphor-icons/vue'
import { computed } from 'vue'

import defaultImage from '@/assets/images/default-profile.png'

import type { EmployeeCardProps } from '@/types/components/cards/employee-card'

const {
  imagePath,
  name,
  description,
  status,
  isOnCleaningDuty = false
} = defineProps<EmployeeCardProps>()

const image = computed(() => {
  return imagePath || defaultImage
})

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement
  target.src = defaultImage
}

const statusVariant = computed(() => {
  switch (status) {
    case 'Present':
      return 'success'
    case 'Absent':
      return 'danger'
    case 'Late':
    case 'WFH':
      return 'warning'
    default:
      return 'default'
  }
})
</script>

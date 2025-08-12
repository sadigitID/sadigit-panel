<template>
  <div
    class="flex w-fit items-center justify-center gap-1 rounded-full border px-3 py-1"
    :class="variantClass"
  >
    <component :is="icon" :size="18" weight="duotone" v-if="icon" />
    <span v-if="text" class="text-sm font-semibold">{{ text }}</span>
  </div>
</template>

<script setup lang="ts">
import type { AppBadgeProps } from '@/types/components/global/app-badge'
import { computed } from 'vue'

const { text, icon, variant = 'default' } = defineProps<AppBadgeProps>()

const variantClass = computed(() => {
  switch (variant) {
    case 'success':
      return 'bg-primary-50 text-primary-600 border-primary-600'
    case 'warning':
      return 'bg-amber-50 text-amber-600 border-amber-600'
    case 'danger':
      return 'bg-red-50 text-red-600 border-red-600'
    default:
      return 'bg-gray-50 text-gray-600 border-gray-600'
  }
})
</script>

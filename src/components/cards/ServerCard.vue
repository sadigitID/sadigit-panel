<template>
  <div
    class="flex items-center gap-2 rounded-lg border-2 px-3 py-2 text-gray-900"
    :class="variantClass.container"
  >
    <PhDresser :size="48" weight="duotone" class="text-gray-800" />

    <div class="flex grow flex-col">
      <h5 class="text-xl font-semibold text-gray-700">{{ name }}</h5>

      <div class="flex items-center gap-2">
        <span class="relative flex size-3">
          <span
            class="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
            :class="variantClass.animatedPing"
          ></span>
          <span
            class="relative inline-flex size-3 rounded-full"
            :class="variantClass.staticPing"
          ></span>
        </span>
        <span class="text-xl font-normal" :class="variantClass.text">{{ statusName }}</span>
      </div>
    </div>

    <PhCaretRight :size="16" />
  </div>
</template>

<script setup lang="ts">
import { PhCaretRight, PhDresser } from '@phosphor-icons/vue'
import { computed } from 'vue'

import type { ServerCardProps } from '@/types/components/cards/server-card'

const { name, status = 'active' } = defineProps<ServerCardProps>()

const statusName = computed(() => {
  return status === 'active' ? 'Active' : 'Down'
})

const variantClass = computed(() => {
  if (status === 'active') {
    return {
      container: 'border-primary-500 bg-primary-50',
      staticPing: 'bg-primary-600',
      animatedPing: 'bg-primary-400',
      text: 'text-primary-900'
    }
  } else {
    return {
      container: 'border-red-500 bg-red-50',
      staticPing: 'bg-red-600',
      animatedPing: 'bg-red-400',
      text: 'text-red-900'
    }
  }
})
</script>

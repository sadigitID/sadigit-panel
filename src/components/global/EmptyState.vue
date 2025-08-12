<template>
  <div class="w-full">
    <div class="flex flex-col items-center justify-center gap-2">
      <component :is="icon" :size="64" weight="duotone" class="text-primary-800" />

      <article class="text-center">
        <h3 class="text-2xl font-semibold text-gray-900">{{ title }}</h3>
        <span class="text-base font-normal text-gray-500">{{ description }}</span>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { EmptyStateProps } from '@/types/components/global/empty-state'

const { title, description, icon } = defineProps<EmptyStateProps>()
</script>

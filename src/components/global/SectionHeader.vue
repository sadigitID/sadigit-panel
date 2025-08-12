<template>
  <div class="flex items-center gap-2">
    <component :is="icon" :size="50" weight="duotone" class="text-primary-800" />

    <div>
      <h2 class="text-3xl font-semibold text-gray-900">{{ title }}</h2>
      <span class="text-lg font-medium text-gray-600">{{ subtitle }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SectionHeaderProps } from '@/types/components/global/section-header'

const { icon, title, subtitle } = defineProps<SectionHeaderProps>()
</script>

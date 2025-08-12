<template>
  <div class="flex flex-col gap-4">
    <header class="flex justify-center gap-1.5">
      <h3 class="text-3xl font-semibold" :class="variantClass">{{ title }}</h3>
      <AppBadge :text="data.length.toString()" :variant="variant" />
    </header>

    <div class="space-y-4" v-if="data.length">
      <ProjectCard
        v-for="(item, index) in data"
        :key="index"
        :title="item.title"
        :comments="item.comments"
        :badges="item.badges"
        :pics="item.PICs"
        :description="item.description"
        :due-date="item.due_date"
      />
    </div>

    <div v-else class="flex flex-col items-center justify-center gap-2">
      <PhCheck :size="64" weight="duotone" class="text-primary-800" />

      <div class="space-y-1 text-center">
        <h5 class="text-2xl font-semibold text-gray-900">{{ emptyStateTitle }}</h5>
        <p class="text-base font-normal text-gray-500">{{ emptyStateDescription }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PhCheck } from '@phosphor-icons/vue'
import { computed } from 'vue'

import type { ProjectBoardProps } from '@/types/components/project-board'

import ProjectCard from '@/components/cards/ProjectCard.vue'

const {
  data,
  title,
  emptyStateTitle,
  emptyStateDescription,
  variant = 'default'
} = defineProps<ProjectBoardProps>()

const variantClass = computed(() => {
  switch (variant) {
    case 'success':
      return 'text-primary-700'
    case 'warning':
      return 'text-amber-700'
    case 'danger':
      return 'text-red-700'
    default:
      return 'text-slate-700'
  }
})
</script>

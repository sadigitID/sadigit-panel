<template>
  <div class="space-y-4 rounded-2xl border-2 p-4" :class="cardVariant">
    <div class="space-y-1">
      <div class="flex flex-wrap gap-1">
        <AppBadge
          v-for="(badge, index) in badgesFormatted"
          :key="index"
          :icon="badge.icon"
          :text="badge.text"
          :variant="badge.variant"
        />
      </div>

      <h5 class="text-2xl font-semibold text-gray-700">{{ title }}</h5>
      <p class="text-lg font-medium text-gray-500">{{ description }}</p>
    </div>

    <div class="flex flex-wrap gap-4">
      <div class="flex space-x-[-12px]">
        <img
          v-for="(PIC, index) in PICsFormatted.PICs"
          :key="index"
          :src="PIC"
          alt="PIC"
          class="h-12 w-12 rounded-full border-2 border-gray-200 object-cover"
        />

        <div
          v-if="PICsFormatted.count > 0"
          class="flex h-12 w-12 items-center justify-center rounded-full border-2 border-gray-200 bg-white"
        >
          <span class="text-base font-semibold text-slate-700">+{{ PICsFormatted.count }}</span>
        </div>
      </div>

      <div class="flex items-center gap-1">
        <AppBadge :icon="PhCalendarBlank" :text="`Due To: ${dueDateFormatted}`" />
        <AppBadge :icon="PhChatCircleDots" :text="comments" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatToDay, formatToMonthString } from '@/utils/time'
import { PhCalendarBlank, PhChatCircleDots, PhFlagBannerFold, PhWarning } from '@phosphor-icons/vue'
import { computed } from 'vue'

import type { PICsFormattedModel, ProjectCardProps } from '@/types/components/cards/project-card'
import type { AppBadgeProps } from '@/types/components/global/app-badge'
import type { BadgeTypes } from '@/types/services/project-board-service'

const { title, description, dueDate, comments, pics, badges } = defineProps<ProjectCardProps>()

const dueDateFormatted = computed(() => {
  const date = new Date(dueDate)

  return `${formatToDay(date)} ${formatToMonthString(date)}`
})

const PICsFormatted = computed<PICsFormattedModel>(() => {
  const maxPICs = 3

  return {
    PICs: pics.slice(0, maxPICs),
    count: pics.length - maxPICs
  }
})

const getBadgeVariant = (badge: BadgeTypes) => {
  switch (badge) {
    case 'Urgent':
    case 'Error':
      return 'danger'
    case 'Maintenance':
      return 'warning'
  }
}

const badgesFormatted = computed<AppBadgeProps[]>(() => {
  return badges.map((badge) => {
    return {
      icon: badge === 'Maintenance' || badge === 'Error' ? PhWarning : PhFlagBannerFold,
      text: badge,
      variant: getBadgeVariant(badge)
    }
  })
})

const cardVariant = computed(() => {
  const variantMap: Record<string, string> = {
    Error: 'border-orange-100 bg-orange-50',
    Maintenance: 'border-yellow-100 bg-yellow-50'
  }

  for (const key of Object.keys(variantMap)) {
    if (badges.includes(key as BadgeTypes)) {
      return variantMap[key]
    }
  }

  return 'border-primary-100 bg-primary-50'
})
</script>

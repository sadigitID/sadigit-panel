<template>
  <div class="space-y-2 rounded-2xl border-2 p-4" :class="variantClass.container">
    <div class="text-primary-800 flex items-center gap-6 text-lg font-bold">
      <span class="flex items-center gap-1">
        <PhClock :size="20" weight="duotone" />
        <span>{{ time.start }} - {{ time.end }}</span>
      </span>

      <span class="flex items-center gap-1">
        <PhUsers :size="20" weight="duotone" />
        <span>{{ participants.length }} Orang</span>
      </span>
    </div>

    <div class="space-y-3">
      <div class="space-y-1">
        <h5 class="text-2xl font-semibold text-gray-700">{{ title }}</h5>
        <p class="text-lg font-medium text-gray-500">{{ description }}</p>
      </div>

      <div class="flex gap-1" v-if="participantType === 'badges'">
        <AppBadge
          v-for="(participant, index) in participants"
          :key="index"
          :text="participant"
          :icon="PhUsers"
          variant="success"
        />
      </div>

      <div v-else class="flex space-x-[-12px]">
        <img
          v-for="(participant, index) in participants"
          :key="index"
          :src="participant"
          alt="profile"
          class="h-12 w-12 rounded-full border-2 object-cover"
          :class="variantClass.participant"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PhClock, PhUsers } from '@phosphor-icons/vue'
import { computed } from 'vue'

import type { AgendaCardProps } from '@/types/components/cards/agenda-card'

const {
  title,
  description,
  participants,
  participantType,
  time,
  variant = 'default'
} = defineProps<AgendaCardProps>()

const variantClass = computed(() => {
  if (variant === 'active') {
    return {
      container: 'border-primary-500',
      participant: 'border-primary-100'
    }
  } else {
    return {
      container: 'bg-white border-gray-100',
      participant: 'border-primary-50'
    }
  }
})
</script>

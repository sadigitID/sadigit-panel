<template>
  <div
    class="w-fit space-y-1 rounded-sm border px-3 py-2 text-center cursor-pointer"
    :class="variantClass.container"
    @click="$emit('select')"
  >
    <p class="text-xs font-semibold" :class="variantClass.text">{{ dateText }}</p>
    <p class="text-base font-semibold" :class="variantClass.number">{{ dateNumber }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { DateItemProps } from '@/types/components/date-item'

const { dateNumber, dateText, variant = 'default' } = defineProps<DateItemProps>()
defineEmits(['select'])

const variantClass = computed(() => {
  return variant === 'active'
    ? {
        container: 'border-primary-500 bg-primary-50',
        text: 'text-primary-400',
        number: 'text-primary-800'
      }
    : {
        container: 'border-gray-200 bg-white',
        text: 'text-gray-600',
        number: 'text-gray-600'
      }
})
</script>

<style scoped></style>

<template>
  <div class="flex items-center gap-2 rounded-lg px-6 py-4"
  :class="colorClass">
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
      <path
        d="M31 15C31 15.9193 30.8189 16.8295 30.4672 17.6788C30.1154 18.5281 29.5998 19.2997 28.9497 19.9497C28.2997 20.5998 27.5281 21.1154 26.6788 21.4672C25.8295 21.8189 24.9193 22 24 22C23.0807 22 22.1705 21.8189 21.3212 21.4672C20.4719 21.1154 19.7003 20.5998 19.0503 19.9497C18.4002 19.2997 17.8846 18.5281 17.5328 17.6788C17.1811 16.8295 17 15.9193 17 15C17 13.1435 17.7375 11.363 19.0503 10.0503C20.363 8.7375 22.1435 8 24 8C25.8565 8 27.637 8.7375 28.9497 10.0503C30.2625 11.363 31 13.1435 31 15Z"
        fill="white"
      />
      <path
        opacity="0.4"
        d="M39 15C39 16.3261 38.4732 17.5979 37.5355 18.5355C36.5979 19.4732 35.3261 20 34 20C32.6739 20 31.4021 19.4732 30.4645 18.5355C29.5268 17.5979 29 16.3261 29 15C29 13.6739 29.5268 12.4021 30.4645 11.4645C31.4021 10.5268 32.6739 10 34 10C35.3261 10 36.5979 10.5268 37.5355 11.4645C38.4732 12.4021 39 13.6739 39 15ZM9 15C9 16.3261 9.52678 17.5979 10.4645 18.5355C11.4021 19.4732 12.6739 20 14 20C15.3261 20 16.5979 19.4732 17.5355 18.5355C18.4732 17.5979 19 16.3261 19 15C19 13.6739 18.4732 12.4021 17.5355 11.4645C16.5979 10.5268 15.3261 10 14 10C12.6739 10 11.4021 10.5268 10.4645 11.4645C9.52678 12.4021 9 13.6739 9 15Z"
        fill="white"
      />
      <path
        d="M36 33C36 36.866 30.628 40 24 40C17.372 40 12 36.866 12 33C12 29.134 17.372 26 24 26C30.628 26 36 29.134 36 33Z"
        fill="white"
      />
      <path
        opacity="0.4"
        d="M44 33C44 35.76 40.42 38 36 38C31.58 38 28 35.76 28 33C28 30.24 31.58 28 36 28C40.42 28 44 30.24 44 33ZM4 33C4 35.76 7.58 38 12 38C16.42 38 20 35.76 20 33C20 30.24 16.42 28 12 28C7.58 28 4 30.24 4 33Z"
        fill="white"
      />
    </svg>

    <div class="text-white">
      <h5 class="text-base font-normal">{{ title }}</h5>
      <p class="text-lg font-semibold">{{ total }} Pengguna</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { UserTotalCardProps } from '@/types/components/cards/user-total-card'

const { title, total, color =  'bg-primary-700'} = defineProps<UserTotalCardProps>()

const colorClass = computed(() => {
  switch (color) {
    case 'bg-blue-700':
      return 'bg-primary-100'
    case 'bg-amber-700':
      return 'bg-amber-700'
    case 'bg-red-100':
      return 'bg-red-700'
    case 'bg-green-100':
      return 'bg-green-700'
    default:
      return 'bg-gray-700'
  }
})
</script>

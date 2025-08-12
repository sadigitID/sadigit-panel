<template>
  <transition
    enter-active-class="transition ease-out duration-300"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition ease-in duration-200"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="isShow"
      class="fixed inset-0 z-50 bg-white flex items-center justify-center"
    >
      <div class="text-center space-y-6">
        <h1 class="text-4xl font-bold text-gray-900">Waktunya Sholat</h1>

        <div class="flex items-center justify-center gap-4 text-primary-600">
          <PhMosque size="148" weight="duotone" />
          <h2 class="text-9xl font-semibold">{{ salat }}</h2>
        </div>

        <p class="text-2xl font-semibold text-gray-600">
          Utamakan Sholat Terlebih Dahulu!
        </p>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { PhMosque } from '@phosphor-icons/vue'

// Import audio dari public folder
import adzan from '/audio/adzhan.wav'
import adzanSubuh from '/audio/adzan-subuh.wav'

const props = defineProps<{
  salat: string
}>()

const isShow = ref(false)
let audio: HTMLAudioElement | null = null

const handleAudioEnd = () => {
  isShow.value = false
  if (audio) {
    audio.removeEventListener('ended', handleAudioEnd)
    audio = null
  }
}

watch(
  () => props.salat,
  (val) => {
    if (val) {
      isShow.value = true

      // Pilih audio berdasarkan nama salat
      const isSubuh = val.toLowerCase() === 'subuh'
      const selectedAudio = isSubuh ? adzanSubuh : adzan

      audio = new Audio(selectedAudio)

      // Tambahkan event listener untuk ketika audio selesai
      audio.addEventListener('ended', handleAudioEnd)

      // Tambahkan juga event listener untuk error
      audio.addEventListener('error', () => {
        console.error('Gagal memutar audio')
        handleAudioEnd()
      })

      audio.play().catch((e) => {
        console.warn('Audio play blocked:', e)
        handleAudioEnd()
      })
    }
  },
  { immediate: true }
)
</script>

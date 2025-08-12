<script setup lang="ts">
import { ref, watch, onUnmounted } from 'vue';

interface Props {
  show: boolean;
  payload: any;
}

const props = defineProps<Props>();
const emit = defineEmits(['close']);

const visible = ref(props.show);
const countdown = ref(30); // hitung mundur 30 detik
let closeTimeout: number | undefined;
let countdownInterval: number | undefined;

// Watch agar modal auto-close dalam 30 detik
watch(() => props.show, (newVal) => {
  visible.value = newVal;
  if (newVal) {
    countdown.value = 30;

    // Bersihkan jika ada interval sebelumnya
    if (countdownInterval) clearInterval(countdownInterval);
    if (closeTimeout) clearTimeout(closeTimeout);

    // Interval untuk mengurangi countdown tiap detik
    countdownInterval = setInterval(() => {
      if (countdown.value > 0) {
        countdown.value -= 1;
      }
    }, 1000) as unknown as number;

    // Tutup modal setelah 30 detik
    closeTimeout = setTimeout(() => {
      emit('close');
    }, 30000) as unknown as number;
  } else {
    // Reset jika modal ditutup
    if (countdownInterval) clearInterval(countdownInterval);
  }
});

// Bersihkan timer saat komponen dihancurkan
onUnmounted(() => {
  if (closeTimeout) clearTimeout(closeTimeout);
  if (countdownInterval) clearInterval(countdownInterval);
});
</script>

<template>
  <div 
    v-if="visible"
    class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 transition-opacity duration-300"
  >
    <div class="bg-white rounded-xl shadow-2xl p-6 max-w-sm w-full text-center animate-fade-in">
      <h2 class="text-xl font-bold mb-3 text-gray-800">
        {{ payload?.notification?.title || 'Notifikasi' }}
      </h2>
      <p class="text-gray-700 mb-5">
        {{ payload?.notification?.body || 'Pesan kosong' }}
      </p>

      <button 
        @click="$emit('close')"
        class="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-5 py-2 rounded-full shadow-md transition-transform transform hover:scale-105"
      >
        Tutup
      </button>

      <p class="text-xs text-gray-500 mt-3">
        Notification akan menutup otomatis dalam {{ countdown }} detik
      </p>
    </div>
  </div>
</template>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}
</style>

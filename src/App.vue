<script setup lang="ts">
import { RouterView } from 'vue-router'
import { initNotification } from "@/composables/useNotification";
import { ref, onMounted } from 'vue';
import NotificationModal from "@/components/NotificationModal.vue";

initNotification();

const showModal = ref(false);
const notificationPayload = ref<any>(null);

onMounted(() => {
  window.addEventListener('fcm-message', (e: any) => {
    notificationPayload.value = e.detail;
    showModal.value = true;
  });
});

function closeModal() {
  showModal.value = false;
}
</script>

<template>
  <RouterView />
  <BreakScreen />

  <NotificationModal 
    :show="showModal"
    :payload="notificationPayload"
    @close="closeModal"
  />
</template>

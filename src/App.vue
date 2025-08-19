<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'
import { initNotification } from "@/composables/useNotification";
import { ref, onMounted, computed } from 'vue';
import NotificationModal from "@/components/NotificationModal.vue";
import Cookies from 'js-cookie'

initNotification();

const router = useRouter();

const showModal = ref(false);
const notificationPayload = ref<any>(null);
const isMenuOpen = ref(false);

// Cek login berdasarkan cookie
const isLoggedIn = computed(() => !!Cookies.get('token'));

onMounted(() => {
  window.addEventListener('fcm-message', (e: any) => {
    notificationPayload.value = e.detail;
    showModal.value = true;
  });
});

function closeModal() {
  showModal.value = false;
}

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}

function navigateTo(path: string) {
  router.push(path);
  isMenuOpen.value = false; // tutup menu setelah navigasi
}

function logout() {
  Cookies.remove('token');
  router.push('/login');
  isMenuOpen.value = false;
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

  <!-- Floating Menu (only when logged in) -->
  <div v-if="isLoggedIn" class="fab-wrapper">
    <transition name="fade">
      <div v-if="isMenuOpen" class="menu-box">
        <button @click="navigateTo('/')">📅 Agenda</button>
        <button @click="navigateTo('/monitoring-project')">📊 Monitoring</button>
        <button @click="navigateTo('/our-apps')">📱 Our Apps</button>
        <button @click="navigateTo('/penawaran-kontrak')">📑 Penawaran</button>
        <button @click="logout">🚪 Logout</button>
      </div>
    </transition>

    <!-- Floating Action Button -->
    <button class="fab" @click="toggleMenu">
      <span class="fab-icon">
        {{ isMenuOpen ? '✖' : '☰' }}
      </span>
    </button>
  </div>
</template>

<style scoped>
.fab-wrapper {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.fab {
  background-color: #2e7d32; /* Hijau tua */
  color: white;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: none;
  font-size: 24px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s;
}

.fab:hover {
  background-color: #1b5e20;
}

.menu-box {
  background: white;
  border: 1px solid #c8e6c9;
  border-radius: 10px;
  padding: 10px 12px;
  margin-bottom: 10px;
  box-shadow: 0 6px 15px rgba(0,0,0,0.15);
  display: flex;
  flex-direction: column;
  gap: 10px;
  animation: slideUp 0.3s ease-out;
}

.menu-box button {
  background-color: #2e7d32; /* Hijau tua */
  color: white;
  border: none;
  padding: 8px 14px;
  border-radius: 6px;
  font-size: 14px;
  text-align: left;
  cursor: pointer;
  transition: background 0.2s;
}

.menu-box button:hover {
  background-color: #1b5e20;
}

/* Animation */
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Fade transition */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>

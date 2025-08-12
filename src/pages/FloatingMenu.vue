<template>
  <div
    class="fixed z-50 transition-all duration-300"
    :style="{ bottom: position.bottom + 'px', right: position.right + 'px' }"
    @mousedown="startDrag"
  >
    <!-- Tombol bulat setengah tersembunyi -->
    <div
      class="w-14 h-14 rounded-full text-white flex items-center justify-center shadow-xl cursor-pointer transition-colors duration-300"
      :class="showMenu ? 'bg-green-800' : 'bg-green-600'"
      @click.stop="toggleMenu"
      style="transform: translate(40%, 40%);"
    >
      {{ showMenu ? '×' : '☰' }}
    </div>

    <!-- Menu dengan animasi -->
    <transition name="fade-slide">
      <div
        v-if="showMenu"
        class="absolute bottom-full mb-4 right-0 bg-white shadow-xl rounded-xl border border-gray-200 w-48 overflow-hidden"
      >
        <button
          v-for="item in menuItems"
          :key="item.title"
          class="flex items-center gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-green-100 w-full transition-colors"
          @click="navigateTo(item.path)"
        >
          <span class="text-green-600">{{ item.icon }}</span>
          {{ item.title }}
        </button>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const showMenu = ref(false)
const isDragging = ref(false)
const offset = ref({ x: 0, y: 0 })
const position = ref({ bottom: 20, right: 20 })

const toggleMenu = () => {
  showMenu.value = !showMenu.value
}

const navigateTo = (path: string) => {
  showMenu.value = false
  router.push(path)
}

// Daftar menu (dengan emoji ikon)
const menuItems = [
  { title: 'Agenda', path: '/', icon: '🗓️' },
  { title: 'Monitoring Project', path: '/monitoring-project', icon: '📊' },
  { title: 'Penawaran Kontrak', path: '/penawaran-kontrak', icon: '📄' },
  { title: 'Our Apps', path: '/our-apps', icon: '🧩' },
]

const startDrag = (e: MouseEvent) => {
  isDragging.value = true
  offset.value = { x: e.clientX, y: e.clientY }
  window.addEventListener('mousemove', onDrag)
  window.addEventListener('mouseup', stopDrag)
}

const onDrag = (e: MouseEvent) => {
  if (isDragging.value) {
    const dx = e.clientX - offset.value.x
    const dy = e.clientY - offset.value.y
    position.value.bottom -= dy
    position.value.right -= dx
    offset.value = { x: e.clientX, y: e.clientY }
  }
}

const stopDrag = () => {
  isDragging.value = false
  window.removeEventListener('mousemove', onDrag)
  window.removeEventListener('mouseup', stopDrag)
}
</script>

<style scoped>
/* Animasi slide fade menu */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.fade-slide-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>

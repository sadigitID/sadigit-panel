<template>
  <section class="space-y-4">
    <SectionHeader :icon="PhUserFocus" title="Presensi" subtitle="Daftar hadir hari ini" />

    <div class="grid grid-cols-3 gap-5" v-if="displayedData.length > 0">
      <TransitionGroup name="shuffle">
        <EmployeeCard
          v-for="item in displayedData"
          :key="item.id"
          :name="item.name"
          :description="item.description"
          :image-path="item.image"
          :is-on-cleaning-duty="item.isOnCleaningDuty"
          :status="item.status"
        />
      </TransitionGroup>
    </div>
  </section>
</template>

<script setup lang="ts">
import { PhUserFocus } from '@phosphor-icons/vue'
import { onUnmounted, ref, onMounted } from 'vue'

import type { EmployeeCardStatus } from '@/types/components/cards/employee-card'

import EmployeeCard from '@/components/cards/EmployeeCard.vue'
import { fetchPresenceList } from '@/API'
import type { PresenceItem } from '@/types/Presence'

const maxDisplayCount: number = 10

const data = ref<PresenceItem[]>([])

const displayedData = ref<PresenceItem[]>([])


const shuffleEmployees = setInterval(() => {
  if (data.value.length <= maxDisplayCount) return

  const last = data.value.pop()

  if (last) {
    data.value.unshift(last)

    displayedData.value = data.value.slice(0, maxDisplayCount)
  }
}, 5000)

onUnmounted(() => {
  clearInterval(shuffleEmployees)
})

onMounted(() => {
  fetchPresenceList().then((res) => {
    if (res.status) {
      data.value = res.data
      displayedData.value = data.value.slice(0, maxDisplayCount)
    }
  })
})
</script>

<style scoped>
.shuffle-move {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}
</style>

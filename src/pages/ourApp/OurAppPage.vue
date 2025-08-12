<template>
  <div class="min-h-screen bg-gray-50 py-6">
    <div class="relative overflow-hidden">
      <!-- Seek/Swipe Indicator -->
      <div
        ref="carousel"
        class="flex touch-none transition-transform duration-300 ease-in-out"
        :style="{ transform: `translateX(-${activeApp * 100}%)` }"
        @mousedown="handleMouseDown"
        @mousemove="handleMouseMove"
        @mouseup="handleMouseUp"
        @mouseleave="handleMouseUp"
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="handleTouchEnd"
      >
        <!-- Dynamic Content for Each App -->
        <div v-for="(app, index) in apps" :key="index" class="w-full flex-shrink-0 px-4">
          <div class="container mx-auto">
            <!-- Header -->
            <div class="mb-6 flex items-start gap-2">
              <img
                :src="app.pageInfo.image"
                :alt="app.pageInfo.imageAlt"
                class="mt-1 h-8 w-8 object-cover"
              />
              <div>
                <h1 class="text-lg font-semibold text-gray-800">{{ app.pageInfo.title }}</h1>
                <p class="text-xs text-gray-500">{{ app.pageInfo.subtitle }}</p>
              </div>
            </div>

            <!-- 3 Kolom - Dynamic grid based on available data -->
            <div class="grid gap-4" :class="getTopGridClass(app)">
              <!-- Kolom 1 -->
              <div
                v-if="hasFirstColumnData(app)"
                class="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow"
              >
                <UserTotalCard
                  v-if="app.sectionTitles.totalUser"
                  :title="app.sectionTitles.totalUser"
                  :total="app.totalUser ?? 0"
                  :color="app.colorClass.bg"
                />
                <UserCountries
                  v-if="app.userCountries.length > 0"
                  :title="app.sectionTitles.countryUsage"
                  :data="app.userCountries"
                />
              </div>

              <!-- Kolom 2 -->
              <div
                v-if="hasSecondColumnData(app)"
                class="rounded-lg border border-gray-200 bg-white p-4 shadow"
              >
                <h2 class="text-center text-sm font-semibold text-gray-700">
                  {{ app.sectionTitles.userGrowth }}
                </h2>
                <apexchart
                  v-if="app.growthSeries.length > 0 && app.growthSeries[0].data.length > 0"
                  height="350"
                  type="bar"
                  :options="app.growthChartOptions"
                  :series="app.growthSeries"
                />
              </div>

              <!-- Kolom 3 -->
              <div
                v-if="hasThirdColumnData(app)"
                class="rounded-lg border border-gray-200 bg-white p-4 shadow"
              >
                <h2 class="text-center text-sm font-semibold text-gray-700">
                  {{ app.sectionTitles.upgradeStats }}
                </h2>
                <apexchart
                  v-if="app.upgradeSeries.length > 0 && app.upgradeSeries[0].data.length > 0"
                  type="bar"
                  :options="app.upgradeChartOptions"
                  :series="app.upgradeSeries"
                  height="350"
                />
              </div>
            </div>

            <!-- Bottom Tables - Dynamic grid based on available data -->
            <div class="mt-8 grid gap-4" :class="getBottomGridClass(app)">
              <!-- Reminder Exp Package -->
              <div
                v-if="hasExpiredTableData(app)"
                class="rounded-lg border border-gray-200 bg-white p-4 shadow"
              >
                <div class="mb-4">
                  <h2 class="text-base font-semibold text-gray-800">
                    {{ app.sectionTitles.reminderTitle }}
                  </h2>
                  <p class="text-xs text-gray-500">{{ app.sectionTitles.reminderDesc }}</p>
                </div>
                <div class="w-full overflow-x-auto">
                  <AppTable :data="app.dataExpired" class="w-full">
                    <template #header>
                      <tr>
                        <th
                          v-for="(header, index) in app.dataExpired.head"
                          :key="index"
                          class="bg-gray-50 px-4 py-2 text-center text-sm font-medium text-gray-700"
                        >
                          {{ header }}
                        </th>
                      </tr>
                    </template>
                    <tr
                      v-for="(items, itemsIndex) in app.dataExpired.body.slice(0, 6)"
                      :key="itemsIndex"
                      :class="itemsIndex % 2 !== 0 ? 'bg-gray-50' : 'bg-white'"
                    >
                      <td
                        v-for="(item, itemIndex) in items"
                        :key="itemIndex"
                        class="px-4 py-3 text-center text-sm"
                      >
                        <template v-if="itemIndex === 4">
                          <div class="text-center">
                            <AppBadge :text="item" variant="warning" />
                          </div>
                        </template>

                        <template v-else-if="itemIndex === 2">
                          <a
                            :href="`https://wa.me/${item.replace(/\D/g, '')}`"
                            target="_blank"
                            class="text-green-500 hover:text-green-600"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              class="inline h-5 w-5"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                d="M12.04 2C6.56 2 2 6.42 2 11.82c0 1.99.58 3.86 1.58 5.45L2 22l4.89-1.52a10.17 10.17 0 0 0 5.15 1.36c5.48 0 10.04-4.42 10.04-9.82C22.08 6.42 17.52 2 12.04 2Zm0 17.82c-1.62 0-3.14-.45-4.44-1.24l-.31-.19-2.91.9.94-2.82-.2-.29a7.67 7.67 0 0 1-1.37-4.33c0-4.25 3.54-7.7 7.9-7.7s7.9 3.45 7.9 7.7-3.54 7.7-7.9 7.7Zm4.25-5.73c-.23-.12-1.35-.66-1.56-.73-.2-.07-.34-.12-.49.12s-.56.73-.69.88c-.12.14-.25.16-.48.05s-.93-.34-1.76-1.07c-.65-.58-1.1-1.29-1.23-1.5-.13-.21-.01-.32.1-.43.1-.1.23-.25.34-.37.12-.14.16-.23.25-.38.08-.14.04-.28-.02-.4-.07-.12-.49-1.19-.68-1.64-.18-.44-.36-.38-.49-.39l-.42-.01c-.14 0-.37.05-.57.28s-.75.73-.75 1.78.77 2.08.88 2.23c.11.14 1.52 2.3 3.69 3.23.52.22.92.35 1.23.45.52.17.99.15 1.36.09.42-.06 1.35-.55 1.54-1.09.19-.53.19-.98.14-1.09-.05-.11-.2-.18-.43-.3Z"
                              />
                            </svg>
                          </a>
                        </template>
                        <template v-else>
                          {{ item }}
                        </template>
                      </td>
                    </tr>
                  </AppTable>
                </div>
              </div>

              <!-- Pengunjung Terbanyak -->
              <div
                v-if="hasVisitorsTableData(app)"
                class="rounded-lg border border-gray-200 bg-white p-4 shadow"
              >
                <div class="mb-4">
                  <h2 class="text-base font-semibold text-gray-800">
                    {{ app.sectionTitles.topVisitorsTitle }}
                  </h2>
                  <p class="text-xs text-gray-500">{{ app.sectionTitles.topVisitorsDesc }}</p>
                </div>
                <div class="w-full overflow-x-auto">
                  <AppTable :data="app.dataPengunjungTerbanyak" class="w-full">
                    <template #header>
                      <tr>
                        <th
                          v-for="(header, index) in app.dataPengunjungTerbanyak.head"
                          :key="index"
                          class="bg-gray-50 px-4 py-2 text-left text-sm font-medium text-gray-700"
                        >
                          {{ header }}
                        </th>
                      </tr>
                    </template>
                    <tr
                      v-for="(items, itemsIndex) in app.dataPengunjungTerbanyak.body"
                      :key="itemsIndex"
                      :class="itemsIndex % 2 !== 0 ? 'bg-gray-50' : 'bg-white'"
                    >
                      <td
                        v-for="(item, itemIndex) in items"
                        :key="itemIndex"
                        class="px-4 py-3 text-center text-sm"
                      >
                        <template v-if="itemIndex === 3">
                          <AppBadge
                            v-if="item"
                            :text="item"
                            :variant="item === 'Free' ? 'default' : 'success'"
                          />
                          <template v-else>-</template>
                        </template>
                        <template v-else>
                          {{ item }}
                        </template>
                      </td>
                    </tr>
                  </AppTable>
                </div>
              </div>

              <!-- Log Upgrade -->
              <div
                v-if="hasLogTableData(app)"
                class="rounded-lg border border-gray-200 bg-white p-4 shadow"
              >
                <div class="mb-4">
                  <h2 class="text-base font-semibold text-gray-800">
                    {{ app.sectionTitles.logTitle }}
                  </h2>
                  <p class="text-xs text-gray-500">{{ app.sectionTitles.logDesc }}</p>
                </div>
                <div class="max-h-[350px] space-y-3 overflow-y-auto">
                  <div
                    v-for="(log, logIndex) in app.upgradeLogs"
                    :key="logIndex"
                    class="flex items-start justify-between rounded-lg border border-gray-200 bg-white px-4 py-3"
                  >
                    <div>
                      <div :class="`${app.colorClass.text} text-sm font-semibold`">
                        {{ log.name }}
                      </div>
                      <div class="mt-1 text-xs text-gray-500">ID: {{ log.id }}</div>
                    </div>
                    <div class="text-right">
                      <div
                        :class="`inline-flex items-center gap-1 ${app.colorClass.bg} rounded-md px-2 py-1 text-xs font-medium`"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-3 w-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        {{ log.date }}
                      </div>
                      <div class="mt-1 text-xs">{{ log.price }} | {{ log.duration }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Navigation Controls -->
    <div class="mt-6 flex justify-center space-x-4">
      <div class="container mx-auto mb-6 px-4">
        <div class="flex items-center justify-between">
          <!-- Previous Button -->
          <button
            @click="prevApp"
            class="rounded-full bg-white p-2 shadow transition-colors hover:bg-gray-100"
            :disabled="activeApp === 0"
            :class="{ 'cursor-not-allowed opacity-50': activeApp === 0 }"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <!-- Seek Dots -->
          <div class="flex justify-center space-x-2">
            <button
              v-for="(app, index) in apps"
              :key="index"
              @click="goToApp(index)"
              :class="[
                'h-2 w-8 rounded-full transition-all duration-300',
                activeApp === index ? 'bg-green-400' : 'bg-gray-300 hover:bg-gray-400'
              ]"
            ></button>
          </div>

          <!-- Next Button -->
          <button
            @click="nextApp"
            class="rounded-full bg-white p-2 shadow transition-colors hover:bg-gray-100"
            :disabled="activeApp === apps.length - 1"
            :class="{ 'cursor-not-allowed opacity-50': activeApp === apps.length - 1 }"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import 'vue3-easy-data-table/dist/style.css'

import { fetchOurApp } from '@/API'
import UserTotalCard from '@/components/cards/UserTotalCard.vue'
import UserCountries from '@/components/UserCountries.vue'
import type { AppDashboardData, DashboardResponse } from '@/types/OurApp'

const apps = ref<AppDashboardData[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

// Data checking functions
const hasFirstColumnData = (app: AppDashboardData) => {
  return app.sectionTitles.totalUser || app.userCountries?.length > 0
}

const hasSecondColumnData = (app: AppDashboardData) => {
  return app.growthSeries?.length > 0 && app.growthSeries[0]?.data?.length > 0
}

const hasThirdColumnData = (app: AppDashboardData) => {
  return app.upgradeSeries?.length > 0 && app.upgradeSeries[0]?.data?.length > 0
}

const hasExpiredTableData = (app: AppDashboardData) => {
  return app.dataExpired?.body?.length > 0
}

const hasVisitorsTableData = (app: AppDashboardData) => {
  return app.dataPengunjungTerbanyak?.body?.length > 0
}

const hasLogTableData = (app: AppDashboardData) => {
  return app.upgradeLogs?.length > 0
}

// Grid layout functions
const getTopGridClass = (app: AppDashboardData) => {
  const visibleColumns = [
    hasFirstColumnData(app),
    hasSecondColumnData(app),
    hasThirdColumnData(app)
  ].filter(Boolean).length

  switch (visibleColumns) {
    case 1:
      return 'grid-cols-1'
    case 2:
      return 'grid-cols-1 md:grid-cols-2'
    case 3:
      return 'grid-cols-1 md:grid-cols-3'
    default:
      return 'grid-cols-1'
  }
}

const getBottomGridClass = (app: AppDashboardData) => {
  const visibleTables = [
    hasExpiredTableData(app),
    hasVisitorsTableData(app),
    hasLogTableData(app)
  ].filter(Boolean).length

  switch (visibleTables) {
    case 1:
      return 'grid-cols-1'
    case 2:
      return 'grid-cols-1 lg:grid-cols-2'
    case 3:
      return 'grid-cols-1 lg:grid-cols-3'
    default:
      return 'grid-cols-1'
  }
}

const loadAppData = async () => {
  loading.value = true
  try {
    const response = await fetchOurApp()
    const res: DashboardResponse = response
    if (res.status) {
      res.data.forEach((app) => {
        app.growthChartOptions = {
          ...app.growthChartOptions,
          dataLabels: {
            enabled: true
            // style: {
            //   fontSize: '12px',
            //   fontWeight: 'bold'
            // },
            // formatter: function (val: number) {
            //   return val
            // }
          }
          // plotOptions: {
          //   bar: {
          //     dataLabels: {
          //       position: 'top'
          //     }
          //   }
          // }
        }

        app.upgradeChartOptions = {
          ...app.upgradeChartOptions,
          dataLabels: {
            enabled: true
            // style: {
            //   fontSize: '12px',
            //   fontWeight: 'bold'
            // },
            // formatter: function (val: number) {
            //   return val
            // }
          }
          // plotOptions: {
          //   bar: {
          //     dataLabels: {
          //       position: 'top'
          //     }
          //   }
          // }
        }
      })

      apps.value = res.data
    } else {
      throw new Error('Data gagal diambil')
    }
  } catch (err: unknown) {
    console.error('Gagal memuat data:', err)
    if (err instanceof Error) {
      error.value = err.message
    } else {
      error.value = 'Terjadi kesalahan'
    }
  } finally {
    loading.value = false
  }
}

const activeApp = ref(0)
let autoSlideInterval: number | null = null
const carousel = ref<HTMLElement | null>(null)
let startX = 0
let endX = 0
let isDragging = false
let dragOffset = 0

const nextApp = async () => {
  if (activeApp.value < apps.value.length - 1) {
    activeApp.value++
  } else {
    activeApp.value = 0
    await loadAppData()
  }
}

const prevApp = () => {
  if (activeApp.value > 0) {
    activeApp.value--
  } else {
    activeApp.value = apps.value.length - 1
  }
}

const goToApp = (index: number) => {
  activeApp.value = index
}

const startAutoSlide = () => {
  autoSlideInterval = window.setInterval(() => {
    nextApp()
  }, 120000)
}

const stopAutoSlide = () => {
  if (autoSlideInterval) {
    clearInterval(autoSlideInterval)
    autoSlideInterval = null
  }
}

const handleMouseDown = (e: MouseEvent) => {
  isDragging = true
  startX = e.clientX
  document.body.style.cursor = 'grabbing'
  stopAutoSlide()
}

const handleMouseMove = (e: MouseEvent) => {
  if (!isDragging) return
  endX = e.clientX
  dragOffset = endX - startX
}

const handleMouseUp = () => {
  if (!isDragging) return
  isDragging = false
  document.body.style.cursor = ''

  const threshold = 100
  if (Math.abs(dragOffset) > threshold) {
    if (dragOffset > 0) {
      prevApp()
    } else {
      nextApp()
    }
  }
  dragOffset = 0
  startAutoSlide()
}

const handleTouchStart = (e: TouchEvent) => {
  startX = e.touches[0].clientX
  stopAutoSlide()
}

const handleTouchMove = (e: TouchEvent) => {
  endX = e.touches[0].clientX
}

const handleTouchEnd = () => {
  const threshold = 50
  const diffX = endX - startX

  if (Math.abs(diffX) > threshold) {
    if (diffX > 0) {
      prevApp()
    } else {
      nextApp()
    }
  }
  startAutoSlide()
}

onMounted(() => {
  if (carousel.value) {
    carousel.value.addEventListener('touchstart', handleTouchStart)
    carousel.value.addEventListener('touchmove', handleTouchMove)
    carousel.value.addEventListener('touchend', handleTouchEnd)
  }
  loadAppData().then(() => {
    startAutoSlide()
  })
})

onBeforeUnmount(() => {
  if (carousel.value) {
    carousel.value.removeEventListener('touchstart', handleTouchStart)
    carousel.value.removeEventListener('touchmove', handleTouchMove)
    carousel.value.removeEventListener('touchend', handleTouchEnd)
  }
  stopAutoSlide()
})
</script>

<style scoped>
.flex {
  transition: transform 0.3s ease-in-out;
}

.touch-none {
  touch-action: none;
}
</style>

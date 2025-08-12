<template>
  <div class="min-h-screen py-6">
    <div class="container mx-auto px-4">

      <div class="flex items-start gap-2 mb-4">
        <MonitoringProjectIcon class="w-8 h-8 text-green-700 mt-1" />
        <div>
          <h1 class="text-lg font-semibold text-gray-800">Monitoring & Maintenance Project</h1>
          <p class="text-xs text-gray-500">List monitoring & maintenance hari ini</p>
        </div>
      </div>

      <div>
        <div v-if="hasProgressProject" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <ProgressCard
            v-for="item in projectProgressList"
            :key="item.id"
            :title="item.title"
            :description="item.description"
            :progress="item.progress"
            :range="item.range"
          />
        </div>


        <div v-else class="flex flex-col items-center text-center space-y-2">
          <MonitoringProjectIcon class="w-10 h-10 text-green-700" />
          <h1 class="text-xl font-semibold text-gray-800">Belum Projek Masuk</h1>
          <p class="text-sm text-gray-500">Yahh, belum ada projek masuk nihh</p>
        </div>
      </div>

      <section class="space-y-4 mt-6">
        <div class="grid grid-cols-4 gap-4">
          <ProjectBoard
            :data="boardBacklogs"
            title="Backlogs"
            empty-state-title="Backlogs Kosong"
            empty-state-description="Semua tugas backlogs sudah beres!"
          />

          <ProjectBoard
            :data="boardProgress"
            title="Progress"
            empty-state-title="Progress Kosong"
            empty-state-description="Semua tugas progress sudah beres!"
            variant="warning"
          />

          <ProjectBoard
            :data="boardRevision"
            title="Revision"
            empty-state-title="Revision Kosong"
            empty-state-description="Semua tugas revision sudah beres!"
            variant="danger"
          />

          <ProjectBoard
            :data="boardDone"
            title="Done"
            empty-state-title="Done Kosong"
            empty-state-description="Semua tugas done sudah beres!"
            variant="success"
          />
        </div>
      </section>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

import MonitoringProjectIcon from '@/components/icons/MonitoringProject.vue'
import ProjectBoard from '@/components/ProjectBoard.vue'
import ProgressCard from '@/components/cards/ProgressCard.vue'

import { fetchMonitoringProject, fetchProjects } from '@/API'
import type { ProjectBoardResponse, BadgeTypes } from '@/types/services/project-board-service'
import type { Project } from '@/types/projects'

const projectProgressList = ref<Project[]>([])  // <-- benar

const projectList = ref<ProjectBoardResponse[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

const hasProgressProject = computed(() => projectProgressList.value.length > 0)

const rawProjects = computed(() => {
  return projectList.value.map((ProjectBoardResponse: ProjectBoardResponse) => ({
    ...ProjectBoardResponse,
    badges: ProjectBoardResponse.badges as BadgeTypes[],
    type: ProjectBoardResponse.type as 'Backlogs' | 'Progress' | 'Revision' | 'Done'
  }))
})

const boardBacklogs = computed(() => rawProjects.value.filter(p => p.type === 'Backlogs'))
const boardProgress = computed(() => rawProjects.value.filter(p => p.type === 'Progress'))
const boardRevision = computed(() => rawProjects.value.filter(p => p.type === 'Revision'))
const boardDone = computed(() => rawProjects.value.filter(p => p.type === 'Done'))

onMounted(async () => {
  try {
    const resProgress = await fetchProjects()
    if (resProgress.status) {
      projectProgressList.value = resProgress.data
    }

    const resBoard = await fetchMonitoringProject()
    if (resBoard.status) {
      projectList.value = resBoard.data
    } else {
      throw new Error(resBoard.message)
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      error.value = err.message
    } else {
      error.value = 'Gagal memuat data proyek'
    }
  } finally {
    loading.value = false
  }
})
</script>

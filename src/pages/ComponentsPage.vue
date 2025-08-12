<template>
  <main class="container mx-auto mt-5 mb-80 space-y-5">
    <h1 class="text-4xl font-bold">Global Components</h1>
    <hr />

    <section>
      <h2 class="text-xl font-bold">BADGE</h2>

      <div class="mt-3 flex gap-2">
        <AppBadge text="DEFAULT" />
        <AppBadge text="SUCCESS" variant="success" />
        <AppBadge text="WARNING" variant="warning" />
        <AppBadge text="DANGER" variant="danger" />
      </div>
    </section>

    <section>
      <SectionHeader
        :icon="PhEmpty"
        title="Empty State"
        subtitle="Below is an empty state component"
      />

      <div class="mt-4">
        <EmptyState
          :icon="PhEmpty"
          title="This is title"
          description="This is description, write something here!"
        />
      </div>
    </section>

    <section class="space-y-4">
      <h2 class="text-xl font-bold">TABLE</h2>

      <div class="w-fit overflow-auto rounded-lg border border-slate-200">
        <AppTable :data="tableData" />
      </div>
    </section>

    <section class="space-y-4">
      <h2 class="text-xl font-bold">TIME INFO</h2>

      <TimeInfo />
    </section>

    <h1 class="text-4xl font-bold">Cards</h1>
    <hr />

    <section class="space-y-4">
      <h2 class="text-xl font-bold">SERVER CARD</h2>

      <div class="grid grid-cols-3 gap-x-6 gap-y-4">
        <ServerCard name="Server 1" status="active" />
        <ServerCard name="Server 2" status="down" />
        <ServerCard name="Server 3" status="down" />
        <ServerCard name="Server 4" status="down" />
        <ServerCard name="Server 5" status="down" />
      </div>
    </section>

    <section class="space-y-4">
      <h2 class="text-xl font-bold">PROGRESS CARD</h2>

      <div class="grid grid-cols-2">
        <ProgressCard
          title="Game Development"
          description="PT. Sawarga Digital Indonesia"
          :progress="10"
          range="9 - 12 Apr 2025"
        />
      </div>
    </section>

    <section class="space-y-4">
      <h2 class="text-xl font-bold">EMPLOYEE CARD</h2>

      <div class="grid grid-cols-3 gap-5">
        <EmployeeCard
          v-for="(employee, index) in employees"
          :key="index"
          :name="employee.name"
          :description="employee.description"
          :image-path="employee.image"
          :is-on-cleaning-duty="employee.isOnCleaningDuty"
          :status="employee.status as EmployeeCardStatus"
        />
      </div>
    </section>

    <section class="space-y-4">
      <h2 class="text-xl font-bold">AGENDA CARD</h2>

      <AgendaCard
        v-for="(agenda, index) in agendas"
        :key="index"
        :title="agenda.title"
        :description="agenda.description"
        :participants="agenda.participant.list"
        :time="agenda.time"
        :variant="index === 0 ? 'active' : 'default'"
        :participant-type="agenda.participant.type as ParticipantType"
      />
    </section>

    <section class="space-y-4">
      <h2 class="text-xl font-bold">USER TOTAL CARD</h2>

      <UserTotalCard title="Total Pengguna" />
    </section>

    <h1 class="text-4xl font-bold">Other Components</h1>
    <hr />

    <section class="space-y-4">
      <h2 class="text-xl font-bold">DATE ITEM</h2>

      <div class="flex gap-4">
        <DateItem :date-number="7" date-text="SEN" />
        <DateItem :date-number="7" date-text="SEN" variant="active" />
      </div>
    </section>

    <section class="space-y-4">
      <h2 class="text-xl font-bold">PROJECT BOARD AND CARD</h2>

      <div class="grid grid-cols-4 gap-4">
        <ProjectBoard
          :data="projectBoards"
          title="Backlogs"
          empty-state-title="Backlogs Kosong"
          empty-state-description="Semua tugas backlogs sudah beres!"
        />

        <ProjectBoard
          :data="[]"
          title="Progress"
          empty-state-title="Progress Kosong"
          empty-state-description="Semua tugas progress sudah beres!"
          variant="warning"
        />

        <ProjectBoard
          :data="[]"
          title="Revision"
          empty-state-title="Revision Kosong"
          empty-state-description="Semua tugas revision sudah beres!"
          variant="danger"
        />

        <ProjectBoard
          :data="[]"
          title="Done"
          empty-state-title="Done Kosong"
          empty-state-description="Semua tugas done sudah beres!"
          variant="success"
        />
      </div>
    </section>

    <section class="space-y-4">
      <h2 class="text-xl font-bold">USER COUNTRIES</h2>

      <UserCountries
        title="Negara pengguna daftarmenu"
        :data="[
          { countryCode: 'id', countryName: 'Indonesia', count: 100 },
          { countryCode: 'us', countryName: 'United States', count: 50 },
          { countryCode: 'gb', countryName: 'United Kingdom', count: 30 },
          { countryCode: 'ca', countryName: 'Canada', count: 20 }
        ]"
      />
    </section>
  </main>
</template>

<script setup lang="ts">
import { PhEmpty } from '@phosphor-icons/vue'

import DateItem from '@/components/DateItem.vue'
import ProjectBoard from '@/components/ProjectBoard.vue'
import UserCountries from '@/components/UserCountries.vue'

import AgendaCard from '@/components/cards/AgendaCard.vue'
import EmployeeCard from '@/components/cards/EmployeeCard.vue'
import ProgressCard from '@/components/cards/ProgressCard.vue'
import ServerCard from '@/components/cards/ServerCard.vue'
import UserTotalCard from '@/components/cards/UserTotalCard.vue'

import type { ParticipantType } from '@/types/components/cards/agenda-card'
import type { EmployeeCardStatus } from '@/types/components/cards/employee-card'
import type { TableData } from '@/types/components/global/app-table'
import type { BadgeTypes, ProjectBoardResponse } from '@/types/services/project-board-service'

// mock data
import agendas from '@/mocks/agendas.json'
import employees from '@/mocks/employees.json'
import projects from '@/mocks/projects.json'

const projectBoards: ProjectBoardResponse[] = projects.map((project) => ({
  ...project,
  badges: project.badges as BadgeTypes[]
})) as ProjectBoardResponse[]

const tableData: TableData = {
  head: [
    'Name',
    { text: 'Email', class: 'text-center' },
    { text: 'Phone', class: 'text-center' },
    { text: 'Address', class: 'text-center' }
  ],
  body: [
    [
      { text: 'John Doe', class: 'text-left' },
      { text: 'jhon@gmail.com', class: 'text-center' },
      { text: '+1 234 567 890', class: 'text-center' },
      { text: '123 Main St, City, Country', class: 'text-center' }
    ],
    [
      { text: 'Jane Smith', class: 'text-left' },
      { text: 'jane@gmail.com', class: 'text-center' },
      { text: '+1 234 567 890', class: 'text-center' },
      { text: '456 Elm St, City, Country', class: 'text-center' }
    ]
  ]
}
</script>

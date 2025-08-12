<template>
  <table class="table-fixed">
    <thead class="text-primary-800 text-xs font-semibold">
      <tr class="border-b border-slate-200">
        <th
          v-for="(item, index) in data.head"
          :key="index"
          :class="['px-6 py-3', typeof item === 'object' ? item.class : '']"
        >
          {{ typeof item === 'object' ? item.text : item }}
        </th>
      </tr>
    </thead>
    <tbody class="text-sm font-medium text-gray-600" v-if="data.body.length < 0">
      <tr v-for="(items, itemsIndex) in data.body" :key="itemsIndex">
        <td
          v-for="(item, itemIndex) in items"
          :key="itemIndex"
          :class="[
            'px-6 py-3',
            typeof item === 'object' ? item.class : '',
            itemsIndex % 2 !== 0 ? 'bg-gray-50' : ''
          ]"
        >
          {{ typeof item === 'object' ? item.text : item }}
        </td>
      </tr>
    </tbody>
    <tbody class="text-sm font-medium text-gray-600" v-else>
      <slot></slot>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import type { AppTableProps } from '@/types/components/global/app-table'

const { data } = defineProps<AppTableProps>()
</script>

<template>
  <div
    class="flex flex-col gap-2 rounded-lg border border-slate-200 bg-white px-5 py-4 text-gray-900"
  >
    <h5 class="text-lg font-medium">{{ title }}</h5>

    <ul
      v-if="data.length"
      class="max-h-[220px] overflow-y-auto pr-1 space-y-2"
    >
      <li
        class="flex justify-between"
        v-for="(item, index) in data"
        :key="index"
      >
        <div class="flex items-center justify-center gap-2">
          <img
            :src="`https://flagcdn.com/w20/${item.countryCode}.png`"
            :srcset="`https://flagcdn.com/w40/${item.countryCode}.png 2x`"
            width="20"
            :alt="item.countryCode"
            class="shadow-sm"
          />
          <span class="text-base font-medium">{{ item.countryName }}</span>
        </div>

        <span class="text-primary-700 text-sm font-semibold">
          {{ item.count }} Pengguna
        </span>
      </li>
    </ul>
  </div>
</template>


<script setup lang="ts">
import type { UserCountriesProps } from '@/types/components/user-countries'

const { data, title } = defineProps<UserCountriesProps>()
</script>

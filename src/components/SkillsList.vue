<script setup lang="ts">
import { User } from "@models/user";

const props = defineProps<{
  userData: User
}>()
</script>

<template>
  <div class="p-4 bg-white border-round shadow-2">
    <h3 class="text-xl font-bold mb-4">Навыки</h3>
    <div class="flex flex-column md:flex-row justify-content-between gap-4">
      <span
          v-for="skill in userData.skills"
          :key="skill"
          class="bg-primary-100 text-primary-800 border-round py-1 text-sm font-medium"
      >
        {{ skill }}
      </span>
    </div>
  </div>
</template>



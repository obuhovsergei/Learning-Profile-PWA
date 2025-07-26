<script setup lang="ts">
import { User } from "@/models/user";

const props = defineProps<{
  userData: User
}>()
</script>

<template>
  <div class="p-4 bg-white border-round shadow-2">
    <h3 class="text-xl font-bold mb-4">Статистика</h3>
    <div class="grid">
      <div class="col-6 text-center">
        <span class="text-primary-500 font-bold text-4xl block">{{ userData.completedCourses }}</span>
        <span class="text-600">Курсов</span>
      </div>
      <div class="col-6 text-center">
        <span class="text-primary-500 font-bold text-4xl block">{{ userData.skills.length }}</span>
        <span class="text-600">Навыков</span>
      </div>
    </div>
  </div>
</template>



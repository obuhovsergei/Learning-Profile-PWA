<script setup lang="ts">
import type { User } from "../models/user";
import useXpSystem from "../composables/useXpSystem";


const props = defineProps<{
  userData: User
}>()

const { xpToNextLevel, progressPercentage } = useXpSystem(props.userData);

</script>

<template>
  <div class="p-4 bg-white border-round shadow-2">
    <div class="flex justify-content-between mb-2">
      <span class="font-medium">Уровень {{ props.userData.level }}</span>
      <span class="font-medium">{{ props.userData.xp }} / {{ props.userData.nextLevelXp }} XP</span>
    </div>
    <div class="bg-gray-200 border-round overflow-hidden">
      <ProgressBar :value="progressPercentage" aria-label="Progress"></ProgressBar>
    </div>
    <div class="mt-2 text-500 text-sm">
      До следующего уровня: {{ xpToNextLevel }} XP
    </div>
  </div>
</template>

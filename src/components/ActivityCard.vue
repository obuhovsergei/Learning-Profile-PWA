<script setup lang="ts">
import type { Activity } from "@/models/user";

const props = defineProps<{
  activity: Activity
}>()

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('ru-RU')
}
</script>


<template>
  <div class="p-4 border-bottom-1 surface-border hover:surface-hover transition-colors">
    <div class="flex justify-content-between align-items-center">
      <div>
        <h4 class="font-medium m-0">{{ activity.course }}</h4>
        <span class="text-500 text-sm">{{ formatDate(activity.date) }}</span>
      </div>
      <span class="bg-green-100 text-green-800 border-round px-3 py-1 text-sm font-medium">
        +{{ activity.xp }} XP
      </span>
    </div>
  </div>
</template>

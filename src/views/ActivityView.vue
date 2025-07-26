<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useActivityStore } from '@/stores/activity'
import ActivityCard from "@/components/ActivityCard.vue"
import VirtualScroller from 'primevue/virtualscroller'
import { onMounted, onUnmounted } from 'vue'

const activityStore = useActivityStore()
const { activities, isActivitiesLoading } = storeToRefs(activityStore)

onMounted(() => {
  activityStore.fetchActivities()
})
onUnmounted(() => {
  activityStore.reset()
})
</script>

<template>
  <div class="activity-view p-0 sm:p-4 max-w-3xl mx-auto">
    <h2 class="text-2xl font-bold mb-6 text-gray-800">Активность</h2>

    <div v-if="isActivitiesLoading" class="space-y-3">
      <div v-for="i in 7" :key="`skeleton-${i}`" class="p-4 border-bottom-1 surface-border">
        <div class="flex justify-content-between align-items-center">
          <div class="w-full">
            <Skeleton width="60%" height="1.25rem" class="mb-2"></Skeleton>
            <Skeleton width="40%" height="1rem"></Skeleton>
          </div>
          <Skeleton width="4rem" height="2rem" borderRadius="1rem"></Skeleton>
        </div>
      </div>
    </div>
    <div v-else-if="!activities.length" class="text-center py-8">
      <i class="pi pi-inbox text-5xl text-gray-400 mb-3"></i>
      <p class="text-gray-500">Активности не найдены</p>
    </div>
    <VirtualScroller
        v-else
        :items="activities"
        :itemSize="50"
        class="bg-white rounded-lg shadow divide-y"
        style="height: 70vh"
    >
      <template #item="{ item: activity }">
        <ActivityCard
            :activity="activity"
            class="hover:bg-gray-50 active:bg-gray-100 transition-colors"
        />
      </template>
    </VirtualScroller>
  </div>
</template>

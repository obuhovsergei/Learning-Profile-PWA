<script setup lang="ts">
import {computed, onMounted, onUnmounted} from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'
import { useActivityStore } from '@/stores/activity'
import ProfileHeader from '@/components/ProfileHeader.vue'
import LevelProgress from '@/components/LevelProgress.vue'
import UserStats from '@/components/UserStats.vue'
import SkillsList from '@/components/SkillsList.vue'
import ActivityCard from '@/components/ActivityCard.vue'

const userStore = useUserStore()
const activityStore = useActivityStore()
const { user, isUserLoading } = storeToRefs(userStore)
const { activities, isActivitiesLoading } = storeToRefs(activityStore)

const recentActivities = computed(() =>
    activities.value.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 4)
)
onMounted(() => {
  userStore.fetchUserData()
  activityStore.fetchActivities()
})

onUnmounted(() => {
  userStore.reset()
  activityStore.reset()
})

</script>

<template>
  <div class="profile-view p-0 sm:p-4 max-w-3xl mx-auto">
    <div v-if="isUserLoading" class="flex align-items-center p-4 mb-4 surface-100 rounded">
      <Skeleton shape="circle" size="3rem" class="mr-3"></Skeleton>
      <div class="flex-1">
        <Skeleton width="10rem" height="1rem" class="mb-2"></Skeleton>
        <Skeleton width="6rem" height="1rem"></Skeleton>
      </div>
    </div>
    <Transition v-else-if="user" name="fade" mode="out-in">
      <ProfileHeader :user-data="user" class="hoverable-card" />
    </Transition>

    <div v-if="isUserLoading" class="mb-7">
      <div class="flex my-2">
        <Skeleton width="5rem" height="1rem"></Skeleton>
      </div>
      <Skeleton width="100%" height="1.5rem"></Skeleton>
      <div class="flex justify-content-between mt-2">
        <Skeleton width="5rem" height="1rem"></Skeleton>
        <Skeleton width="5rem" height="1rem"></Skeleton>
      </div>
    </div>
    <Transition v-else-if="user" name="fade" mode="out-in">
      <LevelProgress :user-data="user" class="hoverable-card" />
    </Transition>

    <div class="flex flex-column sm:flex-row gap-4 mt-4">
      <div v-if="isUserLoading" class="p-4 surface-100 rounded">
        <Skeleton width="8rem" height="1.5rem" class="mb-4"></Skeleton>
        <div class="grid grid-cols-2 gap-4">
          <div v-for="i in 2" :key="i" class="text-center">
            <Skeleton width="3rem" height="2rem" class="mx-auto mb-2"></Skeleton>
            <Skeleton width="8rem" height="1rem" class="mx-auto"></Skeleton>
          </div>
        </div>
      </div>
      <Transition v-else-if="user" name="fade" mode="out-in">
        <UserStats :user-data="user" class="hoverable-card" />
      </Transition>

      <div v-if="isUserLoading" class="p-4 surface-100 rounded">
        <Skeleton width="8rem" height="1.5rem" class="mb-4"></Skeleton>
        <div class="flex flex-wrap gap-2">
          <Skeleton v-for="i in 3" :key="i" width="6rem" height="2rem"></Skeleton>
        </div>
      </div>
      <Transition v-else-if="user" name="fade" mode="out-in">
        <SkillsList :user-data="user" class="hoverable-card" />
      </Transition>
    </div>

    <div class="mt-6">
      <div v-if="isActivitiesLoading" class="space-y-3">
        <Skeleton width="10rem" height="1rem" class="mb-2"></Skeleton>
        <div v-for="i in 3" :key="i" class="p-4 surface-100 rounded">
          <Skeleton width="100%" height="1rem" class="mb-2"></Skeleton>
          <Skeleton width="6rem" height="1rem"></Skeleton>
        </div>
      </div>
      <TransitionGroup name="list" tag="div" v-else class="bg-white rounded-lg shadow divide-y">
        <h3 class="text-xl font-bold mb-4">Последняя активность</h3>
        <ActivityCard
            v-for="activity in recentActivities"
            :key="activity.id"
            :activity="activity"
            class="activity-item"
        />
      </TransitionGroup>
    </div>
  </div>
</template>

<style scoped>
.hoverable-card {
  transition: all 0.3s ease;
}

.hoverable-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

/* Анимации для списка активностей */
.activity-item {
  transition: all 0.3s ease;
}

.activity-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>

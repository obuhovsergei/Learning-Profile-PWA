<script setup lang="ts">
import useAchievements from "@/composables/useAchievements";

const { isAchievementsLoading, achievements, formatDate, calculateProgress } = useAchievements();

</script>

<template>
  <div class="achievements-view p-0 sm:p-4 max-w-6xl mx-auto">
    <div class="flex align-items-center mb-6">
      <h2 class="text-2xl font-bold text-800 mb-2 md:mb-0">Достижения</h2>
    </div>

    <div v-if="isAchievementsLoading" class="grid grid-nogutter">
      <div v-for="i in 6" :key="i" class="col-12 md:col-6 lg:col-4 p-4">
        <div class="p-4 surface-card border-round h-full flex flex-column">
          <Skeleton shape="circle" size="4rem" class="mx-auto mb-3"></Skeleton>
          <Skeleton width="80%" height="1.25rem" class="mx-auto mb-2"></Skeleton>
          <Skeleton width="60%" height="1rem" class="mx-auto mb-3"></Skeleton>
          <div class="flex justify-content-between mt-auto">
            <Skeleton width="4rem" height="1rem"></Skeleton>
            <Skeleton width="4rem" height="1rem"></Skeleton>
          </div>
          <div class="mt-3 pt-2 border-top-1 surface-border">
            <Skeleton width="100%" height="0.5rem"></Skeleton>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="grid grid-nogutter">
      <TransitionGroup name="achievement-list">
        <div
            v-for="achievement in achievements"
            :key="achievement.id"
            class="col-12 md:col-6 lg:col-4 p-0 sm:p-4 achievement-item"
        >
          <Transition name="achievement" mode="out-in">
            <div
                class="p-4 h-full bg-white border-round shadow-2 transition-all transition-duration-300 hover:shadow-4 flex flex-column"
                :class="{ 'ring-2 ring-primary': achievement.unlocked }"
            >
              <div
                  class="w-16 h-16 mx-auto mb-3 flex align-items-center justify-content-center border-circle"
              >
                <i class="text-3xl" :class="achievement.unlocked ? achievement.icon : 'pi pi-lock text-gray-400'"/>
              </div>

              <h3 class="font-bold text-center mb-1">{{ achievement.title }}</h3>
              <p class="text-sm text-gray-600 text-center mb-2 flex-grow-1">
                {{ achievement.description }}
              </p>

              <div class="flex justify-content-between text-xs text-gray-500 mt-auto">
                  <span v-if="!achievement.unlocked">
                    {{ achievement.progress }}/{{ achievement.required }}
                  </span>
                <span v-else class="text-green-600">
                    <i class="pi pi-check-circle mr-1"></i> Получено
                  </span>
                <span>{{ formatDate(achievement?.date) }}</span>
              </div>

              <div class="mt-3 pt-2 border-top-1 surface-border">
                <ProgressBar
                    :value="calculateProgress(achievement)"
                    class="h-1rem"
                    aria-label="Progress"
                    :class="{
                        'opacity-50': achievement.unlocked
                      }"
                />
              </div>
            </div>
          </Transition>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<style scoped>
.achievement-item {
  transition: all 0.3s ease;
}

.achievement-item:hover {
  transform: translateY(-5px);
}
</style>

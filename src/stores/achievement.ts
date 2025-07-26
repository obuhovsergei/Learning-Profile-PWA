import { defineStore } from 'pinia'
import { ref } from 'vue'
import { mockAchievements } from '@mocks';

export const useAchievementStore = defineStore('achievement', () => {
    const achievements = ref<typeof mockAchievements>([])
    const isAchievementsLoading = ref(false)

    const fetchAchievements = async () => {
        isAchievementsLoading.value = true
        try {
            await new Promise(resolve => setTimeout(resolve, 1000))
            achievements.value = mockAchievements
        } finally {
            isAchievementsLoading.value = false
        }
    }

    const unlockAchievement = (id: string) => {
        const achievement = achievements.value.find(a => a.id === id)
        if (achievement) {
            achievement.unlocked = true
            achievement.date = new Date().toISOString()
        }
    }

    const reset = () => {
        achievements.value = []
        isAchievementsLoading.value = false
    }

    return {
        achievements,
        isAchievementsLoading,
        fetchAchievements,
        unlockAchievement,
        reset
    }
})

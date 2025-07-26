import { defineStore } from 'pinia'
import { ref } from 'vue'
import { mockActivities } from '@mocks';

export const useActivityStore = defineStore('activity', () => {
    const activities = ref<typeof mockActivities>([])
    const isActivitiesLoading = ref(false)

    const fetchActivities = async () => {
        isActivitiesLoading.value = true
        try {
            await new Promise(resolve => setTimeout(resolve, 1000))
            activities.value = mockActivities
        } finally {
            isActivitiesLoading.value = false
        }
    }

    const reset = () => {
        activities.value = []
        isActivitiesLoading.value = false
    }

    return {
        activities,
        isActivitiesLoading,
        fetchActivities,
        reset
    }
})

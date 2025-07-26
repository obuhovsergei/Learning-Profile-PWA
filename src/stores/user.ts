import { defineStore } from 'pinia'
import { mockUser } from '@mocks'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
    const user = ref<typeof mockUser | null>(null)
    const isUserLoading = ref(false)

    const fetchUserData = async () => {
        isUserLoading.value = true
        try {
            await new Promise(resolve => setTimeout(resolve, 1000))
            user.value = mockUser
        } finally {
            isUserLoading.value = false
        }
    }

    const reset = () => {
        user.value = null
        isUserLoading.value = false
    }

    return {
        user,
        isUserLoading,
        fetchUserData,
        reset
    }
})

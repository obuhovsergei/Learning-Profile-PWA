import { storeToRefs } from 'pinia';
import { useAchievementStore } from '@/stores/achievement';
import { onMounted, onUnmounted } from "vue";
import type { Achievement } from "@/models/user";

export default function useAchievements() {
    const achievementStore = useAchievementStore();
    const { isAchievementsLoading, achievements } = storeToRefs(achievementStore);

    const formatDate = (dateString?: string | null) => {
        if (!dateString) return 'В процессе';
        return new Date(dateString).toLocaleDateString('ru-RU');
    };

    const calculateProgress = (achievement: Achievement) => {
        if (!achievement) return 0;
        if (achievement.unlocked) return 100;

        const required = achievement.required || 1;
        const progress = achievement.progress || 0;

        return Math.min(100, Math.round((progress / required) * 100));
    };

    onMounted(() => {
        achievementStore.fetchAchievements();
    });

    onUnmounted(() => {
        achievementStore.reset()
    })

    return { isAchievementsLoading, achievements, formatDate, calculateProgress };
}

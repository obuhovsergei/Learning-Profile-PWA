import { computed } from "vue";
import type { User } from "@/models/user";

export default function useXpSystem(userData: User) {
    const xpToNextLevel = computed(() => {
        return userData ? userData.nextLevelXp - userData.xp : 0;
    });

    const progressPercentage = computed(() => {
        return ((userData?.xp / userData?.nextLevelXp) * 100) || 0;
    });

    return { xpToNextLevel, progressPercentage };
}

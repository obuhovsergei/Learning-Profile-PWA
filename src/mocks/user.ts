import type { User } from "../models/user";


export const mockUser: User = {
    name: "Алексей Петров",
    avatar: "avatar.jpg",
    level: 12,
    xp: 850,
    nextLevelXp: 1000,
    completedCourses: 7,
    skills: ["JavaScript", "Vue.js", "TypeScript", "HTML", "CSS", "Git"]
}  as const

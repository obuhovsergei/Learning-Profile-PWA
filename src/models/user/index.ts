export interface User {
    name: string
    avatar: string
    xp: number
    level: number
    nextLevelXp: number
    completedCourses: number
    skills: string[]
}

export interface Activity {
    id: number
    course: string
    date: string
    xp: number
}

export interface Achievement {
    id: string
    title: string
    description: string
    icon: string
    unlocked: boolean
    progress?: number
    required?: number
    date?: string | null
}

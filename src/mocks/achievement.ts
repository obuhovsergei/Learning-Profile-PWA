import { Achievement } from "../models/user";

export const mockAchievements: Achievement[] = [
    {
        id: 'beginner',
        title: 'Новичок',
        description: 'Зарегистрировался в системе',
        icon: 'pi pi-user-plus',
        unlocked: true,
        date: '2023-01-15'
    },
    {
        id: 'persistent',
        title: 'Упорный',
        description: 'Завершил 5 курсов',
        icon: 'pi pi-star',
        unlocked: true,
        progress: 5,
        required: 5,
        date: '2023-05-20'
    },
    {
        id: 'expert',
        title: 'Эксперт',
        description: 'Имеет 10+ навыков',
        icon: 'pi pi-shield',
        unlocked: false,
        progress: 7,
        required: 10
    },
    {
        id: 'fast-learner',
        title: 'Быстрый ученик',
        description: 'Завершил курс за 1 день',
        icon: 'pi pi-bolt',
        unlocked: false,
        progress: 1,
        required: 10
    },
    {
        id: 'streak',
        title: 'Серия',
        description: '3 дня активного обучения подряд',
        icon: 'pi pi-fire',
        unlocked: true,
        date: '2023-06-10'
    }
]

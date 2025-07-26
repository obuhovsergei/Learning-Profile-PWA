import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { RouteNames } from "./routerNames";

// Тип для мета-данных маршрута
declare module 'vue-router' {
    interface RouteMeta {
        title: string
    }
}

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        name: RouteNames.home,
        redirect: { name: RouteNames.profile },
        meta: {
            title: "Main Page"
        },
        children: [
            {
                path: 'profile',
                name: RouteNames.profile,
                component: () => import('@/views/ProfileView.vue'),
                meta: {
                    title: "Profile Page"
                }
            },
            {
                path: 'achievements',
                name: RouteNames.achievements,
                component: () => import('@/views/AchievementsView.vue'),
                meta: {
                    title: "Achievements Page"
                }
            },
            {
                path: 'activity',
                name: RouteNames.activity,
                component: () => import('@/views/ActivityView.vue'),
                meta: {
                    title: "Activity Page"
                }
            }
        ]
    },
    {
        path: '/offline',
        name: RouteNames.offline,
        component: () => import('@/views/OfflineView.vue'),
        meta: {
            title: "Offline mode"
        }
    }
]

const router = createRouter({
    history: createWebHistory(),
    scrollBehavior() {
        return { top: 0 }
    },
    routes
})

export default router

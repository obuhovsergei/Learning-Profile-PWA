<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RouteNames } from "@/router/routerNames";
import PWAInstallPrompt from '@/components/PWAInstallPrompt.vue'
import { useRouter } from "vue-router";

const menuItems = ref([
  {
    label: 'Активность',
    icon: 'pi pi-history',
    to: { name: RouteNames.activity }
  },
  {
    label: 'Достижения',
    icon: 'pi pi-star',
    to: { name: RouteNames.achievements }
  },
  {
    label: 'Профиль',
    icon: 'pi pi-user',
    to: { name: RouteNames.profile }
  }
])

const router = useRouter()
const isOnline = ref(navigator.onLine)

onMounted(() => {
  window.addEventListener('online', updateOnlineStatus)
  window.addEventListener('offline', updateOnlineStatus)
})

const updateOnlineStatus = () => {
  isOnline.value = navigator.onLine;
  if (!isOnline.value && router.currentRoute.value.name !== RouteNames.offline) {
    router.push({ name: RouteNames.offline });
  }
}

</script>


<template>
  <div class="app-container">
    <PWAInstallPrompt />
    <Menubar :model="menuItems" class="shadow-md flex justify-content-between ">
      <template #start>
        <span class="text-xl font-bold ml-2">Learning Profile</span>
      </template>
      <template #item="{ item }">
        <router-link
            :to="item.to"
            custom
            v-slot="{ navigate, isActive }"
        >
          <a
              :href="item.to"
              @click="navigate"
              :class="[
              'p-menuitem-link',
              { 'active-menu-item': isActive }
            ]"
          >
            <span :class="item.icon" class="mr-2" />
            <span class="p-menuitem-text">{{ item.label }}</span>
          </a>
        </router-link>
      </template>
    </Menubar>

    <main class="container mx-auto px-3 py-3 sm:px-4 sm:py-4 min-h-screen">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

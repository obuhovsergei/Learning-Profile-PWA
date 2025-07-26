<script setup lang="ts">
import { User } from "@models/user";

const props = defineProps<{
  userData: User
}>()

</script>

<template>
  <div class="flex align-items-center p-4 bg-white border-round shadow-2">
    <img
        :src="userData.avatar"
        alt="User Avatar"
        class="w-3rem h-3rem border-circle border-2 border-primary"
    >
    <div class="ml-3">
      <h1 class="text-2xl font-bold m-0">{{ userData.name }}</h1>
      <span class="bg-primary-100 text-primary-800 border-round px-3 py-1 text-sm font-medium">
        Уровень {{ userData.level }}
      </span>
    </div>
  </div>
</template>


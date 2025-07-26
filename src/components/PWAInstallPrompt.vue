<template>
  <div v-if="showInstallPrompt" class="pwa-install-prompt">
    <div class="pwa-install-content">
      <p>Установите Learning Profile для лучшего опыта!</p>
      <div class="pwa-install-buttons">
        <Button label="Установить" @click="installPWA" class="p-button-sm" />
        <Button label="Позже" @click="dismissPrompt" class="p-button-sm p-button-text" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Button from 'primevue/button'

const deferredPrompt = ref<BeforeInstallPromptEvent | null>(null)
const showInstallPrompt = ref(false)

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[]
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed'
    platform: string
  }>
  prompt(): Promise<void>
}

onMounted(() => {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault()
    deferredPrompt.value = e as BeforeInstallPromptEvent
    showInstallPrompt.value = true
  })

  window.addEventListener('appinstalled', () => {
    showInstallPrompt.value = false
  })
})

const installPWA = async () => {
  if (deferredPrompt.value) {
    deferredPrompt.value.prompt()
    const { outcome } = await deferredPrompt.value.userChoice
    if (outcome === 'accepted') {
      console.log('Пользователь принял предложение об установке')
    }
    deferredPrompt.value = null
    showInstallPrompt.value = false
  }
}

const dismissPrompt = () => {
  showInstallPrompt.value = false
}
</script>

<style scoped>
.pwa-install-prompt {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  max-width: 90%;
  width: 400px;
}

.pwa-install-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.pwa-install-buttons {
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
}
</style>

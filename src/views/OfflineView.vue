<script setup lang="ts">
const refreshPage = () => {
  window.location.reload()
}
</script>

<template>
  <div class="offline-container">
    <h1>Офлайн режим</h1>
    <p>Приложение сейчас недоступно без интернет-соединения.</p>
    <p>Попробуйте проверить подключение и обновить страницу.</p>
    <Button label="Обновить" @click="refreshPage" />
  </div>
</template>


<style scoped>
.offline-container {
  text-align: center;
  padding: 2rem;
  max-width: 600px;
  margin: 0 auto;
}
</style>

<template>
  <div :class="{ 'dark-theme': themeStore.isDarkTheme }" class="main-box">
    <RouterView />
  </div>
</template>
<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useThemeStore } from '@/stores/theme';
const themeStore = useThemeStore();
</script>

<style scoped></style>

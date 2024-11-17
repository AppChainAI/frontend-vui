<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="gap-4">
    <!-- Header -->
    <!-- <header class="flex flex-col gap-4 bg-base-100">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </header> -->
    <!-- Router view -->
    <RouterView />
  </div>
  <!-- Toast 容器 -->
  <div id="toast" class="toast"></div>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}
</style>

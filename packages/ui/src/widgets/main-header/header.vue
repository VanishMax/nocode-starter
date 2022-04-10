<template>
  <header class="max-w-6xl mx-auto py-8 px-4 flex justify-between">
    <h1 class="text-3xl font-bold text-center dark:text-white">
      <router-link :to="{ name: 'auth' }">
        No-Code Starter
      </router-link>
    </h1>
    <div class="flex items-center">
      <DarkModeToggle />
    </div>
  </header>
</template>

<script setup lang="ts">
import { DarkModeToggle } from '~/features/config';
</script>

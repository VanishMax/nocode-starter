<template>
  <header class="max-w-6xl mx-auto py-8 px-4 flex justify-between">
    <h1 class="text-3xl font-bold text-center dark:text-white">
      <router-link :to="{ name: 'home' }">
        No-Code Starter
      </router-link>
    </h1>
    <div class="flex items-center">
      <router-link
        v-if="auth"
        :to="{ name: 'auth' }"
        class="inline-block mr-4 py-2 px-6 rounded border border-indigo-500 bg-indigo-600 text-white"
      >
        Auth
      </router-link>
      <DarkModeToggle />
    </div>
  </header>
</template>

<script setup lang="ts">
import DarkModeToggle from '~/shared/components/dark-mode-toggle/dark-mode-toggle.vue';

defineProps({
  auth: {
    type: Boolean,
    default: false,
  },
});
</script>

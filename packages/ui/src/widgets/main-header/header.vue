<template>
  <header class="max-w-6xl mx-auto py-8 px-4 flex justify-between">
    <h1 class="text-3xl font-bold text-center dark:text-white">
      <router-link :to="{ name: 'home' }">
        No-Code Starter
      </router-link>
    </h1>
    <div class="flex items-center">
      <router-link
        :to="{ name: userStore.isAuth ? 'projects' : 'auth' }"
        class="inline-block mr-4 py-2 px-6 rounded border border-indigo-500 bg-indigo-600 text-white"
      >
        {{ userStore.isAuth ? 'Projects' : 'Sign In' }}
      </router-link>
      <DarkModeToggle />
    </div>
  </header>
</template>

<script setup lang="ts">
import { DarkModeToggle } from '~/features/config';
import { useUserStore } from '~/entities/user';

const userStore = useUserStore();
</script>

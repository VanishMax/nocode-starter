<template>
  <header class="max-w-6xl mx-auto py-8 px-4 flex justify-between">
    <h1 class="text-3xl font-bold text-center dark:text-white">No-Code Starter</h1>
    <DarkModeToggle />
  </header>

  <section class="max-w-6xl mx-auto pt-4 px-4 sm:px-6 text-center">
    <h2 class="text-3xl font-extrabold tracking-tight text-indigo-600 sm:text-4xl">
      Your projects
    </h2>

    <div
      class="block mt-8 max-w-3xl mx-auto h-32 flex items-center justify-center
        rounded border border-indigo-900 border-dashed bg-transparent hover:bg-indigo-600
        transition cursor-pointer hover:bg-opacity-20"
    >
      <span class="text-5xl text-gray-900 dark:text-white">
        <span class="mr-4">+</span>
        Create new
      </span>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import DarkModeToggle from '~/shared/components/dark-mode-toggle/dark-mode-toggle.vue';

const count = ref(0);
</script>

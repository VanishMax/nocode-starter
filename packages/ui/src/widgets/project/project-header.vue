<template>
  <header class="h-10 py-2 px-8 w-full flex justify-between bg-gradient-to-r from-purple-500 to-pink-500">
    <div class="flex items-center">
      <router-link
        :to="{ name: 'projects' }"
        class="h-6 w-6 flex items-center justify-center bg-gray-200 rounded"
      >
        &lt;
      </router-link>
      <h1 class="ml-4 text-md font-bold text-white">
        {{ project.name }}
      </h1>
    </div>
    <div class="flex gap-2">
      <button type="button" class="h-6 w-6 flex items-center justify-center bg-gray-200 rounded">&lt;</button>
      <button type="button" class="h-6 w-6 bg-gray-200 rounded">&gt;</button>
      <div class="flex mx-4">
        <div
          v-for="user in project.users"
          :key="user._id"
          class="h-6 w-6 -ml-0.5 rounded-full border border-white bg-gray-200 text-center"
          :title="user.username"
        >
          {{ user.username?.charAt(0) || '' }}
        </div>
      </div>
      <button class="text-xs px-2 py-1 bg-blue-100 rounded">Share</button>
      <button class="text-xs px-2 py-1 bg-blue-100 rounded">Play</button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { Project } from 'nocode-starter-core';

defineProps({
  project: {
    type: Object as PropType<Project>,
    required: true,
  },
});
</script>

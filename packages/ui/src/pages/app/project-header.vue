<template>
  <header class="h-12 py-3 px-8 w-full flex justify-between bg-gradient-to-r from-indigo-700 to-pink-600">
    <div class="flex items-center">
      <router-link
        :to="{ name: 'app' }"
        class="h-8 w-8 flex items-center justify-center hover:bg-gray-100/30 transition-colors rounded"
      >
        <ArrowLeftIcon class="text-white w-4" />
      </router-link>
      <h1 class="ml-2 text-md font-bold text-white">
        {{ project.name }}
      </h1>
    </div>
    <div class="flex gap-2 items-center">
      <div class="flex mr-4">
        <div
          v-for="user in project.users"
          :key="user._id"
          class="h-6 w-6 -ml-0.5 rounded-full border border-white bg-gray-200 text-center"
          :title="user.username"
        >
          {{ user.username?.charAt(0) || '' }}
        </div>
      </div>

      <div class="flex border border-gray-100/30 rounded transition-all">
        <button
          type="button"
          title="undo"
          class="h-8 w-8 flex items-center justify-center hover:bg-gray-100/30 transition-colors rounded"
        >
          <RewindIcon class="text-white w-4" />
        </button>
        <button
          type="button"
          title="redo"
          class="h-8 w-8 flex items-center justify-center hover:bg-gray-100/30 transition-colors rounded"
        >
          <FastForwardIcon class="text-white w-4" />
        </button>
      </div>

      <button
        class="flex items-center justify-center h-8 text-sm text-white px-3 border
        border-gray-100/30 rounded hover:bg-gray-100/30 transition-colors"
      >
        Share
      </button>
      <button
        class="flex items-center justify-center h-8 text-sm text-white px-3 border
        border-gray-100/30 rounded hover:bg-gray-100/30 transition-colors"
      >
        Play
      </button>

      <DarkModeToggle />
    </div>
  </header>
</template>

<script setup lang="ts">
import { ArrowLeftIcon, RewindIcon, FastForwardIcon } from '@heroicons/vue/outline';
import { DarkModeToggle } from '~/features/config';
import { useProjectStore } from '~/entities/project';

const projectStore = useProjectStore();
const project = projectStore.project;
</script>

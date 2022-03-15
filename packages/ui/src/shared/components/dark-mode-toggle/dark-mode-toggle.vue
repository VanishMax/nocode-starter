<template>
  <button class="p-1 w-8" @click="toggleDarkMode">
    <i v-if="darkMode" class="gg-sun scale-150 text-gray-900 dark:text-gray-50" />
    <i v-else class="gg-moon scale-150 text-gray-900 dark:text-gray-50" />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useConfigStore } from '~/shared/store/config';

import './moon-icon.css';
import './sun-icon.css';

const configStore = useConfigStore();
const darkMode = computed(() => configStore.config.darkMode);

const toggleDarkMode = () => {
  configStore.toggleDarkMode();
};
</script>

<template>
  <div
    class="h-full aspect-video flex justify-center items-center rounded bg-white
    dark:shadow-gray-100/50 shadow-gray-800/30 cursor-pointer"
    @click="createNewSlide"
  >
    <span class="text-xl font-bold">+</span>
  </div>
</template>

<script lang="ts" setup>
import { useProjectStore } from '~/entities/project';

const createNewSlide = useProjectStore().createNewSlide;
</script>

<style scoped>
div {
  box-shadow: 0 0 15px -3px var(--tw-shadow-color), 0 0 6px -4px var(--tw-shadow-color);
}
</style>

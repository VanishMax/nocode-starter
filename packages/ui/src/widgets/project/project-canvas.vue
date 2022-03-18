<template>
  <main class="px-12 py-10 dark:bg-gray-800 transition-colors">
    <div class="h-full flex flex-col justify-between">
      <div class="top-slide h-4/6 max-h-4/5 mb-2">
        <CanvasSlide />
      </div>
      <div class="bottom-slides h-1/6 w-full flex mt-2">
        <SmallSlide />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { CanvasSlide } from '~/features/canvas';
import SmallSlide from '~/widgets/project/small-slide.vue';
</script>

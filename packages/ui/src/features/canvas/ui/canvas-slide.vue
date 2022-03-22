<template>
  <div
    v-aspect-video
    class="relative h-full rounded-lg mx-auto transition bg-white border
      shadow-gray-800/50 dark:shadow-gray-100/50 overflow-hidden"
    :class="[isDragOver ? 'border-dotted border-indigo-500' : 'border-transparent']"
    @dragover="dragover"
    @dragleave="dragleave"
    @drop="drop"
  >
    <div
      :style="cursorStyles"
      class="absolute h-6 -translate-1/2 border-l border-l-2 border-l-blue-500/60
        transition pointer-events-none -translate-x-1"
    />
  </div>
</template>

<script setup lang="ts">
import { useDroppable, useAspectVideoDirective } from '~/features/canvas';

const {
  isDragOver,
  cursorStyles,
  dragover,
  dragleave,
  drop,
} = useDroppable();

const vAspectVideo = useAspectVideoDirective();
</script>

<style scoped>
div {
  box-shadow: 0 0 50px -12px var(--tw-shadow-color);
}
</style>

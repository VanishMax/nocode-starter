<template>
  <div
    v-aspect-video
    class="canvas-slide relative h-full rounded-lg mx-auto transition bg-white border
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

    <template v-if="slide">
      <SlideBlock
        v-for="[key, block] in blocks"
        :key="key"
        :block="block"
        :block-id="key"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, PropType } from 'vue';
import type { Slide, SlideBlock as SlideBlockType } from 'nocode-starter-core';
import { useDroppable, useAspectVideoDirective, SlideBlock } from '~/features/canvas';

const props = defineProps({
  slide: {
    type: Object as PropType<Slide>,
    required: true,
  },
});

const blocks = computed<[string, SlideBlockType][]>(() => Object.entries(props.slide.blocks));

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
.canvas-slide {
  box-shadow: 0 0 50px -12px var(--tw-shadow-color);
}
</style>

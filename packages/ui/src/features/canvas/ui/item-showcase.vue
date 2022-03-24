<template>
  <div class="showcase">
    <label class="block text-xs mb-0.5 dark:text-gray-300">{{ label }}</label>
    <div
      draggable="true"
      :class="[dragging ? 'cursor-grabbing opacity-30' : 'cursor-grab']"
      class="flex items-center justify-center w-full p-3 rounded
            bg-gray-300/80 dark:bg-gray-200/20 overflow-hidden"
      @dragstart="dragStart"
      @dragend="dragEnd"
    >
      <SlideHeading v-if="block.type === 'heading'" :data="block.data" read-only />
      <SlideParagraph v-else-if="block.type === 'paragraph'" :data="block.data" read-only />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, PropType } from 'vue';
import type { SlideBlock } from 'nocode-starter-core';
import SlideHeading from './blocks/slide-heading.vue';
import SlideParagraph from './blocks/slide-paragraph.vue';
import { useDraggable } from '~/features/canvas';

const props = defineProps({
  block: {
    type: Object as PropType<SlideBlock>,
    required: true,
  },
});

const { dragging, dragStart, dragEnd } = useDraggable(props.block);
const label = computed(() => props.block
  .type.charAt(0).toUpperCase() + props.block.type.slice(1));
</script>

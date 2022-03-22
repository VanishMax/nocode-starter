<template>
  <div
    class="absolute rounded border border-transparent hover:border-blue-400/60"
    :style="{ left: `${block.x}%`, top: `${block.y}%`}"
  >
    <SlideHeading v-if="block.type === 'heading'" :data="block.data" />
    <SlideParagraph v-else-if="block.type === 'paragraph'" :data="block.data" />
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';
import type { SlideBlock } from 'nocode-starter-core';
import SlideHeading from '~/features/canvas/ui/blocks/slide-heading.vue';
import SlideParagraph from '~/features/canvas/ui/blocks/slide-paragraph.vue';

defineProps({
  block: {
    type: Object as PropType<SlideBlock>,
    required: true,
  },
});
</script>

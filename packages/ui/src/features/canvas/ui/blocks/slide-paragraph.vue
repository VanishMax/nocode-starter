<template>
  <p class="m-0">{{ data.text }}</p>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';
import type { SlideBlockParagraph } from 'nocode-starter-core';

defineProps({
  data: {
    type: Object as PropType<SlideBlockParagraph['data']>,
    required: true,
  },
});
</script>

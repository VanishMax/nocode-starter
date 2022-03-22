<template>
  <h1 class="m-0">{{ data.text }}</h1>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';
import type { SlideBlockHeading } from 'nocode-starter-core';

defineProps({
  data: {
    type: Object as PropType<SlideBlockHeading['data']>,
    required: true,
  },
});
</script>

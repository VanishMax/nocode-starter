<template>
  <div
    class="block mt-8 w-full max-w-3xl mx-auto h-32 flex items-center justify-center
        rounded border border-indigo-500 bg-indigo-600"
  >
    <p class="">{{ project.name }}</p>
    <div>
      Created: <time>{{ project.createdAt }}</time>
      Last accessed: <time>{{ project.accessedAt }}</time>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import type { NocodeProject } from 'nocode-starter-core';

defineProps({
  project: {
    type: Object as PropType<NocodeProject>,
    required: true,
  },
});
</script>

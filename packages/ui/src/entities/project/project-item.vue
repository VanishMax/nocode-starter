<template>
  <router-link
    :to="{ name: 'project', params: { id: project._id } }"
    class="block mt-8 w-full max-w-3xl mx-auto h-32 p-4 rounded border border-2
     border-indigo-500 bg-transparent dark:bg-indigo-600"
  >
    <p class="m-0 text-xl font-bold">{{ project.name }}</p>
    <div class="mt-8">
      <template v-if="project.createdAt">Created: <time>{{ project.createdAt }}</time></template>
      <template v-if="project.accessedAt">Last accessed: <time>{{ project.accessedAt }}</time></template>
    </div>
  </router-link>
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

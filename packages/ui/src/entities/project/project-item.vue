<template>
  <div
    class="relative block mt-8 w-full max-w-3xl mx-auto px-4 py-3 rounded border
     border-indigo-600/50 bg-transparent dark:bg-indigo-600 flex items-center transition
     shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50"
  >
    <router-link
      class="block grow m-0 text-xl font-bold dark:text-white"
      :to="{ name: 'project', params: { id: project._id } }"
    >
      {{ project.name }}
    </router-link>
    <div class="flex mr-6">
      <div
        v-for="user in project.users"
        :key="user._id"
        class="h-6 w-6 -ml-0.5 rounded-full border border-white bg-gray-200 text-center"
        :title="user.username"
      >
        {{ user.username?.charAt(0) || '' }}
      </div>
    </div>

    <Trashbin @click="removeProject" />
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import type { Project } from 'nocode-starter-core';
import Trashbin from '~/shared/ui/trashbin/trashbin.vue';
import { projectApi } from '~/entities/project/index';

const props = defineProps({
  project: {
    type: Object as PropType<Project>,
    required: true,
  },
});

const emit = defineEmits(['deleted']);

const removeProject = async () => {
  const res = await projectApi.delete(props.project._id);
  if (res.error) return;
  emit('deleted');
};
</script>

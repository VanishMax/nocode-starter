<template>
  <Header />

  <section class="max-w-6xl mx-auto pt-4 px-4 sm:px-6">
    <h2 class="text-center text-3xl font-bold tracking-tight text-indigo-600 sm:text-4xl">
      Your projects
    </h2>

    <suspense>
      <template #default>
        <ProjectItem
          v-for="(project, i) in projects"
          :key="i"
          :project="project"
        />
      </template>
    </suspense>

    <ProjectNewItem v-if="!newItemFormOpen" @click="newItemFormOpen = true" />
    <ProjectNewForm v-else @cancel="newItemFormOpen = false" @created="updateProjects" />
  </section>
</template>

<script setup lang="ts" async>
import { ref } from 'vue';
import type { NocodeProject } from 'nocode-starter-core';
import Header from '~/shared/components/header/header.vue';
import ProjectNewItem from '~/features/projects/project-new-item.vue';
import ProjectItem from '~/features/projects/project-item.vue';
import ProjectNewForm from '~/features/projects/project-new-form.vue';
import projectApi from '~/shared/api/project';

const projects = ref<NocodeProject[]>((await projectApi.list())?.data || []);

const newItemFormOpen = ref(false);

const updateProjects = async () => {
  newItemFormOpen.value = false;
  projects.value = (await projectApi.list())?.data || [];
};
</script>

<template>
  <Header />

  <section class="max-w-6xl mx-auto pt-4 px-4 sm:px-6 mb-6">
    <h2 class="text-center text-3xl font-bold tracking-tight text-indigo-600 sm:text-4xl">
      Your projects
    </h2>

    <ProjectItem
      v-for="project in projects"
      :key="project._id"
      :project="project"
      @deleted="removeProject(project._id)"
    />

    <NewProjectItem v-if="!newItemFormOpen" @click="newItemFormOpen = true" />
    <NewProjectForm v-else @cancel="newItemFormOpen = false" @created="updateProjects" />
  </section>
</template>

<script setup lang="ts" async>
import { ref } from 'vue';
import type { Project } from 'nocode-starter-core';
import Header from '~/widgets/main-header/header.vue';
import {
  ProjectItem, NewProjectForm, NewProjectItem, projectApi,
} from '~/entities/project';

const projects = ref<Project[]>((await projectApi.list())?.data || []);

const newItemFormOpen = ref(false);

const updateProjects = async (res: Project) => {
  newItemFormOpen.value = false;
  projects.value = [...projects.value, res];
};

const removeProject = (id: string) => {
  projects.value = projects.value.filter((proj) => proj._id !== id);
};
</script>

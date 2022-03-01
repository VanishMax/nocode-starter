<template>
  <Header />

  <section class="max-w-6xl mx-auto pt-4 px-4 sm:px-6 text-center">
    <h2 class="text-3xl font-bold tracking-tight text-indigo-600 sm:text-4xl">
      Your projects
    </h2>

    <ProjectItem
      v-for="(project, i) in projects"
      :key="i"
      :project="project"
    />

    <ProjectNewItem v-if="!newItemFormOpen" @click="newItemFormOpen = true" />
    <ProjectNewForm v-else @cancel="newItemFormOpen = false" />
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import Header from '~/shared/components/header/header.vue';
import ProjectNewItem from '~/features/projects/project-new-item.vue';
import ProjectItem from '~/features/projects/project-item.vue';
import { useConfigStore } from '~/shared/store/config';
import ProjectNewForm from '~/features/projects/project-new-form.vue';

const configStore = useConfigStore();
const projects = computed(() => configStore.config.projects);

const newItemFormOpen = ref(false);
</script>

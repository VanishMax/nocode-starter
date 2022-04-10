<template>
  <suspense>
    <template #default>
      <section v-if="project" class="w-full h-screen overflow-hidden flex flex-col">
        <ProjectHeader />
        <div class="grow h-full flex">
          <ProjectSidebar class="w-1/5" />
          <ProjectCanvas class="grow" />
        </div>
      </section>
    </template>
    <template #fallback>
      <Spinner />
    </template>
  </suspense>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Project } from 'nocode-starter-core';
import { useRoute, useRouter } from 'vue-router';
import Spinner from '~/shared/ui/spinner/spinner.vue';
import { projectApi, useProjectStore } from '~/entities/project';
import ProjectHeader from './project-header.vue';
import ProjectSidebar from './project-sidebar.vue';
import ProjectCanvas from './project-canvas.vue';

const router = useRouter();
const projectStore = useProjectStore();

const loadedProject = (await projectApi.single())?.data as Project;
if (!loadedProject) {
  router.push({ name: 'projects' });
}

projectStore.setProject(loadedProject);
const project = ref<Project>(loadedProject);
</script>

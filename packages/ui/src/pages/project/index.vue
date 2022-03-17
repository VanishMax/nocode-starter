<template>
  <suspense>
    <template #default>
      <section v-if="project" class="w-full h-screen overflow-hidden flex flex-col">
        <ProjectHeader :project="project" />
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
import { reactive, ref } from 'vue';
import type { Model, Project } from 'nocode-starter-core';
import { useRoute, useRouter } from 'vue-router';
import Spinner from '~/shared/ui/spinner/spinner.vue';
import projectApi from '~/entities/project/api';
import ProjectHeader from '~/widgets/project/project-header.vue';
import ProjectSidebar from '~/widgets/project/project-sidebar.vue';
import ProjectCanvas from '~/widgets/project/project-canvas.vue';

const route = useRoute();
const router = useRouter();

const loadedProject = (await projectApi.single(route.params.id as string))?.data as Project;
if (!loadedProject) {
  router.push({ name: 'projects' });
}

const project = ref<Project>(loadedProject);
const model = reactive<Model>(loadedProject?.model);
</script>

<template>
  <suspense>
    <template #default>
      <section class="app-main">
        <aside class="sidebar left">
          <form>
            <input v-model="model.project_name" type="text" placeholder="Application name">
          </form>
        </aside>
        <main class="app-canvas">
          <h1>
            You are in the app
            {{ model.project_name ? `called ${model.project_name}` : '' }}!
          </h1>
        </main>
        <aside class="sidebar right">
          <button type="button">
            Save
          </button>
        </aside>
      </section>
    </template>
    <template #fallback>
      <Spinner />
    </template>
  </suspense>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { Model, NocodeProject } from 'nocode-starter-core';
import { useRoute, useRouter } from 'vue-router';
import Spinner from '~/shared/ui/spinner/spinner.vue';
import projectApi from '~/entities/project/api';

const route = useRoute();
const router = useRouter();

const loadedProject = (await projectApi.single(route.params.id as string))?.data;
if (!loadedProject) {
  router.push({ name: 'projects' });
}

const project = ref<NocodeProject>(loadedProject as NocodeProject);
const model = reactive<Model>((loadedProject as NocodeProject).model.model);
console.log(model);
</script>

<style>
.app-main {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.app-main > * {
  height: 100%;
}

.sidebar {
  width: 15%;
  min-width: 200px;
  background-color: hsla(0, 0%, 95%);
  padding: 0.75rem;
}

.app-canvas {
  flex-grow: 1;
  padding: 1rem;
}
</style>

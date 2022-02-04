<template>
  <section class="app-main">
    <aside class="sidebar left">
      <form>
        <input v-model="modelData.project_name" type="text" placeholder="Application name">
      </form>
    </aside>
    <main class="app-canvas">
      <h1>
        You are in the app
        {{ modelData.project_name ? `called ${modelData.project_name}` : '' }}!
      </h1>
    </main>
    <aside class="sidebar right">
      <button type="button" @click="save">
        Save
      </button>
    </aside>
  </section>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import type { NocodeModel } from 'nocode-starter-core';
import nocodeModel from '~/shared/utils/model';

const modelData = reactive<NocodeModel>(await nocodeModel.load());

const save = async () => {
  await nocodeModel.save(modelData);
};
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

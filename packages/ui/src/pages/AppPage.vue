<template>
  <section class="app-main">
    <aside class="sidebar left">
      <form>
        <input v-model="data.project_name" type="text">
      </form>
    </aside>
    <main class="app-canvas">
      <h1>You are in the app!</h1>
    </main>
    <aside class="sidebar right">

    </aside>
  </section>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import type { Model } from 'nocode-starter-core';

const data = reactive<Model>({
  project_name: '',
});
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
}

.app-canvas {
  flex-grow: 1;
}
</style>

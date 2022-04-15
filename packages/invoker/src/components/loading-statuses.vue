<template>
  <suspense>
    <template #default>
      <ModelLoader>
        <template #default="{ model, error}">
          <div v-if="error">{{ error }}</div>
          <slot v-else v-bind="model" />
        </template>
      </ModelLoader>
    </template>
    <template #fallback>
      Loading...
    </template>
  </suspense>
</template>

<script setup lang="ts">
import ModelLoader from './model-loader.vue';
</script>

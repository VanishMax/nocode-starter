<template>
  <slot :error="error" :model="model" />
</template>

<script setup lang="ts">
import { loadModel } from '../utils/load-model';

const { error, model } = await loadModel();
</script>

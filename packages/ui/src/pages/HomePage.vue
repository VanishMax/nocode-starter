<template>
  <h1>Hello, world!</h1>

  <router-link to="/app">Go to the APP!</router-link>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const count = ref(0);
</script>

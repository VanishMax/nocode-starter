<template>
  <router-view v-if="configLoaded" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useConfigStore } from '~/features/config';

const configLoaded = ref(false);

const configStore = useConfigStore();
await configStore.setup();

configLoaded.value = true;
</script>

<template>
  <router-view v-if="configLoaded" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useConfigStore } from '~/features/config';

const configLoaded = ref(false);
const config = useConfigStore();
await config.setup();
configLoaded.value = true;
</script>

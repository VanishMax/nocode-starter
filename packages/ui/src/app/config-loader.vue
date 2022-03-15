<template>
  <router-view v-if="configLoaded" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import nocodeConfig from '~/shared/utils/config';

const configLoaded = ref(false);
const config = await nocodeConfig.setup();
configLoaded.value = true;
</script>

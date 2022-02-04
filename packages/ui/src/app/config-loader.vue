<template>
  <router-view v-if="configLoaded" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import nocodeConfig from '~/shared/utils/config';
import { useConfigStore } from '~/shared/store/config';

const configLoaded = ref(false);
const configStore = useConfigStore();

const config = await nocodeConfig.setup();
configLoaded.value = true;
</script>

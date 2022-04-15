<template>
  <main>
    <LoadingStatuses>
      <template #default="model">
        {{ model }}
      </template>
    </LoadingStatuses>
  </main>
</template>

<script setup lang="ts">
import LoadingStatuses from './components/loading-statuses.vue';
</script>

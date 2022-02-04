<template>
  <suspense>
    <template #default>
      <config-loader />
    </template>
    <template #fallback>
      <div class="absolute inset-0 flex items-center justify-center">
        <Spinner />
      </div>
    </template>
  </suspense>
</template>

<script setup lang="ts">
import ConfigLoader from '~/app/config-loader.vue';
import Spinner from '~/shared/components/spinner/spinner.vue';
</script>

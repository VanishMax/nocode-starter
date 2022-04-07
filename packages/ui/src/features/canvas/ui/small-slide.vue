<template>
  <div
    :class="[isActive
      ? 'shadow-indigo-800 dark:shadow-indigo-100/50'
      : 'shadow-gray-800/30 dark:shadow-gray-100/50']"
    class="h-full aspect-video flex justify-center items-center
      rounded bg-white cursor-pointer transition"
  >
    <span class="text-xl font-bold">slide</span>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  isActive: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped>
div {
  box-shadow: 0 0 15px -3px var(--tw-shadow-color), 0 0 6px -4px var(--tw-shadow-color);
}
</style>

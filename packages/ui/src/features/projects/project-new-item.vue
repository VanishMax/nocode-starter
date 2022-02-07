<template>
  <button
    type="button"
    class="block mt-8 w-full max-w-3xl mx-auto h-32 flex items-center justify-center
        rounded border border-indigo-900 border-dashed bg-transparent hover:bg-indigo-600
        transition cursor-pointer hover:bg-opacity-20"
    @click="$emit('click')"
  >
    <span class="text-5xl text-gray-900 dark:text-white">
      <span class="mr-4">+</span>
      Create new
    </span>
  </button>
</template>

<script setup lang="ts">
defineEmits(['click']);
</script>

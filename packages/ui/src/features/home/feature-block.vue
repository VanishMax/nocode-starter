<template>
  <div class="flex flex-col items-center px-8">
    <div
      :class="[`bg-${letterColor}-100`, `text-${letterColor}-500`]"
      class="rounded-full w-16 h-16 flex justify-center items-center text-2xl shadow-2xl"
    >
      {{ letter }}
    </div>

    <h2 class="uppercase mt-6 text-indigo-500 font-medium mb-3">
      {{ title }}
    </h2>
    <p class="font-light text-center text-sm text-gray-500 mb-3 dark:text-gray-200">
      {{ description }}
    </p>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  letter: {
    type: String,
    required: true,
  },
  letterColor: {
    type: String,
    required: true,
  },
});
</script>

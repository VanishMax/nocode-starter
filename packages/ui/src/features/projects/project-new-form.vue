<template>
  <form
    class="mt-8 w-full max-w-3xl mx-auto"
    @submit.prevent="submit"
  >
    <label class="mb-4 flex flex-col text-left">
      <span class="text-lg inline-block mb-1 dark:text-white">Name</span>
      <input
        v-model="formData.name"
        class="p-4 shadow rounded-md border dark:bg-slate-100 dark:border-slate-200"
        type="text"
        placeholder="Name"
      >
    </label>

    <div class="flex">
      <button
        type="button"
        class="mr-3 px-5 py-3 rounded-md shadow border bg-white hover:bg-indigo-50"
        @click="$emit('cancel')"
      >
        <span class="text-center font-medium text-indigo-600">Cancel</span>
      </button>

      <button type="submit" class="px-5 py-3 rounded-md shadow bg-indigo-600 hover:bg-indigo-700">
        <span class="text-base font-medium text-white">Create</span>
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import type { NocodeProject } from 'nocode-starter-core';

defineEmits(['cancel']);

const formData = reactive<NocodeProject>({
  name: '',
});

const submit = () => {
  const data: NocodeProject = {
    name: formData.name,
    createdAt: new Date(),
    accessedAt: new Date(),
  };
  console.log(data);
};
</script>

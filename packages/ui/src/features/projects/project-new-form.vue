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

    <label v-if="IS_APP_NATIVE" class="mb-4 flex flex-col text-left cursor-pointer">
      <span class="text-lg inline-block mb-1 dark:text-white">Directory</span>
      <!-- TODO: If the app is native, -->
      <span
        class="block p-4 w-full shadow rounded-md overflow-ellipsis p-4 leading-4
        shadow rounded-md border dark:bg-slate-100 dark:border-slate-200"
      >
        {{ formData.path }}&nbsp;
      </span>
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
import { reactive, ref } from 'vue';
import type { NocodeProject } from 'nocode-starter-core';
import { IS_APP_NATIVE } from '~/shared/utils/constants';

defineEmits(['cancel']);

const selectDir = (e: Event) => {
  console.log((e.target as HTMLInputElement).files);
};

const formData = reactive<NocodeProject>({
  name: '',
  path: '',
});

const submit = () => {
  const data: NocodeProject = {
    name: formData.name,
    path: formData.path,
    createdAt: new Date(),
    accessedAt: new Date(),
  };
  console.log(data);
};
</script>

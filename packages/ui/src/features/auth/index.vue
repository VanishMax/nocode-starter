<template>
  <Header />

  <main class="container mx-auto">
    <form
      class="mt-8 w-full max-w-3xl mx-auto"
      @submit.prevent="submit"
    >
      <h2 class="text-center text-2xl dark:text-white mb-4">Auth</h2>
      <label class="mb-4 flex flex-col text-left">
        <span class="text-lg inline-block mb-1 dark:text-white">Username</span>
        <input
          v-model="formData.username"
          class="p-4 shadow rounded-md border dark:bg-slate-100 dark:border-slate-200"
          type="text"
          placeholder="Name"
        >
      </label>

      <button type="submit" class="w-full py-3 rounded-md shadow bg-indigo-600 hover:bg-indigo-700">
        <span class="text-base font-medium text-white">Sign in or create account</span>
      </button>

      <div v-if="err" class="mt-4 py-2 px-4 bg-red-200 rounded dark:bg-red-800 dark:text-white">
        {{ err }}
      </div>
    </form>
  </main>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import Header from '~/shared/components/header/header.vue';
import userApi from '~/shared/api/user';

const router = useRouter();
const loading = ref(false);
const err = ref('');
const formData = reactive({
  username: '',
});

const submit = async () => {
  err.value = '';
  loading.value = true;
  const user = await userApi.login(formData);
  loading.value = false;

  if (user.error) {
    err.value = 'Unexpected error occurred';
    return;
  }

  await router.push({ name: 'projects' });
};
</script>

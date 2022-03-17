<template>
  <div
    ref="slideEl"
    class="h-full rounded-lg mx-auto transition bg-white shadow-gray-800/50 dark:shadow-gray-100/50"
    :style="{ width }"
  >
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';

const slideEl = ref<HTMLDivElement>();
const width = ref('0px');

const changeSlideWidth = () => {
  const rect = slideEl.value!.getBoundingClientRect();
  width.value = `${(rect.height * 16) / 9}px`;
};

onMounted(() => {
  changeSlideWidth();
  window.addEventListener('resize', changeSlideWidth);
});
onBeforeUnmount(() => window.removeEventListener('resize', changeSlideWidth));
</script>

<style scoped>
div {
  box-shadow: 0 0 50px -12px var(--tw-shadow-color);
}
</style>

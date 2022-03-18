<template>
  <div
    ref="slideEl"
    class="relative h-full rounded-lg mx-auto transition bg-white border
      shadow-gray-800/50 dark:shadow-gray-100/50 overflow-hidden"
    :class="[isDragOver ? 'border-dotted border-indigo-500' : 'border-transparent']"
    :style="{ width }"
    @dragover="dragover"
    @dragleave="dragleave"
    @drop="drop"
  >
    <div
      :style="cursorStyles"
      class="absolute h-6 -translate-1/2 border-l border-l-2 border-l-blue-500/60
        transition pointer-events-none -translate-x-1"
    />
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

const initialCursorStyles = {
  visibility: 'hidden' as 'hidden' | 'visible',
  left: '0px',
  top: '0px',
};
const cursorStyles = ref({ ...initialCursorStyles });
const isDragOver = ref(false);

const dragover = (e: DragEvent) => {
  if (e.preventDefault) {
    e.preventDefault();
  }

  isDragOver.value = true;
  cursorStyles.value = {
    visibility: 'visible',
    left: `${e.offsetX}px`,
    top: `${e.offsetY}px`,
  };
  return false;
};

const dragleave = () => {
  isDragOver.value = false;
  cursorStyles.value = { ...initialCursorStyles };
};

const drop = (e: DragEvent) => {
  e.stopPropagation();
  const data = e.dataTransfer!.getData('text/plain');
  console.log(data, e);
  dragleave();
  return false;
};
</script>

<style scoped>
div {
  box-shadow: 0 0 50px -12px var(--tw-shadow-color);
}
</style>

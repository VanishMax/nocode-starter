<template>
  <div class="showcase">
    <label class="block text-sm mb-1 dark:text-gray-300">{{ title }}</label>
    <div
      draggable="true"
      :class="[dragging ? 'cursor-grabbing opacity-30' : 'cursor-grab']"
      class="flex items-center justify-center w-full p-3 rounded
            bg-gray-300/80 dark:bg-gray-200/20 overflow-hidden"
      @dragstart="dragStart"
      @dragend="dragEnd"
    >
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

defineProps({
  title: {
    type: String,
    required: true,
  },
});

const dragging = ref(false);
const dragStart = (e: DragEvent) => {
  dragging.value = true;

  e.dataTransfer!.setData('text/plain', 'This is text to drag');
  e.dataTransfer!.dropEffect = 'move';
};
const dragEnd = (e: DragEvent) => {
  e.preventDefault();
  dragging.value = false;
};
</script>

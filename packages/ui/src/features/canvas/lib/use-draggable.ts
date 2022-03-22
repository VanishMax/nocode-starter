import { ref } from 'vue';
import type { SlideBlock } from 'nocode-starter-core';

export const useDraggable = (block: SlideBlock) => {
  const dragging = ref(false);

  const dragStart = (event: DragEvent) => {
    dragging.value = true;

    event.dataTransfer!.setData('text/plain', JSON.stringify(block));
    event.dataTransfer!.dropEffect = 'copy';
  };

  const dragEnd = (event: DragEvent) => {
    event.preventDefault();
    dragging.value = false;
  };

  return {
    dragging,
    dragStart,
    dragEnd,
  };
};

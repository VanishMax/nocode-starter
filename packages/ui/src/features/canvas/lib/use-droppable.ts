import { ref } from 'vue';
import type { SlideBlock } from 'nocode-starter-core';
import { useProjectStore } from '~/entities/project';

export const useDroppable = () => {
  const projectStore = useProjectStore();

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

  const drop = (event: DragEvent) => {
    event.stopPropagation();
    let block: SlideBlock | null;
    try {
      const targetStyles = (event.target as unknown as HTMLDivElement).getBoundingClientRect();
      const data = event.dataTransfer!.getData('text/plain');
      block = JSON.parse(data) as SlideBlock;
      block.x = (event.offsetX / targetStyles.width) * 100;
      block.y = (event.offsetY / targetStyles.height) * 100;

      projectStore.createNewBlock(block);
    } catch (_) {
      block = null;
    }

    dragleave();
    return false;
  };

  return {
    cursorStyles,
    isDragOver,
    dragover,
    dragleave,
    drop,
  };
};

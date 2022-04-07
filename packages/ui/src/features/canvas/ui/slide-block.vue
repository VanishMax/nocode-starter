<template>
  <div
    :style="{ left: `${block.x}%`, top: `${block.y}%`}"
    :class="[editing ? 'border-blue-400' : 'border-transparent hover:border-blue-400/60']"
    class="absolute p-2 border -translate-x-1/2 -translate-y-1/2"
    tabindex="0"
    @focus="toggleEditing(true)"
    @blur="handleBlur"
  >
    <SlideHeading
      v-if="block.type === 'heading'"
      :data="block.data"
      :read-only="!editing"
      @change="changeData"
      @blur="toggleEditing(false)"
    />

    <SlideParagraph
      v-else-if="block.type === 'paragraph'"
      :data="block.data"
      :read-only="!editing"
      @change="changeData"
      @blur="toggleEditing(false)"
    />
  </div>
</template>

<script lang="ts" setup>
import { PropType, ref } from 'vue';
import type { SlideBlock } from 'nocode-starter-core';
import SlideHeading from '~/features/canvas/ui/blocks/slide-heading.vue';
import SlideParagraph from '~/features/canvas/ui/blocks/slide-paragraph.vue';
import { useProjectStore } from '~/entities/project';

const props = defineProps({
  block: {
    type: Object as PropType<SlideBlock>,
    required: true,
  },
  blockId: {
    type: String,
    required: true,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
});

const projectStore = useProjectStore();

const editing = ref(false);

const toggleEditing = (val?: boolean) => {
  if (props.readonly) editing.value = false;
  editing.value = typeof val === 'undefined' ? !editing.value : val;
};

const handleBlur = (e: MouseEvent) => {
  if ((e.target as HTMLDivElement).contains(e.relatedTarget as HTMLElement)) {
    e.preventDefault();
    return;
  }
  toggleEditing(false);
};

const changeData = (data: { path: string, value: any }) => {
  projectStore.setActiveSlideBlockData(props.blockId, `data.${data.path}`, data.value);
};
</script>

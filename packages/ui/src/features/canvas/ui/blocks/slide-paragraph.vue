<template>
  <p v-if="readOnly" class="m-0">{{ data.text }}</p>

  <input
    v-else
    ref="inputEl"
    :value="data.text"
    type="text"
    @keydown.enter="triggerBlur"
    @blur="submit"
  >
</template>

<script lang="ts" setup>
import {
  nextTick, PropType, ref, watchEffect,
} from 'vue';
import type { SlideBlockParagraph } from '@nocode/core';

const props = defineProps({
  data: {
    type: Object as PropType<SlideBlockParagraph['data']>,
    required: true,
  },
  readOnly: {
    type: Boolean,
    required: true,
  },
});

interface Emits {
  (name: 'change', data: { path: string, value: any }): void,
  (name: 'blur'): void,
}
const emit = defineEmits<Emits>();

const inputEl = ref<HTMLInputElement>();

const triggerBlur = (e: KeyboardEvent) => {
  (e.target as HTMLInputElement).blur();
};
const submit = (e: InputEvent) => {
  emit('change', { path: 'text', value: (e.target as HTMLInputElement).value });
  emit('blur');
};

watchEffect(() => {
  if (!props.readOnly) {
    nextTick(() => inputEl.value!.focus());
  }
});
</script>

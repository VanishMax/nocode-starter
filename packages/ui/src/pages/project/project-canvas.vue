<template>
  <main class="px-12 py-10 dark:bg-gray-800 transition-colors">
    <div class="h-full flex flex-col justify-between">
      <div class="top-slide h-4/6 max-h-4/5 mb-2">
        <CanvasSlide v-if="activeSlide" :slide="activeSlide" />
      </div>

      <div class="bottom-slides h-1/6 w-full flex mt-2">
        <SmallSlide
          v-for="(slide, i) in model.slides"
          :key="i"
          :is-active="i === activeSlideNumber"
          :slide="slide"
          class="mr-4"
          @click="projectStore.setActiveSlideNumber(i)"
        />

        <SmallSlideCreate />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { CanvasSlide, SmallSlide, SmallSlideCreate } from '~/features/canvas';
import { useProjectStore } from '~/entities/project';

const projectStore = useProjectStore();
const model = projectStore.project!.model;

const activeSlideNumber = computed(() => projectStore.activeSlideNumber);
const activeSlide = computed(() => projectStore.activeSlide);
if (!activeSlide.value) {
  projectStore.createNewSlide();
}
</script>

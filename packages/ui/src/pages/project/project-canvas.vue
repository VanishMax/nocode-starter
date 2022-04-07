<template>
  <main class="px-12 py-10 dark:bg-gray-800 transition-colors">
    <div class="h-full flex flex-col justify-between">
      <div class="top-slide h-4/6 max-h-4/5 mb-2">
        <CanvasSlide v-if="activeSlide" :slide="activeSlide" />
      </div>

      <div class="bottom-slides h-1/6 w-full flex mt-2">
        <SmallSlide
          v-for="[key, slide] in slides"
          :key="key"
          :is-active="key === activeSlideId"
          :slide="slide"
          class="mr-4"
          @click="projectStore.setActiveSlideId(key)"
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
const activeSlideId = computed(() => projectStore.activeSlideId);
const activeSlide = computed(() => projectStore.activeSlide);

const slides = computed(() => Object.entries(model.slides).sort((a, b) => a[1].sort - b[1].sort));
</script>

import { defineStore } from 'pinia';
import type { Project, SlideBlock } from 'nocode-starter-core';

const useProjectStore = defineStore('project', {
  state: () => ({
    project: null as Project | null,
    activeSlideNumber: 0,
  }),
  actions: {
    setProject (value: Project | null) {
      this.project = value;
    },
    setActiveSlideNumber (value: number) {
      this.activeSlideNumber = value;
    },
    createNewSlide () {
      const slides = this.project!.model.slides;
      slides.push({
        blocks: [],
      });
      this.setActiveSlideNumber(slides.length - 1);
    },
    addBlock (block: SlideBlock) {
      if (this.activeSlide && !this.activeSlide.blocks?.length) {
        this.activeSlide.blocks = [];
      }

      this.activeSlide?.blocks.push(block);
    },
  },
  getters: {
    activeSlide (state) {
      return state.project?.model.slides?.[state.activeSlideNumber] || null;
    },
  },
});

export default useProjectStore;

import { defineStore } from 'pinia';
import type { Project, SlideBlock } from 'nocode-starter-core';
import { v4 as uuidv4 } from 'uuid';
import * as set from 'lodash.set';

const useProjectStore = defineStore('project', {
  state: () => ({
    project: null as Project | null,
    activeSlideId: null as string | null,
  }),
  actions: {
    setProject (value: Project | null) {
      this.project = value;
      this.activeSlideId = Object.keys(value?.model.slides || {})?.[0] || null;
      if (!this.activeSlideId) {
        this.createNewSlide();
      }
    },
    setActiveSlideId (value: string) {
      this.activeSlideId = value;
    },
    setModelData (path: string, value: any) {
      set(this.project!.model, path, value);
    },
    createNewSlide () {
      const slides = this.project!.model.slides;
      const len = Object.keys(slides).length;
      const id = uuidv4();
      slides[id] = {
        sort: len,
        blocks: {},
      };
      this.setActiveSlideId(id);
    },
    createNewBlock (block: SlideBlock) {
      if (this.activeSlide && !Object.keys(this.activeSlide.blocks)?.length) {
        this.activeSlide.blocks = {};
      }

      const slide = this.activeSlide;
      if (!slide) return;

      const len = Object.keys(slide.blocks).length;
      const id = uuidv4();
      this.setModelData(`slides[${this.activeSlideId}].blocks[${id}]`, {
        ...block,
        zIndex: len,
      } as SlideBlock);
    },
  },
  getters: {
    activeSlide (state) {
      return state.project?.model.slides?.[state.activeSlideId || ''] || null;
    },
  },
});

export default useProjectStore;

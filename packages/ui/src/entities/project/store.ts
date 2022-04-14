import { defineStore } from 'pinia';
import type { Project, SlideBlock } from '@nocode/core';
import { v4 as uuidv4 } from 'uuid';
import set from 'lodash.set';
import projectApi from './api';

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
    async setModelData (path: string, value: any) {
      if (!this.project) return;

      set(this.project.model, path, value);
      const res = await projectApi.changeModel(this.project._id, {
        [path]: value,
      });
    },
    setSlideData (slide: string, path: string, value: any) {
      this.setModelData(`slides.${slide}.${path}`, value);
    },
    setSlideBlockData (slide: string, block: string, path: string, value: any) {
      this.setSlideData(slide, `blocks.${block}.${path}`, value);
    },
    setActiveSlideData (path: string, value: any) {
      if (!this.activeSlideId) return;
      this.setSlideData(this.activeSlideId, path, value);
    },
    setActiveSlideBlockData (block: string, path: string, value: any) {
      if (!this.activeSlideId) return;
      this.setSlideBlockData(this.activeSlideId, block, path, value);
    },

    createNewSlide () {
      const slides = this.project!.model.slides;
      const len = Object.keys(slides).length;
      const id = uuidv4();
      this.setModelData(`slides.${id}`, {
        sort: len,
        blocks: {},
      });
      this.setActiveSlideId(id);
    },
    createNewBlock (block: SlideBlock) {
      const slide = this.activeSlide;
      if (!slide) return;

      if (!Object.keys(slide.blocks)?.length) {
        this.setActiveSlideData('blocks', {});
      }

      const len = Object.keys(slide.blocks).length;
      const id = uuidv4();
      this.setActiveSlideData(`blocks.${id}`, {
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

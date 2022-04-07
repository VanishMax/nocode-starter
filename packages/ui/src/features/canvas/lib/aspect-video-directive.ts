import { type Directive, ref } from 'vue';

export const useAspectVideoDirective = (): Directive => {
  const div = ref<HTMLDivElement>();

  const changeSlideWidth = () => {
    const rect = div.value!.getBoundingClientRect();
    div.value!.style.width = `${(rect.height * 16) / 9}px`;
  };

  return {
    mounted: (el: HTMLDivElement) => {
      div.value = el;
      changeSlideWidth();
      window.addEventListener('resize', changeSlideWidth);
    },
    beforeUnmount: () => {
      window.removeEventListener('resize', changeSlideWidth);
    },
  };
};

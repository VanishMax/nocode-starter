import type { SlideBlock, SlideBlockType, SlideTypeToDataMap } from '../types/model';

const initialBlockData: SlideTypeToDataMap = {
  heading: {
    text: 'Example',
  },
  paragraph: {
    text: 'Example text',
  },
};

export const getShowcaseBlocks = (): SlideBlock[] => {
  return Object.entries(initialBlockData).map(([key, value]) => {
    return {
      zIndex: 10,
      x: 0,
      y: 0,
      type: key as SlideBlockType,
      data: value,
    }
  });
};

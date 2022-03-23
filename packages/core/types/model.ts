export type SlideBlockType = 'heading' | 'paragraph';

export interface SlideBlockBase {
  type: SlideBlockType,
  zIndex: number,
  x: number,
  y: number,
}

interface SlideBlockDataBase {}

interface SlideBlockHeadingData extends SlideBlockDataBase {
  text: string,
}
export interface SlideBlockHeading extends SlideBlockBase {
  type: 'heading',
  data: SlideBlockHeadingData,
}

interface SlideBlockParagraphData extends SlideBlockDataBase  {
  text: string,
}
export interface SlideBlockParagraph extends SlideBlockBase {
  type: 'paragraph',
  data: SlideBlockParagraphData,
}

export interface SlideTypeToDataMap extends Record<SlideBlockType, SlideBlockDataBase> {
  heading: SlideBlockHeadingData,
  paragraph: SlideBlockParagraphData,
}

export type SlideBlock = SlideBlockHeading | SlideBlockParagraph;

export interface Slide {
  sort: number,
  blocks: Record<string, SlideBlock>,
}

export interface Model {
  _id: string,
  // `slides` could be an array, but it'd be difficult to manage the order if it changes
  slides: Record<string, Slide>,
}

import { ModelDto } from './dto/model.dto';
import { v4 as uuidv4 } from 'uuid';

export const modelData: Omit<Required<ModelDto>, '_id'> = {
  slides: {
    [uuidv4()]: {
      sort: 0,
      blocks: {},
    },
  },
};

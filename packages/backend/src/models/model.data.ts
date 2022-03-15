import { ModelDto } from './dto/model.dto';

export const modelData: Omit<Required<ModelDto>, '_id'> = {
  color: '',
  project_name: '',
};

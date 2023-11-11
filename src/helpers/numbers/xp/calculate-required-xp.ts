import { ceil } from 'lodash';

export default (level: number) => {
  return ceil((5 / 2) * (-1 + 20 * Math.pow(level, 2)));
};

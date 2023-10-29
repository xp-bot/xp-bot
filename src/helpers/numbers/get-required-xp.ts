import { ceil } from 'lodash';

export default (level: number) =>
  ceil((5 / 2) * (-1 + 20 * Math.pow(level, 2)));

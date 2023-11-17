import { floor } from 'lodash';

export default (xp: number) => {
  const level = floor(Math.sqrt(2 * xp + 5) / 10);

  if (isNaN(level)) return 0;

  return level;
};

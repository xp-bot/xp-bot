import { IGameResult } from '../../interfaces/games';
import { random } from 'lodash';

export default (
  rewardXp: number,
  cooldown: number,
  lastPlay: number,
  min: number = 1,
  max: number = 6,
): IGameResult => {
  const timeSinceLastPlay = Date.now() - lastPlay;

  if (timeSinceLastPlay < cooldown * 1000)
    return {
      hitCooldown: true,
      countdownRemaining: cooldown * 1000 - timeSinceLastPlay,
      result: 0,
      xp: 0,
    };

  const rolledNumber = random(min, max);
  const xp = rewardXp * rolledNumber;

  return {
    hitCooldown: false,
    countdownRemaining: 0,
    result: rolledNumber,
    xp: xp,
  };
};

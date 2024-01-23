import { Guild } from '../../api/generated';
import { floor } from 'lodash';

export default (ms: number, guild: Guild) => {
  const voiceTime = ms / 1000 - guild.values?.voicejoincooldown ?? 0;
  const voiceXP = floor((voiceTime * (guild.values?.voicexp ?? 0)) / 60);
  return voiceXP > 0 ? voiceXP : 0;
};

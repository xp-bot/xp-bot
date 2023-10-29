import { ColorResolvable, EmbedBuilder } from 'discord.js';

// TODO: Add XP LOGO
export default (
  type?: 'normal' | 'success' | 'info' | 'error',
  enableThumbnail?: boolean
) => {
  let color: ColorResolvable;
  switch (type) {
  case 'normal':
    color = 'Blurple';
    break;
  case 'success':
    color = 'Green';
    break;
  case 'info':
    color = 'Yellow';
    break;
  case 'error':
    color = 'Red';
    break;

  default:
    color = 'Blurple';
    break;
  }
  return new EmbedBuilder()
    .setColor(color);
  // .setThumbnail(
  //   enableThumbnail ? process.env.LOGO : null
  // );
};

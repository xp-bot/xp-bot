import { ColorResolvable, EmbedBuilder } from 'discord.js';

export enum DefaultEmbedType {
  NORMAL,
  SUCCESS,
  INFO,
  ERROR,
}

// TODO: Add XP LOGO
export default (type?: DefaultEmbedType, _enableThumbnail?: boolean) => {
  let color: ColorResolvable;
  switch (type) {
    case DefaultEmbedType.NORMAL:
      color = 'Blurple';
      break;
    case DefaultEmbedType.SUCCESS:
      color = 'Green';
      break;
    case DefaultEmbedType.INFO:
      color = 'Yellow';
      break;
    case DefaultEmbedType.ERROR:
      color = 'Red';
      break;

    default:
      color = 'Blurple';
      break;
  }
  return new EmbedBuilder().setColor(color);
  // .setThumbnail(
  //   enableThumbnail ? process.env.LOGO : null
  // );
};

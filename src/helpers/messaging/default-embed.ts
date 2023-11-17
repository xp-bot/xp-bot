import { ColorResolvable, EmbedBuilder } from 'discord.js';

export enum DefaultEmbedType {
  NORMAL,
  SUCCESS,
  INFO,
  ERROR,
  EASTEREGG,
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
    case DefaultEmbedType.EASTEREGG:
      color = 0xdaa520;
      break;

    default:
      color = 'Blurple';
      break;
  }
  const embed = new EmbedBuilder().setColor(color);

  type === DefaultEmbedType.EASTEREGG &&
    embed.setFooter({ text: '✨ Hey! You found an easter egg!' });

  // embed.setThumbnail(
  //   enableThumbnail ? process.env.LOGO : null
  // );

  return embed;
};

import ensureSlashCommandLocalization from './ensure-slash-command-localization';
import sanatiseCommandName from './sanatise-command-name';
import { CommandPassthrough, CommandOptionType } from '../../classes/command';
import { SlashCommandBooleanOption, SlashCommandBuilder } from 'discord.js';
import { t } from 'i18next';
import { forEach, get } from 'lodash';

export default (passthrough: CommandPassthrough) => {
  const slashCommand = new SlashCommandBuilder().setName(passthrough.name);
  const fallbackString = `${passthrough.name} command`;
  const sanatisedCommandName = sanatiseCommandName(passthrough.name);

  passthrough.adminOnly && slashCommand.setDefaultMemberPermissions('0');

  ensureSlashCommandLocalization(passthrough);

  const localize = (key: string, fallback: string, lng: string) =>
    t([`command_info.${key}`, fallback], {
      ns: `${sanatisedCommandName}_command`,
      lng,
    });

  const localizations = {
    de: localize('name', slashCommand.name, 'de'),
    'en-US': localize('name', slashCommand.name, 'en'),
  };

  slashCommand
    .setDescription(localize('description', fallbackString, 'en'))
    .setNameLocalizations(localizations)
    .setDescriptionLocalizations(localizations);

  const commandOptionTypes: Record<CommandOptionType, string> = {
    [CommandOptionType.STRING]: 'addStringOption',
    [CommandOptionType.INTEGER]: 'addIntegerOption',
    [CommandOptionType.BOOLEAN]: 'addBooleanOption',
    [CommandOptionType.USER]: 'addUserOption',
    [CommandOptionType.CHANNEL]: 'addChannelOption',
    [CommandOptionType.ROLE]: 'addRoleOption',
    [CommandOptionType.MENTIONABLE]: 'addMentionableOption',
    [CommandOptionType.NUMBER]: 'addNumberOption',
  };

  forEach(passthrough.options, (option) => {
    const optionNames = {
      'en-US': localize(`option.${option.name}.name`, option.name, 'en'),
      de: localize(`option.${option.name}.name`, option.name, 'de'),
    };

    const optionDescriptions = {
      'en-US': localize(`option.${option.name}.description`, option.name, 'en'),
      de: localize(`option.${option.name}.description`, option.name, 'de'),
    };

    const buildOptionConfiguration = (o: SlashCommandBooleanOption) =>
      o
        .setName(optionNames['en-US'])
        .setDescription(optionDescriptions['en-US'])
        .setRequired(option.required)
        .setNameLocalizations(optionNames)
        .setDescriptionLocalizations(optionDescriptions);

    const commandOptionType = get(commandOptionTypes, option.type);
    if (commandOptionType)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (slashCommand as any)[commandOptionType](buildOptionConfiguration);
  });

  return slashCommand;
};

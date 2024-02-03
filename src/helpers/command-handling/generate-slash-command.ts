import ensureSlashCommandLocalization from './ensure-slash-command-localization';
import sanatiseCommandName from './sanatise-command-name';
import { CommandPassthrough, CommandOptionType } from '../../classes/command';
import {
  APIApplicationCommandOptionChoice,
  SlashCommandBooleanOption,
  SlashCommandBuilder,
  SlashCommandStringOption,
} from 'discord.js';
import { t } from 'i18next';
import { forEach, get, map, replace, toLower } from 'lodash';

export default (passthrough: CommandPassthrough) => {
  const slashCommand = new SlashCommandBuilder().setName(passthrough.name);
  const sanatisedCommandName = sanatiseCommandName(passthrough.name);

  passthrough.adminOnly && slashCommand.setDefaultMemberPermissions('0');

  ensureSlashCommandLocalization(passthrough);

  const localize = (
    key: string,
    fallback: string,
    lng: string,
    sanatise?: boolean,
  ) => {
    const translated = t([`command_info.${key}`, fallback], {
      ns: `${sanatisedCommandName}_command`,
      lng,
    });
    return sanatise ? toLower(replace(translated, /\s+/g, '')) : translated;
  };

  const nameLocalizations = {
    de: localize('name', slashCommand.name, 'de'),
    'en-US': localize('name', slashCommand.name, 'en'),
  };
  const descriptionLocalizations = {
    de: localize('description', slashCommand.name, 'de'),
    'en-US': localize('description', slashCommand.name, 'en'),
  };

  slashCommand
    .setDescription(descriptionLocalizations['en-US'])
    .setNameLocalizations(nameLocalizations)
    .setDescriptionLocalizations(descriptionLocalizations);

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
      'en-US': localize(`option.${option.name}.name`, option.name, 'en', true),
      de: localize(`option.${option.name}.name`, option.name, 'de', true),
    };

    const optionDescriptions = {
      'en-US': localize(`option.${option.name}.description`, option.name, 'en'),
      de: localize(`option.${option.name}.description`, option.name, 'de'),
    };

    const buildOptionConfiguration = (o: SlashCommandStringOption) => {
      o.setName(optionNames['en-US'])
        .setDescription(optionDescriptions['en-US'])
        .setRequired(option.required)
        .setNameLocalizations(optionNames)
        .setDescriptionLocalizations(optionDescriptions);

      if (
        option.type === CommandOptionType.STRING ||
        option.type === CommandOptionType.NUMBER
      ) {
        const choices: APIApplicationCommandOptionChoice<string>[] = map(
          option.choices,
          (choice) => {
            const choiceNames = {
              'en-US': localize(
                `option.${option.name}.choice.${choice.name}`,
                choice.name,
                'en',
              ),
              de: localize(
                `option.${option.name}.choice.${choice.name}`,
                choice.name,
                'de',
              ),
            };
            return {
              name: choiceNames['en-US'],
              value: choice.name,
              name_localizations: choiceNames,
            };
          },
        );
        o.setChoices(...choices);
      }
      return o;
    };
    const commandOptionType = get(commandOptionTypes, option.type);
    if (commandOptionType)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (slashCommand as any)[commandOptionType](buildOptionConfiguration);
  });

  return slashCommand;
};

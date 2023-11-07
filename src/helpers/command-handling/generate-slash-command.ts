import ensureSlashCommandLocalization from './ensure-slash-command-localization';
import sanatiseCommandName from './sanatise-command-name';
import { CommandPassthrough, CommandOptionType } from '../../classes/command';
import { SlashCommandBuilder } from 'discord.js';
import { t } from 'i18next';
import { forEach } from 'lodash';

export default (passthrough: CommandPassthrough) => {
  const slashCommand = new SlashCommandBuilder().setName(passthrough.name);

  const fallbackString = `${passthrough.name} command`;
  const sanatisedCommandName = sanatiseCommandName(passthrough.name);

  ensureSlashCommandLocalization(passthrough);

  // Localize command name and description
  slashCommand
    .setDescription(
      t(
        [
          'command_info.description',
          slashCommand.description || fallbackString,
        ],
        {
          ns: `${sanatisedCommandName}_command`,
          lng: 'en',
        },
      ),
    )
    .setNameLocalizations({
      de: t(['command_info.name', slashCommand.name], {
        ns: `${sanatisedCommandName}_command`,
        lng: 'de',
      }),
      'en-US': t(['command_info.name', slashCommand.name], {
        ns: `${sanatisedCommandName}_command`,
        lng: 'en',
      }),
    })
    .setDescriptionLocalizations({
      de: t(['command_info.description', fallbackString], {
        ns: `${sanatisedCommandName}_command`,
        lng: 'de',
      }),
      'en-US': t(['command_info.description', fallbackString], {
        ns: `${sanatisedCommandName}_command`,
        lng: 'en',
      }),
    });

  // Localize command options
  forEach(passthrough.options, (option) => {
    const optionNames = {
      'en-US': t([`command_info.option.${option.name}.name`, option.name], {
        ns: `${sanatiseCommandName(passthrough.name)}_command`,
        lng: 'en',
      }),
      de: t([`command_info.option.${option.name}.name`, option.name], {
        ns: `${sanatiseCommandName(passthrough.name)}_command`,
        lng: 'de',
      }),
    };

    const optionDescriptions = {
      'en-US': t(
        [`command_info.option.${option.name}.description`, option.name],
        {
          ns: `${sanatiseCommandName(passthrough.name)}_command`,
          lng: 'en',
        },
      ),
      de: t([`command_info.option.${option.name}.description`, option.name], {
        ns: `${sanatiseCommandName(passthrough.name)}_command`,
        lng: 'de',
      }),
    };
    const buildOptionConfiguration = (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      o: any,
    ) =>
      o
        .setName(optionNames['en-US'])
        .setDescription(optionDescriptions['en-US'])
        .setRequired(option.required);
    switch (option.type) {
      case CommandOptionType.STRING:
        slashCommand.addStringOption(buildOptionConfiguration);
        break;
      case CommandOptionType.INTEGER:
        slashCommand.addIntegerOption(buildOptionConfiguration);
        break;
      case CommandOptionType.BOOLEAN:
        slashCommand.addBooleanOption(buildOptionConfiguration);
        break;
      case CommandOptionType.USER:
        slashCommand.addUserOption(buildOptionConfiguration);
        break;
      case CommandOptionType.CHANNEL:
        slashCommand.addChannelOption(buildOptionConfiguration);
        break;
      case CommandOptionType.ROLE:
        slashCommand.addRoleOption(buildOptionConfiguration);
        break;
      case CommandOptionType.MENTIONABLE:
        slashCommand.addMentionableOption(buildOptionConfiguration);
        break;
      case CommandOptionType.NUMBER:
        slashCommand.addNumberOption(buildOptionConfiguration);
        break;
    }
  });
  return slashCommand;
};

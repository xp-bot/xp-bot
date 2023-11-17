import sanatiseCommandName from './sanatise-command-name';
import { CommandPassthrough } from '../../classes/command';
import i18next from 'i18next';
import { forEach } from 'lodash';

export default (passthrough: CommandPassthrough) => {
  const sanatisedCommandName = sanatiseCommandName(passthrough.name);

  // Check if localization keys exist
  if (
    !i18next.exists('command_info.name', {
      ns: `${sanatisedCommandName}_command`,
    })
  ) {
    console.error(
      `[Command Registration] Localization key missing for command name: ${sanatisedCommandName}`,
    );
    process.exit(1);
  }

  if (
    !i18next.exists('command_info.description', {
      ns: `${sanatisedCommandName}_command`,
    })
  ) {
    console.error(
      `[Command Registration] Localization key missing for command description: ${sanatisedCommandName}`,
    );
    process.exit(1);
  }

  forEach(passthrough.options, (option) => {
    if (
      !i18next.exists(`command_info.option.${option.name}.name`, {
        ns: `${sanatisedCommandName}_command`,
      })
    ) {
      console.error(
        `[Command Registration] Localization key missing for option name: ${option.name} in command: ${sanatisedCommandName}`,
      );
      process.exit(1);
    }

    if (
      !i18next.exists(`command_info.option.${option.name}.description`, {
        ns: `${sanatisedCommandName}_command`,
      })
    ) {
      console.error(
        `[Command Registration] Localization key missing for option description: ${option.name} in command: ${sanatisedCommandName}`,
      );
      process.exit(1);
    }
  });
};

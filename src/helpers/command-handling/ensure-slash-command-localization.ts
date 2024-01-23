import sanatiseCommandName from './sanatise-command-name';
import { CommandPassthrough } from '../../classes/command';
import i18next from 'i18next';
import { forEach, some } from 'lodash';

export default (passthrough: CommandPassthrough) => {
  const sanatisedCommandName = sanatiseCommandName(passthrough.name);
  const keys = ['name', 'description'];
  const baseNamespace = `${sanatisedCommandName}_command`;

  forEach(keys, (key) => {
    if (!i18next.exists(`command_info.${key}`, { ns: baseNamespace })) {
      console.error(
        `[Command Registration | ${sanatisedCommandName}] Localization key missing for command ${key}`,
      );
      process.exit(1);
    }
  });

  forEach(passthrough.options, (option) => {
    if (
      some(
        keys,
        (key) =>
          !i18next.exists(`command_info.option.${option.name}.${key}`, {
            ns: baseNamespace,
          }),
      )
    ) {
      console.error(
        `[Command Registration | ${sanatisedCommandName} / ${option.name}] Localization key missing for option`,
      );
      process.exit(1);
    }
  });
};

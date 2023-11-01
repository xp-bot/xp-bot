# Contributing to v9

Thank you for considering contributing to the v9 project. Your contributions help us improve and maintain our software. To get started, please follow the guidelines below.

## Getting Started

1. **Fork the Repository**: You can start by forking this repository. This will create a copy of the project in your own GitHub account.

2. **Create a New Branch**: It's important to work in a dedicated branch for your changes. Branch names should follow this structure:

   ```
   <type>/<issue>/<subject>

   Examples:
   - feature/#12/add-ping-command
   - fix/#43/fix-ping-command

   ```

3. **Contribute**: Make your changes in your dedicated branch and commit your work regularly.
4. **Create a Pull Request**: Once your changes are ready, create a pull request to merge your branch into the `development` branch. The `development` branch will be merged into `production` when we're ready to release a new version.

## Coding Standards

To maintain consistency and code quality, please adhere to the following coding standards:

- **Formatting**: We use `prettier` formatting rules, defined in the `.prettierrc` file.

- **Linting**: Follow the project's `eslint` rules, which are defined in the `.eslintrc` file.

- **Error Handling**: Ensure that promises rejection is always handled, even if you are confident they will not be rejected.

## Localization Guidelines
### i18next
We're using namespaces to seperate usecases (Commands, Utilities, Environments, ...). For any word separation, we use snake_case. For Categories we use decimals as separation.

Key categories will always be named in a singular form. (e.g. button.x instead of buttons.x)

```diff
// These are valid keys. //
// namespace: global
+  ok
+  dismiss

// namespace: level_command
+  title.required_xp
+  subtitle.required_xp

// These are invalid keys. //
-  global.button.ok
-  form.title_createList
-  global.title.create-list
```

### Command Localization Guidelines
> **Attention**: These guidelines have to be followed to the letter. Otherwise, command localization might break and your pull request will be rejected.

- Every command has to have a namespace. The namespace is the command name in snake_case followed by `_command`. (e.g. set_xp_command, party_command, ...)
- Every command's namespace, has to have the following keys:
<<<<<<< HEAD
  - command_info.name
  - command_info.description
=======
  - `command_info.name`
  - `command_info.description`
- If the command has values, these have to be named as follows:
  - `command_info.option.<option_name>.name`
  - `command_info.option.<option_name>.description`
  > Note, that these translations will not be applied automatically. You have to apply them manually in the command's declaration code.\
  > Example:\
  > ```ts
  > export default new Command(
  >   new SlashCommandBuilder().setName('level').addIntegerOption((option) =>
  >     option
  >       .setName('level')
  >       // This description is essentially a fallback.
  >       .setDescription('The level to check the required xp for.')
  >       // Also provide fallbacks for option names. (The second argument in the array is the fallback value. "level" in this case.)
  >       .setNameLocalizations({
  >         de: t(['command_info.option.level.name', 'level'], {
  >           ns: 'level_command',
  >           lng: 'de',
  >         }),
  >         'en-US': t(['command_info.option.level.name', 'level'], {
  >           ns: 'level_command',
  >           lng: 'en',
  >         }),
  >       })
  >       // Also provide fallbacks for option descriptions. (The second argument in the array is the fallback value.)
  >       .setDescriptionLocalizations({
  >         de: t(['command_info.option.level.description', 'The level to check the required xp for.'], {
  >           ns: 'level_command',
  >           lng: 'de',
  >         }),
  >         'en-US': t(['command_info.option.level.description', 'The level to check the required xp for.'], {
  >           ns: 'level_command',
  >           lng: 'en',
  >         }),
  >       })
  >       .setRequired(true),
  >   ),
  >   execute,
  > );
  > ```
>>>>>>> 694fdef77b37237d452c560a0983a4a20a526f14

### Global Namespace

The global namespace is intended to be used for very generic translations or strings that can and will be used everywhere without context.

> E.g. title.success in namespace set_xp_command, button.join in namespace party_command, ok in namespace global, ...

```ts
  // Building a key correctly
  party_command / `title`.`success`
        ^            ^        ^
    Namespace | Category | Content
```

## Pull Requests

1. **Link to an Issue**: Every pull request should be linked to an existing issue. If there's no relevant issue, please create one before submitting your pull request.

2. **Detailed Description**: Provide a detailed description of your changes and explain why you made them. Each pull request should focus on one feature or bugfix.

3. **Small Pull Requests**: Keep your pull requests as small as possible. This makes it easier to review and merge changes.

## Contributing Guidelines

Please follow these guidelines to ensure your contributions are accepted:

- Follow coding standards and handle promise rejections.
- Link your pull request to an issue.
- Provide a clear and detailed description of your changes.

> **Note**: Pull requests that do not follow these guidelines will be rejected.

> For more information on branch and commit naming conventions, you can refer to this [Convention Guide](https://dev.to/varbsan/a-simplified-convention-for-naming-branches-and-commits-in-git-il4).

---

### Thank you for your contributions, and happy coding! ❤️

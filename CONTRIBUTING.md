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

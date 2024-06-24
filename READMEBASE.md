# Offshorly Docs

---

## Description

This serves as an repository for sharing notes between Offshorly developers.

## Development

This project has helper functions for linting markdown files which is necessary to make the content consistent across different files.

### Prerequisites

It is recommended to use VSCode as the code editor of choice as there are extensions that are needed to lint markdown errors. Download Vscode [here](https://code.visualstudio.com/download)

To start the development app, follow these commands:

1.  Use proper Node version
    It is recommended to use nvm to quickly change node versions. This command will use the indicated Node version in the `.nvmrc` file.

        nvm use

2.  Install dependencies:

        pnpm i

3.  Start development app:

        pnpm dev

this should start the dev app and rebuild the app for changes

With this, you can start writing content that will be validated on save

### Todo

1.  **Testing**
    Test files within the content folder if it is markdown
2.  **CI / CD**
    Create github workflow that will trigger for PR Requests to ensure content follows the linting guide.

---

# General

Tab the following code on Machine A:
```bash
code --list-extensions | xargs -L 1 echo code --install-extension
```
and run the output on Machine Z

Here is the extensions list:
```bash
code --install-extension vscode-icons-team.vscode-icons
code --install-extension bierner.markdown-emoji
code --install-extension CoenraadS.bracket-pair-colorizer-2
code --install-extension aaron-bond.better-comments
code --install-extension dracula-theme.theme-dracula
code --install-extension obrejla.netbeans-light-theme
code --install-extension EditorConfig.EditorConfig
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode
code --install-extension sysoev.vscode-open-in-github
code --install-extension adpyke.codesnap
code --install-extension jpoissonnier.vscode-styled-components
code --install-extension mikestead.dotenv
code --install-extension ms-vscode-remote.remote-ssh
code --install-extension ms-vscode-remote.remote-ssh-edit
code --install-extension webben.browserslist
code --install-extension stylelint.vscode-stylelint
```
# Default Editor for Git
Change the config:
```bash
git config --global core.editor "code --wait"
```
# Update settings.json

Here are my preferences:
```json
{
  "workbench.iconTheme": "vscode-icons",
  "workbench.colorTheme": "Default Light+",
  "editor.tabSize": 2,
  "editor.fontSize": 14,
  "editor.minimap.enabled": false,
  "terminal.integrated.shell.windows": "C:\\Program Files\\Git\\bin\\bash.exe",
  "terminal.external.windowsExec": "C:\\\\Program Files\\\\Git\\\\bin\\\\bash.exe",
  "workbench.startupEditor": "welcomePage",
  "terminal.integrated.shell.osx": "/bin/bash",
  "terminal.integrated.rendererType": "dom",
  "files.autoSave": "onFocusChange",
  "diffEditor.ignoreTrimWhitespace": false,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[javascript]": {
    "editor.formatOnSave": false
  },
  "[typescript]": {
    "editor.formatOnSave": false
  },
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.workingDirectories": [
    { "pattern": "./packages/*" },
    { "pattern": "./projects/*" },
    { "pattern": "./services/*" }
  ],
  "emmet.excludeLanguages": [
    "markdown"
  ],
  "workbench.editor.labelFormat": "short",
  "typescript.preferences.importModuleSpecifier": "non-relative"
}
```

# Snippets

`CommandPalette` > `Preferences: Configure User Snippets`

__javascript__, __javascriptreact__, __typescript__, __typescriptreact__

```json
{
  "Print to console": {
    "prefix": "cc",
    "body": [
      "console.log($0);"
    ],
    "description": "Log output to console"
  },
  "Import statement": {
    "prefix": "pp",
    "body": [
      "import { $0 } from $1;"
    ],
    "description": "Import awesome module"
  },
  "Import star": {
    "prefix": "pps",
    "body": [
      "import * as $1 from $0;"
    ]
  },
  "Import React": {
    "prefix": "ppr",
    "body": [
      "import React from 'react';$0"
    ]
  },
  "Todo Comment": {
    "prefix": "todo",
    "body": "// todo ilyakortasov: $0"
  },
  "Warn Comment": {
    "prefix": "warn",
    "body": "// * warn ilyakortasov: $0"
  }
}
```

__javascript__, __javascriptreact__

```json
{
  "Export Component": {
    "prefix": "eec",
    "body": [
      "const ${1:App} = () => ();",
      "",
      "export default $0;"
    ]
  }
}
```

__typescript__, __typescriptreact__

```json
{
  "Import React with types": {
    "prefix": "pprt",
    "body": [
      "import React, { ${1:FC} } from 'react';$0"
    ]
  }
}
```

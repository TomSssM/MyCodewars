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
code --install-extension pranaygp.vscode-css-peek
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
code --install-extension ms-vscode-remote.remote-ssh
code --install-extension ms-vscode-remote.remote-ssh-edit
code --install-extension streetsidesoftware.code-spell-checker
code --install-extension streetsidesoftware.code-spell-checker-russian
code --install-extension mikestead.dotenv
code --install-extension webben.browserslist
code --install-extension stylelint.vscode-stylelint
code --install-extension Orta.vscode-jest
code --install-extension jock.svg
code --install-extension ChakrounAnas.turbo-console-log
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
  "editor.tabSize": 2,
  "terminal.integrated.shell.windows": "C:\\Program Files\\Git\\bin\\bash.exe",
  "terminal.external.windowsExec": "C:\\\\Program Files\\\\Git\\\\bin\\\\bash.exe",
  "editor.fontSize": 14,
  "git.confirmSync": false,
  "git.autofetch": true,
  "git.enableSmartCommit": true,
  "editor.minimap.enabled": false,
  "editor.renderLineHighlight": "line",
  "editor.highlightActiveIndentGuide": true,
  "workbench.colorTheme": "Default Light+",
  "window.zoomLevel": 0,
  "terminal.integrated.rendererType": "dom",
  "terminal.integrated.shell.osx": "/bin/bash",
  "diffEditor.ignoreTrimWhitespace": false,
  "files.autoSave": "onFocusChange",
  "workbench.startupEditor": "welcomePage",
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
    { "pattern": "./services/*" }
  ],
  "codesnap.transparentBackground": true,
  "codesnap.boxShadow": "none",
  "svg.preview.mode": "svg",
  "cSpell.language": "en,ru",
  "cSpell.enabled": false,
  "jest.autoRun": { "watch": false },
  "jest.enableCodeLens": false
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

# General

Tab the following code on Machine A:
```bash
code --list-extensions | xargs -L 1 echo code --install-extension
```
and run the output on Machine Z

Here is the extensions list:
```bash
code --install-extension bierner.markdown-emoji
code --install-extension CoenraadS.bracket-pair-colorizer-2
code --install-extension dbaeumer.vscode-eslint
code --install-extension EditorConfig.EditorConfig
code --install-extension esbenp.prettier-vscode
code --install-extension Gruntfuggly.todo-tree
code --install-extension obrejla.netbeans-light-theme
code --install-extension streetsidesoftware.code-spell-checker
code --install-extension streetsidesoftware.code-spell-checker-russian
code --install-extension sysoev.vscode-open-in-github
code --install-extension vscode-icons-team.vscode-icons
code --install-extension PKief.material-icon-theme
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
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[javascript]": {
    "editor.formatOnSave": true
  },
  "[typescript]": {
    "editor.formatOnSave": true
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
  "cSpell.enabled": false,
  "cSpell.userWords": [
    "arity",
    "uncheck"
  ],
  "todo-tree.regex.regex": "(//|#|<!--|/\\*|/\\*[\\n\\s\\*\\w]*)\\s*($TAGS)(:|\\W)",
  "todo-tree.general.tags": [
    "fixme",
    "todo",
    "warn"
  ],
  "todo-tree.regex.regexCaseSensitive": false,
  "todo-tree.tree.scanMode": "current file",
  "todo-tree.highlights.customHighlight": {
    "fixme": {
      "background": "green",
      "foreground": "black",
      "iconColour": "orange"
    },
    "todo": {
      "background": "yellow",
      "foreground": "black",
      "iconColour": "yellow"
    },
    "warn": {
      "background": "yellow",
      "foreground": "black",
      "iconColour": "yellow"
    }
  },
  "workbench.editor.labelFormat": "short"
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
  },
  "Component": {
    "prefix": "ccp",
    "body": [
      "const ${1:App}: FC${0} = () => ();"
    ]
  }
}
```

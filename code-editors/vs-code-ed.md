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
  "window.zoomLevel": 0,
  "terminal.integrated.rendererType": "dom",
  "terminal.integrated.shell.osx": "/bin/bash",
  "diffEditor.ignoreTrimWhitespace": false,
  "files.autoSave": "onFocusChange",
  "workbench.startupEditor": "welcomePage",
  "workbench.colorTheme": "Default Light+",
  "editor.minimap.enabled": false,
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
  "editor.accessibilityPageSize": 12,
  "emmet.excludeLanguages": [
    "markdown"
  ],
  "workbench.iconTheme": "vscode-icons",
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
  }
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
  }
}
```
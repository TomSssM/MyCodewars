# Code Editors ( My Preferences )

## Brackets
**At First:**

Use [Brackets-ExtensionsBulkInstall](https://github.com/milosh86/Brackets-ExtensionsBulkInstall) to import [myExtensionsList.json.](./myExtensionsList.json)

**Afterward:**

- disable enturn.quick-search
- font-size 16px
- Edit Tab: 
  - Auto Close Braces
  - Autoprefix on save
- View Tab
  - No Split
  - Automatically Close Search
  - Highlight Active Line
  - Line Numbers
  - Word Wrap Quick View on Hover
  - ighlight Selection
  - Grayscale Icons
  - Indent Guides

## VS Code
### Manually

Tab the following code on Machine A:
```bash
code --list-extensions | xargs -L 1 echo code --install-extension
``` 
and run the output on Machine Z

Here is the extensions list:
```bash
code --install-extension CoenraadS.bracket-pair-colorizer
code --install-extension dracula-theme.theme-dracula
code --install-extension eamodio.gitlens
code --install-extension gurayyarar.dummytextgenerator
code --install-extension HookyQR.beautify
code --install-extension kisstkondoros.vscode-gutter-preview
code --install-extension mrmlnc.vscode-autoprefixer
code --install-extension Perkovec.emoji
code --install-extension PKief.material-icon-theme
code --install-extension pranaygp.vscode-css-peek
code --install-extension robertohuertasm.vscode-icons
code --install-extension sean.Macaroon-theme
code --install-extension ullissescastro.theme-bracketslight
code --install-extension davidmart.theme-jsfiddle-like-syntax-vscode
```
### Default Editor for Git

Change the config:
```bash
git config --global core.editor "code --wait"
```
### Update settings.json

Here are my preferences:
```javascript
{
    "workbench.iconTheme": "material-icon-theme",
    "editor.tabSize": 2,
    "terminal.integrated.shell.windows": "C:\\Program Files\\Git\\bin\\bash.exe",
    "terminal.external.windowsExec": "C:\\\\Program Files\\\\Git\\\\bin\\\\bash.exe",
    "editor.fontSize": 16,
    "git.confirmSync": false,
    "git.autofetch": true,
    "git.enableSmartCommit": true,
    "editor.minimap.enabled": false,
    "editor.renderLineHighlight": "line",
    "editor.highlightActiveIndentGuide": true,
}
```

## Atom
*to be continued . . .*

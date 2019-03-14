# General

Tab the following code on Machine A:
```bash
code --list-extensions | xargs -L 1 echo code --install-extension
``` 
and run the output on Machine Z

Here is the extensions list:
```bash
code --install-extension CoenraadS.bracket-pair-colorizer
code --install-extension eamodio.gitlens
code --install-extension gurayyarar.dummytextgenerator
code --install-extension HookyQR.beautify
code --install-extension kisstkondoros.vscode-gutter-preview
code --install-extension mrmlnc.vscode-autoprefixer
code --install-extension Perkovec.emoji
code --install-extension PKief.material-icon-theme
code --install-extension pranaygp.vscode-css-peek
code --install-extension robertohuertasm.vscode-icons
code --install-extension msjsdiag.debugger-for-chrome
code --install-extension ritwickdey.LiveServer
code --install-extension techer.open-in-browser
code --install-extension gencer.html-slim-scss-css-class-completion
code --install-extension formulahendry.auto-rename-tag
code --install-extension aaron-bond.better-comments
code --install-extension streetsidesoftware.code-spell-checker

code --install-extension dracula-theme.theme-dracula
code --install-extension johnpapa.winteriscoming
code --install-extension ullissescastro.theme-bracketslight
code --install-extension eryouhao.brackets-light-pro
code --install-extension sean.Macaroon-theme
code --install-extension davidmart.theme-jsfiddle-like-syntax-vscode
code --install-extension Heron.firefox-devtools-theme
```
# Default Editor for Git
Change the config:
```bash
git config --global core.editor "code --wait"
```
# Update settings.json

Here are my preferences:
```javascript
{
    "workbench.iconTheme": "vscode-icons",
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
    "workbench.colorTheme": "Default Light+",
}
```
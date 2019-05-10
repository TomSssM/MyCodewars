# General

Tab the following code on Machine A:
```bash
code --list-extensions | xargs -L 1 echo code --install-extension
```
and run the output on Machine Z

Here is the extensions list:
```bash
code --install-extension CoenraadS.bracket-pair-colorizer
code --install-extension HookyQR.beautify
code --install-extension kisstkondoros.vscode-gutter-preview
code --install-extension mrmlnc.vscode-autoprefixer
code --install-extension pranaygp.vscode-css-peek
code --install-extension msjsdiag.debugger-for-chrome
code --install-extension ritwickdey.LiveServer
code --install-extension techer.open-in-browser
code --install-extension gencer.html-slim-scss-css-class-completion
code --install-extension formulahendry.auto-rename-tag
code --install-extension aaron-bond.better-comments
code --install-extension streetsidesoftware.code-spell-checker
code --install-extension EditorConfig.EditorConfig
code --install-extension mrmlnc.vscode-scss
code --install-extension bierner.markdown-emoji
code --install-extension dbaeumer.vscode-eslint

code --install-extension robertohuertasm.vscode-icons
code --install-extension PKief.material-icon-theme

code --install-extension obrejla.netbeans-light-theme
code --install-extension dracula-theme.theme-dracula
code --install-extension karsany.vscode-ideal-theme
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
    "editor.tabSize": 4,
    "terminal.integrated.shell.windows": "C:\\Program Files\\Git\\bin\\bash.exe",
    "terminal.external.windowsExec": "C:\\\\Program Files\\\\Git\\\\bin\\\\bash.exe",
    "editor.fontSize": 14,
    "git.confirmSync": false,
    "git.autofetch": true,
    "git.enableSmartCommit": true,
    "editor.minimap.enabled": false,
    "editor.renderLineHighlight": "line",
    "editor.highlightActiveIndentGuide": true,
    "workbench.colorTheme": "NetBeans Light Theme"
}
```

# Snippets
Go to -> `Preferences: Configure User Snippets`, select the .json file for JavaScript and paste:
```json
{
	"Console Log": {
		"prefix": "cc",
		"body": [
			"console.log($1);$0"
		],
		"description": "Console Log"
	},
	"Function Decl": {
		"prefix": "ff",
		"body": [
			"function ${1:name}(${2:parm}) {",
			"  $0",
			"}"
		],
		"description": "Function Decl"
	},
	"Arrow Function": {
		"prefix": "ffa",
		"body": [
			"const ${1:name} = (${2:parm}) => $0;"
		],
		"description": "Arrow Function"
	},
	"Array Methods": {
		"prefix": "arm",
		"body": [
			"${1|forEach,map,reduce,every|}((${2:item}) => $0);"
		],
		"description": "Array Methods"
	}
}
```
# Hyper Config

`Object.assign` with the default config:

```js
module.exports = {
  config: {
    cursorColor: "rgba(248,28,229,0.8)",
    selectionColor: "rgba(0,0,255,1)",
    shell: "/bin/bash",
  },
  keymaps: {
    "tab:new": "command+n",
    "window:new": "command+shift+n",
    "pane:splitVertical": "command+shift+d",
    "pane:splitHorizontal": "command+d",
    "tab:next": "command+alt+right",
    "tab:prev": "command+alt+left",
    "pane:next": "command+]",
    "pane:prev": "command+[",
    "editor:cut": "command+x",
    "editor:copy": "command+c",
    "editor:paste": "command+v",
    "editor:movePreviousWord": "alt+left",
    "editor:moveNextWord": "alt+right",
    "editor:moveBeginningLine": "command+left",
    "editor:moveEndLine": "command+right",
    "editor:deletePreviousWord": "alt+backspace",
    "editor:deleteNextWord": "alt+delete",
    "editor:deleteBeginningLine": "command+backspace",
    "editor:deleteEndLine": "command+delete",
  },
};
```
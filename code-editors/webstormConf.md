# WebStorm Configs

## Settings

- Editor > Code Style
    - JavaScript, TypeScript
        - Punctuation
            - [x] ... Use `single` quotes `always`
        - Spaces
            - [x] ES6 import/export braces
- [x] Editor > Color Scheme > `IntelliJ Light`
- [x] Tools > Terminal > Shell Path: `/bin/bash`
- [ ] Appearance & Behavior > System Settings > Use "safe write"
- [x] Languages & Frameworks > JavaScript > Code Quality Tools > ESLint > Automatic ESLint configuration
- [x] Editor > Code Style > EditorConfig > Scheme > Project
- [x] Editor > Font
    - Font > `JetBrains Mono`
    - Size > `12`
    - Line spacing > `1.2`

**Note:** Empty checkbox means you need to uncheck the setting in the Preferences

## Keymap

- Move Line Down `FN + DOWN`
- Move Line Up `FN + UP`
- Comment with Line Comment - `COMMAND + /`
- Indent Line or Selection `COMMAND + }`
- Unindent Line or Selection `COMMAND + {`
- Move Caret Backward a Paragraph - `OPTION + UP`
- Move Caret Backward a Paragraph with Selection - `OPTION + SHIFT + UP`
- Move Caret Forward a Paragraph - `OPTION + DOWN`
- Move Caret Forward a Paragraph with Selection - `OPTION + SHIFT + DOWN`
- Move Caret to Text Start - `COMMAND + UP`
- Move Caret to Text Start with Selection - `SHIFT + COMMAND + UP`
- Move Caret to Text End - `COMMAND + DOWN`
- Move Caret to Text End with Selection - `SHIFT + COMMAND + DOWN`
- Move Caret to Line Start with Selection - `SHIFT + COMMAND LEFT`
- Move Caret to Line End with Selection - `SHIFT + COMMAND RIGHT`
- Move Caret to Line Start - `COMMAND LEFT` or `SHIFT + COMMAND + ;`
- Move Caret to Line End - `COMMAND RIGHT` or `COMMAND + ;`
- Clone Caret Above - `SHIFT + FN + UP`
- Clone Caret Below - `SHIFT + FN + DOWN`
- Duplicate Line or Selection - `COMMAND + D`
- Delete Line - `COMMAND + R`
- Terminal - ``CONTROL + ` ``
- Plug-ins -> Terminal -> Switch Focus To Editor `ESC`
- Undo - `COMMAND + Z`
- Redo - `COMMAND + SHIFT + Z`
- Paste From History... - `COMMAND + Shift + V`
- Version Control Systems -> Commit... - `COMMAND + K`
- Version Control Systems -> Push... - `COMMAND + Shift + K`
- Preferences - `COMMAND + ,`
- Add Selection for Next Occurrence - `COMMAND + G`
- Find in Path - `SHIFT + COMMAND + F`
- Plugins -> Markdown Support -> Toggle italic mode - `COMMAND + I`
- Plugins -> Markdown Support -> Toggle bold mode - `COMMAND + B`
- Select Next Tab - `OPTION + COMMAND + RIGHT`
- Select Previous Tab - `OPTION + COMMAND + LEFT`
- Scroll Up - `OPTION + COMMAND + UP`
- Scroll Down - `OPTION + COMMAND + DOWN`
- Scroll to Center `OPTION + COMMAND + /`
- Select All - `COMMAND + A`
- File - `COMMAND + N`
- Create new directory or package - `COMMAND + SHIFT + N`
- Active Next Window - ``COMMAND + ` ``
- Line/Column - `COMMAND + L`
- Split Line - `COMMAND + ENTER`
- Show Usages - `COMMAND + SHIFT + W`
- Main Menu -> Navigate -> Back - `OPTION + COMMAND + ,`
- Main Menu -> Navigate -> Forward - `OPTION + COMMAND + .`
- Main Menu -> Code -> Folding -> Expand - `COMMAND + =`
- Main Menu -> Code -> Folding -> Collapse - `COMMAND + -`
- Main Menu -> Navigate -> Go to File... - `COMMAND + P`
- Show Context Actions -> `OPTION + ENTER`

## Snippets ( Live Templates )

### General

#### cc

Syntax:
```
console.log($val$);$END$
```

#### c

Syntax:
```
console.log($val$)$END$
```

#### $

Syntax:
```
document.querySelector('$query$')$END$
```

#### $$

Syntax:
```
document.querySelectorAll('$query$')$END$
```

**Note:** all live templates are applicable in `JavaScript and TypeScript`.

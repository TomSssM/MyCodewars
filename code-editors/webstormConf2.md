# WebStorm Configs

## Settings

- Editor > Code Style
    - JavaScript, TypeScript
        - Punctuation
            - [x] ... Use `single` quotes `always`
        - Spaces
            - [x] ES6 import/export braces
- [x] Editor > Color Scheme > `Default` (`IntelliJ Light`)
- [x] Tools > Terminal > Shell Path: `/bin/bash`
- [ ] Appearance & Behavior > System Settings > Use "safe write"
- [x] Languages & Frameworks > JavaScript > Code Quality Tools > ESLint > Automatic ESLint configuration
- [x] Editor > Code Style > EditorConfig > Scheme > Project

**Note:** Empty checkbox means you need to uncheck the setting in the Preferences

## Keymap

- Move Line Down - `FN + DOWN`
- Move Line Up - `FN + UP`
- Comment with Line Comment - `COMMAND + /`
- Editor Actions -> Indent Line or Selection - `COMMAND + }`
- Editor Actions -> Unindent Line or Selection - `COMMAND + {`
- Auto-Indent Lines - `CONTROL + OPTION + I`
- Move Caret Backward a Paragraph - `OPTION + UP`
- Move Caret Backward a Paragraph with Selection - `OPTION + SHIFT + UP`
- Move Caret Forward a Paragraph - `OPTION + DOWN`
- Move Caret Forward a Paragraph with Selection - `OPTION + SHIFT + DOWN`
- Move Caret to Text Start - `COMMAND + UP`
- Move Caret to Text Start with Selection - `SHIFT + COMMAND + UP`
- Move Caret to Text End - `COMMAND + DOWN`
- Move Caret to Text End with Selection - `SHIFT + COMMAND + DOWN`
- Move Caret to Line Start - `COMMAND + LEFT` or `SHIFT + COMMAND + ;`
- Move Caret to Line Start with Selection - `SHIFT + COMMAND + LEFT`
- Move Caret to Line End - `COMMAND + RIGHT` or `COMMAND + ;`
- Move Caret to Line End with Selection - `SHIFT + COMMAND + RIGHT`
- Clone Caret Above - `SHIFT + FN + UP`
- Clone Caret Below - `SHIFT + FN + DOWN`
- Delete to Line Start - `COMMAND + DELETE`
- Duplicate Line or Selection - `COMMAND + D`
- Terminal - ``CONTROL + ` ``
- Plugins -> Terminal -> Switch Focus To Editor - `ESC`
- Editor Actions -> Escape - `ESC`
- Editor Actions -> Focus Editor - `ESC`
- Undo - `COMMAND + Z`
- Redo - `COMMAND + SHIFT + Z`
- Paste From History... - `COMMAND + Shift + V`
- Version Control Systems -> Commit... - `COMMAND + K`
- Version Control Systems -> Push... - `COMMAND + SHIFT + K`
- Preferences - `COMMAND + ,`
- Add Selection for Next Occurrence - `COMMAND + G`
- Find Previous / Move to Previous Occurrence - `COMMAND + SHIFT + G`
- Main Men -> Edit -> Find -> Find in Files - `SHIFT + COMMAND + F`
- Main Menu -> Navigate -> Go to File... - `COMMAND + P`
- Select Next Tab - `OPTION + COMMAND + RIGHT`
- Select Previous Tab - `OPTION + COMMAND + LEFT`
- Scroll Up - `OPTION + COMMAND + UP`
- Scroll Down - `OPTION + COMMAND + DOWN`
- Scroll to Center - `OPTION + COMMAND + /`
- Select All - `COMMAND + A`
- Main Menu -> File -> New -> File - `COMMAND + N`
- Main Menu -> File -> Create new directory or package - `COMMAND + SHIFT + N`
- Active Next Window - ``COMMAND + ` ``
- Go to Line:Column - `COMMAND + L`
- Show Usages - `COMMAND + SHIFT + W`
- Main Menu -> Navigate -> Back - `CONTROL + {`
- Main Menu -> Navigate -> Forward - `CONTROL + }`
- Main Menu -> Code -> Folding -> Expand - `COMMAND + =`
- Main Menu -> Code -> Folding -> Collapse - `COMMAND + -`
- Show Context Actions - `OPTION + ENTER`
- Show Quick Fixes - `OPTION + ENTER`
- Main Menu -> Code -> Generate -  `CONTROL + ENTER`
- Main Menu -> File -> Open Recent - `COMMAND + SHIFT + O`
- Main Menu -> File -> Open... - `COMMAND + O`

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

#### todo

Syntax:
```
// todo ilyakortasov:$END$
```

**Note:** all live templates are applicable in `JavaScript and TypeScript`.

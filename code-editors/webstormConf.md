# WebStorm Configs

## Settings

- Editor > Code Style
    - JavaScript, TypeScript
        - Punctuation
            - [x] ... Use `single`
        - Spaces
            - [x] ES6 import/export braces
- [x] Editor > Color Scheme > Default
- [x] Tools > Terminal > Shell Path: `<which bash>`
- [ ] Appearance & Behavior > System Settings > Use "safe write"
- [x] Languages & Frameworks > JavaScript > Code Quality Tools > ESLint > Automatic ESLint configuration
- [x] Editor > Code Style > EditorConfig > Scheme > Project

**Note:** Empty checkbox means you need to uncheck the setting in the Preferences

## Keymap

- Move Line Down `FN + DOWN`
- Move Line Up `FN + UP`
- Indent Line or Selection `COMMAND + }`
- Unindent Line or Selection `COMMAND + {`
- Move Caret Backward a Paragraph - `OPTION + UP`
- Move Caret Backward a Paragraph with Selection - `OPTION + SHIFT + UP`
- Move Caret Forward a Paragraph - `OPTION + DOWN`
- Move Caret Forward a Paragraph with Selection - `OPTION + SHIFT + DOWN`
- Move Caret to Text Start - `COMMAND + UP`
- Move Caret to Text Start with Selection - `SHIFT + COMMAND + UP`
- Move Caret to Text Bottom - `COMMAND + DOWN`
- Move Caret to Text Bottom with Selection - `SHIFT + COMMAND + DOWN`
- Move Caret to Line Start with Selection - `SHIFT + COMMAND LEFT`
- Move Caret to Line End with Selection - `SHIFT + COMMAND RIGHT`
- Move Caret to Line Start - `COMMAND LEFT` or `SHIFT + COMMAND + ;`
- Move Caret to Line End - `COMMAND RIGHT` or `COMMAND + ;`
- Clone Caret Above - `SHIFT + FN + UP`
- Clone Caret Below - `SHIFT + FN + DOWN`
- Duplicate Line or Selection - `COMMAND + D`
- Delete Line - `COMMAND + R`
- Version Control - `F1`
- Terminal - ``CONTROL + ` ``
- Undo - `COMMAND + Z`
- Redo - `COMMAND + SHIFT + Z`
- Increase Font Size - `COMMAND + =`
- Decrease Font Size - `COMMAND + Minus`
- Paste From History... - `COMMAND + Shift + V`
- Git Commit - `COMMAND + K`
- Git Push - `COMMAND + Shift + K`
- Preferences - `COMMAND + ,`
- Add Selection for Next Occurrence - `COMMAND + G`
- Find in Path - `SHIFT + COMMAND + F`
- Toggle italic mode ( Plugins -> Markdown Support ) - `COMMAND + I`
- Toggle bold mode ( Plugins -> Markdown Support ) - `COMMAND + B`
- Select Next Tab - `OPTION + COMMAND + RIGHT`
- Select Tab - `OPTION + COMMAND + LEFT`
- Select All - `COMMAND + A`
- File - `COMMAND + N`
- Create new directory or package - `COMMAND + SHIFT + N`
- Active Next Window - ``COMMAND + ` ``
- Line/Column - `COMMAND + L`
- Show Context Menu - `SHIFT + OPTION + ENTER`
- Main Menu -> Window -> Editor Tabs -> Close - `COMMAND + T`
- Main Menu -> Navigate -> Jump to Navigation Bar -> Close - `COMMAND + 0`
- Jump to Source - `COMMAND + W`

## Snippets ( Live Templates )

### General

#### cc

Syntax:
```
console.log($val$);$END$
```
- [x] Applicable in `JavaScript Statements Only`

#### c

Syntax:
```
console.log($val$)$END$
```
- [x] Applicable in `JavaScript Expressions Only`

#### $

Syntax:
```
document.querySelector('$query$')$END$
```
- [x] Applicable in `JavaScript Everywhere`

#### $$

Syntax:
```
document.querySelectorAll('$query$')$END$
```
- [x] Applicable in `JavaScript Everywhere`

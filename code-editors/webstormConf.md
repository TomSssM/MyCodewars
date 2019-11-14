# WebStorm Configs

## Settings

- [x] Editor > Code Style > JavaScript > Tabs and Indents > Keep indents on empty lines
- [x] Editor > Color Scheme > Default
- [x] Editor > Color Scheme > Console Colors > Background: `#000`
- [x] Editor > Color Scheme > Console Colors > Standard output: `#dadada`
- [x] Tools > Terminal > Shell Path: `C:\Program Files\Git\bin\bash.exe`
- [ ] Appearance & Behavior > System Settings > Use "safe write" ( uncheck )
- [ ] Editor > Inspections > JavaScript > Code style issues > Unterminated Statement
- [x] Languages & Frameworks > JavaScript > Code Quality Tools > ESLint > Automatic ESLint configuration
- [x] Editor > Code Style > EditorConfig > Scheme > Project

## Keymap

### windows

- Move Line Down `ALT + DOWN`
- Move Line Up `ALT + UP`
- Indent Line or Selection `CTRL + }`
- Unindent Line or Selection `CTRL + {`
- Move Caret Backward a Paragraph - `CTRL + UP`
- Move Caret Forward a Paragraph - `CTRL + DOWN`
- Move Caret to Line Start - `CTRL + Shift + ;`
- Move Caret to Line End - `CTRL + ;`
- Clone Caret Above - `ALT + SHIFT + UP`
- Clone Caret Below - `ALT + SHIFT + DOWN`
- Duplicate Line or Selection - `CTRL + D`
- Delete Line - `CTRL + R`
- Version Control - `F1`
- Terminal - ``CTRL + `\``
- Undo - `CTRL + Z`
- Redo - `CTRL + Y`
- Increase Font Size - `CTRL + =`
- Decrease Font Size - `CTRL + -`
- Open previously Copied Stuff - `CTRL + SHIFT + V`
- Git Commit - `CTRL + K`
- Git Push - `CTRL + SHIFT + K`

### mac

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
- Terminal - ``CONTROL + `\``
- Undo - `COMMAND + Z`
- Redo - `COMMAND + SHIFT + Z`
- Increase Font Size - `COMMAND + =`
- Decrease Font Size - `COMMAND + Minus`
- Open previously Copied Stuff - `COMMAND + Shift + V`
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

#### lis

Syntax:
```
addEventListener($type$, $arg$ => $END$);
```
- [x] Applicable in `JavaScript Everywhere`
- [ ] Uncheck `Reformat according to style`

#### mod

Syntax:
```
import $modName$ from '$PATH$';$END$
```
- [x] Applicable in `JavaScript Statements Only`

### Jest Stuff

#### desc

Syntax:
```
describe('$desc$', () => {$END$});
```
- [x] Applicable in `JavaScript Statements Only`
- [ ] Uncheck `Reformat according to style`

#### desp

Syntax:
```
describe('$class$.prototype.$method$', () => {$END$});
```
- [x] Applicable in `JavaScript Statements Only`
- [ ] Uncheck `Reformat according to style`

#### tst

Syntax:
```
test('$desc$', $async$() => {$END$});
```
- [x] Applicable in `JavaScript Statements Only`
- [ ] Uncheck `Reformat according to style`

#### exp

Syntax:
```
expect($smth$).$matcher$($val$);$END$
```
- [x] Applicable in `JavaScript Statements Only`
- [x] go to `Edit variables` and set `Default value` of `$matcher$` to `"toBe"`

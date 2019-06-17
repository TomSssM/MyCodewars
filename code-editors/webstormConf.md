# WebStorm Configs

## Settings

- [x] Editor > Code Style > JavaScript > Tabs and Indents > Keep indents on empty lines
- [x] Editor > Color Scheme > Default
- [x] Editor > Color Scheme > Console Colors > Background: `#000`
- [x] Editor > Color Scheme > Console Colors > Standard output: `#dadada`
- [x] Tools > Terminal > Shell Path: `C:\Program Files\Git\bin\bash.exe`
- [ ] Appearance & Behavior > System Settings > Use "safe write" ( uncheck )
- [x] Languages & Frameworks > JavaScript > Code Quality Tools > ESLint > Automatic ESLint configuration

## Keymap

- Move Line Down `ALT + DOWN`
- Move Line Up `ALT + UP`
- Indent Line or Selection `CTRL + }`
- Unindent Line or Selection `CTRL + {`
- Move Caret Backward a Paragraph - `CTRL + UP`
- Move Caret Forward a Paragraph - `CTRL + DOWN`
- Move Caret to Line Start - `CTRL + Page Down`
- Move Caret to Line End - `CTRL + End`
- Clone Caret Above - `ALT + SHIFT + UP`
- Clone Caret Below - `ALT + SHIFT + DOWN`
- Duplicate Line or Selection - `CTRL + D`
- Delete Line - `CTRL + R`
- Version Control - `F1`
- Terminal - `CTRL + `\`
- Undo - `Ctrl + Z`
- Redo - `Ctrl + Y`

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

# WebStorm Configs

## Settings

- [x] Editor > Code Style > JavaScript > Tabs and Indents > Keep indents on empty lines
- [x] Editor > Color Scheme > Default
- [x] Editor > Color Scheme > Console Colors > Background: `#000`
- [x] Editor > Color Scheme > Console Colors > Standard output: `#dadada`
- [x] Tools > Terminal > Shell Path: `C:\Program Files\Git\bin\bash.exe`
- [ ] Appearance & Behavior > System Settings > Use "safe write" ( uncheck )

## Keymap

- Move Line Down `ALT + DOWN`
- Move Line Up `ALT + UP`
- Indent Line or Selection `CTRL + }`
- Unindent Line or Selection `CTRL + {`
- Move Caret Backward a Paragarph - `CTRL + UP`
- Move Caret Forward a Paragarph - `CTRL + DOWN`
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

_Note: all snippets are only expandable with_ `Tab`

### cc

Syntax:
```
console.log($val$);$END$
```
- [x] Applicable in: JavaScript Statements Only

### c

Syntax:
```
console.log($val$)$END$
```
- [x] Applicable in: JavaScript Expressions Only

### $

Syntax:
```
document.querySelector("$query$")$END$
```
- [x] Applicable in: JavaScript Everywhere

## $$

Syntax:
```
document.querySelectorAll("$query$")$END$
```
- [x] Applicable in: JavaScript Everywhere

## lis

Syntax:
```
.addEventListener($type$, $arg$ => $END$);
```
- [x] Applicable in: JavaScript Everywhere
- [ ] uncheck `Reformat according to style`

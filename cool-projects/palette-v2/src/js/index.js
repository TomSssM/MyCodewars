import HambBtn from './HambBtn.js';
import SettBtn from './SettBtn.js';
import GridSettBtn from './GridSettBtn.js';
import Paint from './Paint.js';
import ColorToolbox from './ColorToolbox.js';
import BrushTool from './BrushTool.js';
import EraseTool from './EraseTool.js';
import ToolsShortcuts from './ToolsShortcuts.js';
import BucketTool from './BucketTool.js';
import EyeDropTool from './EyeDropTool.js';
import MoveTool from './MoveTool.js';
import TransformTool from './TransformTool.js';
import StorageHandler from './StorageHandler.js';

new HambBtn({
    elem: document.querySelector('#js-header-btn'),
});

new SettBtn({
    settBtn: document.querySelector('#js-header-sett-btn'),
    settMenu: document.querySelector('#js-header-sett'),
});

const colorToolbox = new ColorToolbox({
    colors: Array.from(document.querySelectorAll('.colors__color-cir')),
    currColor: document.querySelector('#js-curr-col'),
    prevColor: document.querySelector('#js-prev-col'),
    colorContainer: document.querySelector('#js-colors-cont'),
    buttonClassName: '.colors__color',
    colorCircleClass: '.colors__color-cir',
});

if(sessionStorage.getItem('curr-color') || sessionStorage.getItem('prev-color')) {
    colorToolbox.restoreFromStorage(sessionStorage);
}

const paint = new Paint({
    colorToolbox,
    canvas: document.querySelector('#js-canvas'),
});

const brushTool = new BrushTool({
    paint,
    classNameCanvas: 'canvas--tool-brush',
    button: document.querySelector('#js-brush'),
    classNameButton: 'tools-container__tool--active',
});

const eraseTool = new EraseTool({
    paint,
    classNameCanvas: 'canvas--tool-erase',
    button: document.querySelector('#js-erase'),
    classNameButton: 'tools-container__tool--active',
});

const bucketTool = new BucketTool({
    paint,
    classNameCanvas: 'canvas--tool-bucket',
    button: document.querySelector('#js-bucket'),
    classNameButton: 'tools-container__tool--active',
});

const eyeDropTool = new EyeDropTool({
    paint,
    brush: brushTool,
    classNameCanvas: 'canvas--tool-eye-drop',
    button: document.querySelector('#js-eye-drop'),
    classNameButton: 'tools-container__tool--active',
});

const moveTool = new MoveTool({
    paint,
    classNameCanvas: 'canvas--tool-move',
    button: document.querySelector('#js-move'),
    classNameButton: 'tools-container__tool--active',
});

const transformTool = new TransformTool({
    paint,
    classNameCanvas: 'canvas--tool-transform',
    button: document.querySelector('#js-transform'),
    classNameButton: 'tools-container__tool--active',
    classNameDefault: 'canvas__elem',
    classNameTransformed: 'canvas__elem--transformed',
});

new GridSettBtn({
    paint,
    elem: document.querySelector('#js-change-grid'),
    modalCoverClassName: 'modal-cover',
    modalClassName: 'modal-window',
    modalFadeOutClassName: 'modal-window--fadeout',
    modalElem: document.querySelector('#js-modal-wind'),
    outputElem: document.querySelector('#js-modal-window-output'),
});

const prevCanvas = sessionStorage.getItem('prev-canvas-picture');
if(prevCanvas !== null) {
    paint.loadFromStorage({
        prevCanvasArr: JSON.parse(prevCanvas), 
        size: sessionStorage.getItem('prev-canvas-size'), 
        transformTool
    });
} else {
    paint.createCanvas(12);
}

new StorageHandler({
    elem: document.querySelector('#js-reset-storage'),
    paint,
    colorToolbox,
});

const toolsShortcuts = new ToolsShortcuts({
    paint,
    toolButtonsOrdered: Array.from(document.querySelectorAll('.tools__tool')),
    tools: [brushTool, eraseTool, bucketTool, 
            eyeDropTool, moveTool, transformTool],
});

paint.replaceCurrentTool(brushTool);
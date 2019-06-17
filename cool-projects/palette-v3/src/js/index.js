import SettBtn from './SettBtn.js';
import HoverManager from './HoverManager.js';
import HambMenuButton from './HambMenuButton.js';
import ClearCanvasButton from './ClearCanvasButton.js';
import GridSettBtn from './GridSettBtn.js';
import Paint from './Paint.js';
import ColorToolbox from './ColorToolbox.js';
import BrushTool from './BrushTool.js';
import AnimationPlayer from './AnimationPlayer.js';
import EraseTool from './EraseTool.js';
import ToolsShortcuts from './ToolsShortcuts.js';
import BucketTool from './BucketTool.js';
import EyeDropTool from './EyeDropTool.js';
import MoveTool from './MoveTool.js';
import TransformTool from './TransformTool.js';
import FramesManager from './FramesManager.js';
import FrameDragManager from './FrameDragManager.js';

const hambMenuBtn = new HambMenuButton({
  btn: document.querySelector('#js-header-btn'),
  main: document.querySelector('.main'),
});

hambMenuBtn.init();

const colorToolbox = new ColorToolbox({
  colors: Array.from(document.querySelectorAll('.colors__color-cir')),
  currColor: document.querySelector('#js-curr-col'),
  prevColor: document.querySelector('#js-prev-col'),
  colorContainer: document.querySelector('#js-colors-cont'),
  buttonClassName: '.colors__color',
  colorCircleClass: '.colors__color-cir',
});

colorToolbox.init();

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

brushTool.init();

const hoverManager = new HoverManager({
  colorToolbox,
  paint,
  brush: brushTool,
});

hoverManager.init();

const eraseTool = new EraseTool({
  paint,
  classNameCanvas: 'canvas--tool-erase',
  button: document.querySelector('#js-erase'),
  classNameButton: 'tools-container__tool--active',
});

eraseTool.init();

const bucketTool = new BucketTool({
  paint,
  classNameCanvas: 'canvas--tool-bucket',
  button: document.querySelector('#js-bucket'),
  classNameButton: 'tools-container__tool--active',
  brush: brushTool,
});

bucketTool.init();

const eyeDropTool = new EyeDropTool({
  paint,
  brush: brushTool,
  classNameCanvas: 'canvas--tool-eye-drop',
  button: document.querySelector('#js-eye-drop'),
  classNameButton: 'tools-container__tool--active',
});

eyeDropTool.init();

const moveTool = new MoveTool({
  paint,
  classNameCanvas: 'canvas--tool-move',
  button: document.querySelector('#js-move'),
  classNameButton: 'tools-container__tool--active',
});

moveTool.init();

const transformTool = new TransformTool({
  paint,
  classNameCanvas: 'canvas--tool-transform',
  button: document.querySelector('#js-transform'),
  classNameButton: 'tools-container__tool--active',
  classNameDefault: 'canvas__elem',
  classNameTransformed: 'canvas__elem--transformed',
});

transformTool.init();

const gridSettBtn = new GridSettBtn({
  paint,
  button: document.querySelector('#js-change-grid'),
  modalCoverClassName: 'modal-cover',
  modalClassName: 'modal-window',
  modalFadeOutClassName: 'modal-window--fadeout',
  modalElem: document.querySelector('#js-modal-wind'),
  outputElem: document.querySelector('#js-modal-window-output'),
});

gridSettBtn.init();

const clearCanvasButton = new ClearCanvasButton({
  paint,
  button: document.querySelector('#js-clear-grid'),
});

const settBtn = new SettBtn({
  settBtn: document.querySelector('#js-header-sett-btn'),
  settMenu: document.querySelector('#js-header-sett'),
  settingButtons: [gridSettBtn, clearCanvasButton],
});

settBtn.init();

const toolsShortcuts = new ToolsShortcuts({
  paint,
  toolButtonsOrdered: Array.from(document.querySelectorAll('.tools__tool')),
  tools: [brushTool, eraseTool, bucketTool,
    eyeDropTool, moveTool, transformTool],
});

toolsShortcuts.init();

paint.replaceCurrentTool(brushTool);

const animationPlayer = new AnimationPlayer({
  playerCanvas: document.querySelector('#js-player-canvas'),
  playerFpsContainer: document.querySelector('#js-fps-container'),
});

const framesManager = new FramesManager({
  frames: document.querySelector('#js-frames'),
  framesControl: document.querySelector('#js-frames-control'),
  paint,
  animationPlayer,
});


const defaultGridSize = 12;

paint.createCanvas(defaultGridSize);
framesManager.init();

const frameDragManager = new FrameDragManager({
  framesManager,
});
frameDragManager.init();

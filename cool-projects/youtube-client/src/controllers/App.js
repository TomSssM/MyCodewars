import _ from 'lodash';
import AppView from '../views/AppView';
import AppModel from '../models/AppModel';
import DragManager from './DragManager';

export default class App {
  constructor() {
    this.modelState = {
      searchUrl: 'https://www.googleapis.com/youtube/v3/search',
      statsUrl: 'https://www.googleapis.com/youtube/v3/videos',
      APIKey: '111', // not an actual key :)
      lowestBtnVal: 0,
    };
    this.viewState = {
      slider: document.querySelector('#js-slider'),
      btnContainer: document.querySelector('#js-btn-container'),
      search: document.querySelector('#js-search'),
      loadIndicator: document.querySelector('#js-loading'),
      defaultCardWidth: 300,
      template: _.template(
        `<div class="scroll-card__link-container">
          <img src="<%-imgUrl%>" class="scroll-card__link-image">
          <a href="<%-url%>" class="scroll-card__link" class="scroll-card__link-text"><%-title%></a>
        </div>
        <div class="scroll-card__row">
          <i class="fas fa-male scroll-card__icon"></i>
          <span class="scroll-card__text"><%-channel%></span>
        </div>
        <div class="scroll-card__row">
          <i class="fas fa-eye scroll-card__icon"></i>
          <span class="scroll-card__text"><%-viewCount%></span>
        </div>
        <div class="scroll-card__row">
          <i class="fas fa-calendar-plus scroll-card__icon"></i>
          <span class="scroll-card__text"><%-date%></span>
        </div>
        <p class="scroll-card__description"><%-description%></p>`,
      ),
    };
  }

  start() {
    this.model = new AppModel(this.modelState);
    this.view = new AppView(this.viewState);
    this.dragManager = new DragManager({
      view: this.view,
      model: this.model,
    });

    this.initButtons();
    this.alignCards();
    const storage = JSON.parse(localStorage.getItem('previousVideos'));
    if (storage) {
      this.createCards(storage);
    }

    this.view.search.addEventListener('input', () => {
      this.onInput();
    });

    this.view.search.addEventListener('keydown', (e) => {
      this.onKeyDown(e);
    });

    window.addEventListener('resize', () => {
      if (this.view.slider.style.display !== 'grid') return;
      this.alignCards();
    });

    this.view.slider.addEventListener('need-more-videos', () => this.loadVideos());

    this.view.btnContainer.addEventListener('click', (e) => {
      this.buttonClick(e);
    });

    this.view.btnContainer.addEventListener('change-buttons', (e) => {
      this.selectBtn(e.detail.pageNum + 1);
    });

    this.view.btnContainer.addEventListener('mousedown', (e) => {
      if (this.view.slider.style.display !== 'grid') return;
      const target = e.target.closest('.js-control-btn');
      if (!target) return;
      this.view.showToolTip(target);
    });

    this.view.btnContainer.addEventListener('mouseup', () => {
      this.view.clearToolTip();
    });

    this.view.btnContainer.addEventListener('mouseleave', () => {
      this.view.clearToolTip();
    }, true);
  }

  alignCards() {
    const windowWidth = document.documentElement.clientWidth;
    const newCardsPerPage = Math.floor(windowWidth / this.view.defaultCardWidth);
    const cardWidth = windowWidth / newCardsPerPage;
    if (cardWidth === this.model.currentCardWidth && newCardsPerPage === this.model.cardsPerPage) {
      return;
    }
    this.model.currentCardWidth = cardWidth;
    this.view.resizeCards(cardWidth);
    if (newCardsPerPage > this.model.cardsPerPage) {
      this.loadVideos(newCardsPerPage - this.model.cardsPerPage);
    }
    this.model.cardsPerPage = newCardsPerPage;
    this.dragManager.moveRight(0);
  }

  onInput() {
    this.model.currSearchVal = this.view.search.value;
    if (this.id !== undefined) clearTimeout(this.id);
    if (!this.model.currSearchVal) return;
    this.id = setTimeout(() => this.requestData(), 3000);
  }

  onKeyDown(e) {
    this.model.currSearchVal = this.view.search.value;
    if (e.code === 'Enter' && this.model.currSearchVal) {
      if (this.id !== undefined) clearTimeout(this.id);
      this.requestData();
    }
  }

  async requestData(videoCount = 8) {
    if (this.view.slider.style.display === 'grid') this.reset();
    this.view.renderLoading();
    this.initButtons();
    await this.loadVideos(videoCount);
    this.view.removeLoading();
  }

  async loadVideos(videoCount = 8) {
    const resp = await this.model.fetchData(videoCount);
    if (resp.error) {
      this.model.error = true;
      this.view.renderErrorMsg(resp.error.message);
      this.dragManager.moveRight(0);
      this.dragManager.currentOffset = 0;
      this.model.activeCardInd = 0;
    } else {
      this.createCards(resp);
    }
  }

  createCards(data) {
    this.view.renderCards(data);
    this.model.numOfCards = this.view.slider.children.length;
    this.alignCards();
    if (!this.view.btnHighlighted) {
      this.view.highlightBtn(0);
    }
  }

  reset() {
    this.model.activeCardInd = 0;
    this.dragManager.currentOffset = 0;
    this.view.reset();
    localStorage.clear();
  }

  buttonClick(e) {
    if (this.view.slider.style.display !== 'grid') return;

    const target = e.target.closest('.js-control-btn');
    if (!target) return;

    const { selectedBtn } = this.view;
    const difference = target.innerHTML - selectedBtn.innerHTML;

    if (target === selectedBtn) return;

    this.selectBtn(target.innerHTML);

    this.view.slider.style.transitionDuration = '0.2s';
    if (difference < 0) {
      this.dragManager.moveLeft(Math.abs(difference));
    } else {
      this.dragManager.moveRight(difference);
    }
  }

  selectBtn(numPar) {
    const toNum = Number(numPar);
    const lastBtn = this.view.btnContainer.lastElementChild;
    const target = this.view.getBtnWith(toNum);

    if (target && target === lastBtn && Number(target.innerHTML) < 4) {
      this.view.renderControlBtn(+target.innerHTML + 1);
      this.view.highlightBtn(target.innerHTML - 1);
      return;
    }

    if (toNum === 2) {
      this.view.makeBtnsFromTemplate([
        { innerHTML: '1', selected: false },
        { innerHTML: '2', selected: true },
        { innerHTML: '3', selected: false },
      ]);
    } else if (toNum === 1) {
      this.view.makeBtnsFromTemplate([
        { innerHTML: '1', selected: true },
        { innerHTML: '2', selected: false },
      ]);
    } else {
      this.view.makeBtnsFromTemplate([
        { innerHTML: toNum - 2, selected: false },
        { innerHTML: toNum - 1, selected: false },
        { innerHTML: toNum, selected: true },
        { innerHTML: toNum + 1, selected: false },
      ]);
    }
  }

  initButtons() {
    this.view.makeBtnsFromTemplate([
      { innerHTML: '1', selected: false },
      { innerHTML: '2', selected: false },
    ]);
  }
}

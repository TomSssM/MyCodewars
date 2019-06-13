export default class AppView {
  constructor(data) {
    this.slider = data.slider;
    this.btnContainer = data.btnContainer;
    this.search = data.search;
    this.loadIndicator = data.loadIndicator;
    this.template = data.template;
    this.defaultCardWidth = data.defaultCardWidth;
    this.prevActiveBtn = null;
    this.btnHighlighted = false;
    this.toolTipElem = AppView.renderToolTip();
    document.body.append(this.toolTipElem);
  }

  renderControlBtn(html) {
    const btn = document.createElement('button');
    btn.classList.add('js-control-btn');
    btn.classList.add('scroll-controls__button');
    btn.innerHTML = html;
    this.btnContainer.append(btn);
  }

  renderLoading() {
    this.loadIndicator.hidden = false;
    this.loadIndicator.classList.add('scroll__load-indicator--loading');
  }

  removeLoading() {
    this.loadIndicator.classList.remove('scroll__load-indicator--loading');
    this.loadIndicator.hidden = true;
  }

  renderErrorMsg(msg) {
    if (this.errorElem) return;
    this.errorElem = document.createElement('div');
    this.errorElem.classList.add('error-box');
    this.errorElem.innerHTML = msg;
    document.body.append(this.errorElem);
  }

  removeErrorMsg() {
    this.errorElem.remove();
  }

  renderCards(data) {
    if (!data.items) return;
    if (localStorage.getItem('previousVideos') === null) {
      localStorage.setItem('previousVideos', JSON.stringify(data));
    }
    this.slider.style.display = 'grid';
    let title;
    let url;
    let imgUrl;
    let description;
    let channel;
    let viewCount;
    let date;
    let card;
    let cardHTML;
    data.items.forEach((item) => {
      ({ title } = item.snippet);
      title = AppView.restrictSize(title, 30);

      url = `https://www.youtube.com/watch?v=${item.id}`;
      imgUrl = item.snippet.thumbnails.high.url;

      ({ description } = item.snippet);
      description = AppView.restrictSize(description, 100);

      channel = item.snippet.channelTitle;
      channel = AppView.restrictSize(channel, 12);

      ({ viewCount } = item.statistics);
      date = item.snippet.publishedAt;
      date = date.slice(0, 10);

      card = document.createElement('div');
      cardHTML = this.createCardHTML({
        title,
        url,
        imgUrl,
        description,
        channel,
        viewCount,
        date,
      });
      card.classList.add('scroll-card');
      card.innerHTML = cardHTML;
      this.slider.append(card);
    });
  }

  createCardHTML(data) {
    return this.template(data);
  }

  resizeCards(cardWidth) {
    this.slider.style.gridAutoColumns = `${cardWidth}px`;
  }

  static restrictSize(input, size) {
    if (input.length < size) return input;
    const res = input;
    return `${res.slice(0, size)}...`;
  }

  offetSlider(val) {
    this.slider.style.transform = `translateX(${val}px)`;
  }

  reloadSlider() {
    this.slider.innerHTML = '';
    this.slider.style.transform = '';
    this.slider.style.display = '';
  }

  highlightBtn(pageNum) {
    this.btnHighlighted = true;
    const prevActiveBtn = this.btnContainer.children[this.prevActiveBtn];
    if (prevActiveBtn) {
      prevActiveBtn.classList.remove('scroll-controls__button--active');
    }
    this.btnContainer.children[pageNum].classList.add('scroll-controls__button--active');
    this.prevActiveBtn = pageNum;
  }

  offsetBtns(val) {
    for (let i = 0; i < this.btnContainer.children.length; i += 1) {
      const btn = this.btnContainer.children[i];
      btn.innerHTML = Number(btn.innerHTML) + val;
    }
  }

  get selectedBtn() {
    return this.btnContainer.children[this.prevActiveBtn];
  }

  makeBtnsFromTemplate(template) {
    if (this.btnContainer.children.length > template.length) {
      while (this.btnContainer.children.length > template.length) {
        this.btnContainer.lastElementChild.remove();
      }
    } else if (this.btnContainer.children.length < template.length) {
      while (this.btnContainer.children.length < template.length) {
        this.renderControlBtn();
      }
    }

    template.forEach((btnTemp, i) => {
      this.btnContainer.children[i].innerHTML = btnTemp.innerHTML;
      if (btnTemp.selected) {
        this.highlightBtn(i);
      }
    });
  }

  getBtnWith(innerHTML = '') {
    const btnNumber = String(innerHTML);
    for (let i = 0; i < this.btnContainer.children.length; i += 1) {
      const btn = this.btnContainer.children[i];
      if (btn.innerHTML === btnNumber) return btn;
    }
    return null;
  }

  deleteBtnsUntil(quantity) {
    while (this.btnContainer.children.length > quantity) {
      this.btnContainer.lastElementChild.remove();
    }
  }

  showToolTip(btn) {
    this.showingToolTipFor = btn;
    this.toolTipElem.innerHTML = btn.innerHTML;
    this.positionTooltipAt(btn);
    setTimeout(() => {
      if (this.showingToolTipFor !== btn) return;
      this.toolTipElem.classList.add('tooltip--fadein');
    }, 500);
  }

  clearToolTip() {
    if (!this.showingToolTipFor) return;
    this.showingToolTipFor = null;
    if (!this.toolTipElem.classList.contains('tooltip--fadein')) return;
    const cb = () => {
      this.toolTipElem.innerHTML = '';
      this.toolTipElem.removeEventListener('transitionend', cb);
    };
    this.toolTipElem.classList.remove('tooltip--fadein');
    this.toolTipElem.addEventListener('transitionend', cb);
  }

  static renderToolTip() {
    const tooltip = document.createElement('div');
    tooltip.classList.add('tooltip');
    return tooltip;
  }

  reset() {
    this.reloadSlider();
    this.btnContainer.innerHTML = '';
    this.prevActiveBtn = null;
    this.btnHighlighted = false;
    this.clearToolTip();
  }

  positionTooltipAt(btn) {
    const coords = btn.getBoundingClientRect();
    const top = coords.top - this.toolTipElem.offsetHeight - 10;
    const left = coords.left + btn.offsetWidth / 2 - this.toolTipElem.offsetWidth / 2;
    this.toolTipElem.style.top = `${top}px`;
    this.toolTipElem.style.left = `${left}px`;
  }
}

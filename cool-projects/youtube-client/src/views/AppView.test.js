import _ from 'lodash';
import AppView from './AppView';

document.body.innerHTML = (
  `<main class="main">
    <input id="js-search" type="text" class="scroll-search">
    <div class="scroll">
      <div id="js-loading" class="scroll__load-indicator"></div>
      <div id="js-slider" class="scroll__slider"></div>
    </div>
    <div id="js-btn-container" class="scroll-controls"></div>
  </main>`
);

const view = new AppView({
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
});

describe('AppView.prototype.renderCards', () => {
  test('renders the cards correctly based on fetched data', () => {
    const data = {
      items: [
        {
          id: 'videoID123',
          snippet: {
            title: 'our-title--our-title--our-title--our-title--our-title',
            thumbnails: {
              high: {
                url: 'image-url',
              },
            },
            description: 'lotsofdecsdfsdf'.repeat(120),
            channelTitle: 'lotsofdecsdfsdflotsofdecsdfsdf',
            publishedAt: 'dd-mm-yyyyfsdfsdfdds',
          },
          statistics: {
            viewCount: 120,
          },
        },
        {
          id: 'videoID123',
          snippet: {
            title: 'our-title--our-title--our-title--our-title--our-title',
            thumbnails: {
              high: {
                url: 'image-url',
              },
            },
            description: 'lotsofdecsdfsdf'.repeat(120),
            channelTitle: 'lotsofdecsdfsdflotsofdecsdfsdf',
            publishedAt: 'dd-mm-yyyyfsdfsdfdds',
          },
          statistics: {
            viewCount: 120,
          },
        },
      ],
    };
    view.renderCards(data);
    expect(document.body.innerHTML).toMatchSnapshot();
  });
});

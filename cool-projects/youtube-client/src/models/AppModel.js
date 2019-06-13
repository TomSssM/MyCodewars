export default class AppModel {
  constructor(data) {
    this.APIKey = data.APIKey;
    this.searchUrl = data.searchUrl;
    this.statsUrl = data.statsUrl;
    this.params = data.params;
    this.cardWidth = data.cardWidth;
    this.currSearchVal = null;
    this.defTransitionDuration = data.defTransitionDuration;
    this.activeCardInd = 0;
    this.lowestBtnVal = data.lowestBtnVal;
    this.error = false;
  }

  async fetchData(count) {
    if (this.numOfCards >= 100) {
      return {
        error: {
          message: 'Too many cards',
        },
      };
    }
    const url1 = this.generateASearchLink(count);
    const searchRes = await fetch(url1);
    if (!searchRes.ok) {
      return AppModel.generateDefaultError();
    }
    const searchJSON = await searchRes.json();
    this.videoIDs = [];
    searchJSON.items.forEach((item) => {
      this.videoIDs.push(item.id.videoId);
    });
    this.nextPageToken = searchJSON.nextPageToken;
    const url2 = this.generateAStatsLink();
    const videoRes = await fetch(url2);
    if (!searchRes.ok) {
      return AppModel.generateDefaultError();
    }
    return videoRes.json();
  }

  static generateDefaultError() {
    return {
      error: {
        message: 'HTTP Error',
      },
    };
  }

  get maxIndex() {
    return this.numOfCards - this.cardsPerPage * 2;
  }

  generateASearchLink(count) {
    const url = new URL(this.searchUrl);
    url.searchParams.set('key', this.APIKey);
    url.searchParams.set('q', this.currSearchVal);
    url.searchParams.set('maxResults', count);
    url.searchParams.set('part', 'snippet');
    url.searchParams.set('type', 'video');
    if (this.nextPageToken) {
      url.searchParams.set('pageToken', this.nextPageToken);
    }
    return url;
  }

  generateAStatsLink() {
    const url = new URL(this.statsUrl);
    url.searchParams.set('key', this.APIKey);
    url.searchParams.set('id', this.videoIDs.join(','));
    url.searchParams.set('part', 'snippet,statistics');
    this.videoIDs = null;
    return url;
  }

  static get sliderWidth() {
    return document.documentElement.clientWidth;
  }
}

import AppModel from './AppModel';

const model = new AppModel({
  searchUrl: 'https://www.googleapis.com/youtube/v3/search',
  statsUrl: 'https://www.googleapis.com/youtube/v3/videos',
  APIKey: 'AIzaSyCcK2IUvyWRv_PJgmPyXvMwo7SUbnDsAXI',
  lowestBtnVal: 0,
});

describe('AppModel.prototype.generateASearchLink', () => {
  test('generates a correctly structured url', () => {
    const url = model.generateASearchLink(4);
    const path = url.toString().slice(0, 44);
    expect(path).toBe('https://www.googleapis.com/youtube/v3/search');
    expect(url.searchParams.get('maxResults')).toBe('4');
    // and the other parameters
  });
});

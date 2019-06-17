import App from './App';
import AppView from '../views/AppView';
import AppModel from '../models/AppModel';

document.body.innerHTML = `<main class="main">
  <input id="js-search" type="text" class="main__search">
  <div class="scroll">
    <div id="js-loading" class="scroll__load-indicator"></div>
    <div id="js-slider" class="scroll__slider"></div>
  </div>
  <div id="js-btn-container" class="scroll-controls"><button class="js-control-btn scroll-controls__button">1</button><button class="js-control-btn scroll-controls__button">2</button></div>
</main>`;

const app = new App();
app.start();

const mockedMethods = {};

function mockMethod(classObj, methodName) {
  if (mockedMethods[methodName]) throw new Error('can\'t mock, please call removeMock');
  mockedMethods[methodName] = classObj.prototype[methodName];
  // eslint-disable-next-line no-param-reassign
  classObj.prototype[methodName] = jest.fn(classObj.prototype[methodName]);
}

function unmockMethod(classObj, methodName) {
  if (!mockedMethods[methodName]) throw new Error('method has not been mocked');
  // eslint-disable-next-line no-param-reassign
  classObj.prototype[methodName] = mockedMethods[methodName];
  mockedMethods[methodName] = null;
}

describe('App.prototype.onKeyDown', () => {
  test('gets called when the user inputs data and presses Enter', () => {});
  test('updates the current search value of the Model', () => {
    app.view.search.value = ':)';
    app.onKeyDown({
      code: 'Enter',
    });
    expect(app.model.currSearchVal).toBe(app.view.search.value);
    app.view.search.value = '';
  });
  test('doesn\'t call App.prototype.requestData if the user didn\'t press Enter', () => {
    mockMethod(App, 'requestData');
    app.onKeyDown({
      code: 'Wrong Key',
    });
    expect(App.prototype.requestData.mock.calls.length).toBe(0);
    unmockMethod(App, 'requestData');
  });
});

describe('App.prototype.requestData', () => {
  test('should call AppModel.prototype.fetchData', () => {
    mockMethod(AppModel, 'fetchData');
    AppModel.prototype.fetchData.mockImplementation(() => ({ data: true }));
    app.requestData();
    expect(AppModel.prototype.fetchData).toBeCalled();
  });
  test('should call AppView.prototype.renderLoading', async () => {
    mockMethod(AppView, 'renderLoading');
    await app.requestData();
    expect(AppView.prototype.renderLoading).toBeCalled();
    unmockMethod(AppView, 'renderLoading');
  });
  test('should call AppView.prototype.removeLoading', async () => {
    mockMethod(AppView, 'removeLoading');
    await app.requestData();
    expect(AppView.prototype.removeLoading).toBeCalled();
    unmockMethod(AppView, 'removeLoading');
  });
});

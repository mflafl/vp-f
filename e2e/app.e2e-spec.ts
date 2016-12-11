import { VpPage } from './app.po';

describe('vp App', function() {
  let page: VpPage;

  beforeEach(() => {
    page = new VpPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

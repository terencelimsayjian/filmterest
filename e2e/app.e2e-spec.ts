import { PinterestProjectPage } from './app.po';

describe('pinterest-project App', function() {
  let page: PinterestProjectPage;

  beforeEach(() => {
    page = new PinterestProjectPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

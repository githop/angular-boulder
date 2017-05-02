import { AngularBoulderPage } from './app.po';

describe('angular-boulder App', () => {
  let page: AngularBoulderPage;

  beforeEach(() => {
    page = new AngularBoulderPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

import { Selector } from 'testcafe';

class ListsessionPage {
  constructor() {
    this.pageId = '#navbar-list-session';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Checks that the page has at least a card. */
  async hasCard(testController) {
    const hasCard = Selector('#sessions-card').exists;
    await testController.expect(hasCard).ok();
  }

  async clickRegister(testController) {
    await testController.click('#register-form-button');
  }
}

export const listsessionPage = new ListsessionPage();

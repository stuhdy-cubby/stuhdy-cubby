import { Selector } from 'testcafe';

class AdminhomePage {
  constructor() {
    this.pageId = '#navbar-admin';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Checks that the page has at least a card. */
  async hasMySessionsTable(testController) {
    const hasMySessionsTable = Selector('#mysessionstable').exists;
    await testController.expect(hasMySessionsTable).ok();
  }

  async hasAllSessionsTable(testController) {
    const hasAllSessionsTable = Selector('#allsessionstable').exists;
    await testController.expect(hasAllSessionsTable).ok();
  }
}

export const adminhomePage = new AdminhomePage();

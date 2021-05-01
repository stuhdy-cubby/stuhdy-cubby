import { Selector } from 'testcafe';

class ListsessionPage {
  constructor() {
    this.pageId = '#list-session-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Checks that the page has at least two rows. */
  async hasTable(testController) {
    const hasTable = Selector('#list-session-table').exists;
    await testController.expect(hasTable).gte(0);
  }
}

export const listsessionPage = new ListsessionPage();

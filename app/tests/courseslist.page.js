import { Selector } from 'testcafe';

class CourseslistPage {
  constructor() {
    this.pageId = '#navbar-list-courses';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Checks that the page has at least a card. */
  async hasCard(testController) {
    const hasCard = Selector('#course-list').exists;
    await testController.expect(hasCard).ok();
  }

}

export const courselistPage = new CourseslistPage();

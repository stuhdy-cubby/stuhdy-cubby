import { Selector } from 'testcafe';

class CalendarPage {
  constructor() {
    this.pageId = '#navbar-calendar';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Checks that the page has at least a card. */
  async hasCalendar(testController) {
    const hasCalendar = Selector('#calendar').exists;
    await testController.expect(hasCalendar).ok();
  }

}

export const calendarPage = new CalendarPage();

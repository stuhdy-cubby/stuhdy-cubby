import { Selector } from 'testcafe';

class RegistersessionPage {
  constructor() {
    this.pageId = '#register-session-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async registerSession(testController) {
    await testController.typeText('#response', 'I need help too!');
    await testController.click('#submit');
  }
}

export const registersessionPage = new RegistersessionPage();

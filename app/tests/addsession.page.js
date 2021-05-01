import { Selector } from 'testcafe';

class AddsessionPage {
  constructor() {
    this.pageId = '#add-session-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async addSession(testController) {
    // Select topic
    const topicSelector = Selector('#topics');
    const topicOption = topicSelector.find('#Team project');
    await testController.click(topicSelector);
    await testController.click(topicOption);

    // Select course
    const courseSelector = Selector('#course');
    const courseOption = courseSelector.find('#ICS 314');
    await testController.click(courseSelector);
    await testController.click(courseOption);

    const notes = 'Team meet up';
    await testController.typeText('sessionNotes', notes);

    await testController.click('#submit');
    await testController.click(Selector('.swal-button--confirm'));
  }
}

export const addsessionPage = new AddsessionPage();

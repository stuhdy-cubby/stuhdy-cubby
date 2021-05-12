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
    const topicOption = 'Team project';
    await testController.typeText('#topicInput', topicOption);

    // Select course
    const courseSelector = Selector('#course');
    const courseOption = courseSelector.find('option');
    await testController.click(courseSelector);
    await testController.click(courseOption.withText('ICS 111'));
    await testController.expect(courseSelector.value).eql('ICS 111');

    // Session Date
    const datetime = Selector('input[type=datetime-local]');
    await testController.pressKey('enter');
    await testController.typeText(datetime, '2021-05-15T01:00');
    await testController.expect(datetime.value).eql('2021-05-15T01:00');

    const notes = 'Team meet up';
    await testController.typeText('#sessionNotes', notes);

    await testController.click('#submit');
    await testController.click(Selector('.swal-button--confirm'));
  }
}

export const addsessionPage = new AddsessionPage();

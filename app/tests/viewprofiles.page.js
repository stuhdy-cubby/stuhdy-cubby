import { Selector } from 'testcafe';

class ViewProfilesPage {
  constructor() {
    this.pageId = '#navbar-viewprofiles';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Checks that the page has at least a card. */
  async hasCard(testController) {
    const hasCard = Selector('#profile-cards').exists;
    await testController.expect(hasCard).ok();
  }

  async clickViewProfile(testController) {
    await testController.click('#view-profile-button');
    await testController.click(Selector('.ui.modal').find('.close'));
  }
}

export const viewprofilesPage = new ViewProfilesPage();

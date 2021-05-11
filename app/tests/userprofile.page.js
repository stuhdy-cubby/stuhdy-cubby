import { Selector } from 'testcafe';

class UserProfilePage {
  constructor() {
    this.pageId = '#user-profile';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async editProfile(testController) {
    await testController.click('#editprofile');
    const institutionSelector = Selector('#institution');
    const institutionOption = institutionSelector.find('option');
    await testController.click(institutionSelector);
    await testController.click(institutionOption.withText('University of Hawaii at Manoa'));
    await testController.expect(institutionSelector.value).eql('University of Hawaii at Manoa');

    const majorSelector = Selector('#major');
    const majorOption = majorSelector.find('option');
    await testController.click(majorSelector);
    await testController.click(majorOption.withText('Computer Science'));
    await testController.expect(majorSelector.value).eql('Computer Science');

    const standingSelector = Selector('#standing');
    const standingOption = standingSelector.find('option');
    await testController.click(standingSelector);
    await testController.click(standingOption.withText('Sophomore'));
    await testController.expect(standingSelector.value).eql('Sophomore');

    const artSelector = Selector('#art');
    await testController.click(artSelector);

    const athleticSelector = Selector('#athletics');
    await testController.click(athleticSelector);

    const jsSelector = Selector('#javascript');
    await testController.click(jsSelector);

    const cSelector = Selector('#c');
    await testController.click(cSelector);

    await testController.click('#submit');
    await testController.click(Selector('.swal-button--confirm'));
  }

  async editCourse(testController) {
    await testController.click('#editcourses');

    const senseiSelector = Selector('#senseicourses');
    const senseiOption = senseiSelector.find('span');
    await testController.click(senseiSelector);
    await testController.click(senseiOption.withText('ICS 241'));
    await testController.pressKey('esc');

    const grasshopperSelector = Selector('#grasshoppercourses');
    const grasshopperOption = grasshopperSelector.find('span');
    await testController.click(grasshopperSelector);
    await testController.click(grasshopperOption.withText('ICS 314'));
    await testController.pressKey('esc');

    await testController.click('#submit');
    await testController.click(Selector('.swal-button--confirm'));
  }

}

export const userprofilePage = new UserProfilePage();

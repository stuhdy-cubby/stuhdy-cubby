import { Selector } from 'testcafe';

class UserinfoPage {
  constructor() {
    this.pageId = '#user-info';
    this.pageSelector = Selector(this.pageId);
  }

  async createProfile(testController, username) {
    await testController.typeText('#firstName', 'Sally');
    await testController.typeText('#lastName', 'Smith');
    await testController.typeText('#email', username);

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

    await testController.typeText('#picurl', 'https://react.semantic-ui.com/images/avatar/large/jenny.jpg');
    await testController.typeText('#bio', 'I am Sally, a sophomore.');

    const athleticSelector = Selector('#athletics');
    await testController.click(athleticSelector);

    const htmlSelector = Selector('#html');
    await testController.click(htmlSelector);

    await testController.click('#submit');
    await testController.click(Selector('.swal-button--confirm'));

  }
}

export const userinfoPage = new UserinfoPage();

import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { navBar } from './navbar.component';
import { listsessionPage } from './listsession.page';
import { registersessionPage } from './registersession.page';
import { addsessionPage } from './addsession.page';
import { calendarPage } from './calendar.page';
import { leaderboardPage } from './leaderboard.page';
import { courselistPage } from './courseslist.page';
import { viewprofilesPage } from './viewprofiles.page';
import { userprofilePage } from './userprofile.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'john@foo.com', password: 'changeme' };

fixture('meteor-application-template-react localhost test with default db')
  .page('http://localhost:3000');

test('Test that landing page shows up', async (testController) => {
  await landingPage.isDisplayed(testController);
});

test('Test that signin and signout work', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test Add Session page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoAddSessionPage(testController);
  await addsessionPage.isDisplayed(testController);
  await addsessionPage.addSession(testController);
});

test('Test List Sessions page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoListSessionPage(testController);
  await listsessionPage.isDisplayed(testController);
  await listsessionPage.hasCard(testController);
});

test('Test Register Sessions page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoListSessionPage(testController);
  await listsessionPage.clickRegister(testController);
  await registersessionPage.isDisplayed(testController);
  await registersessionPage.registerSession(testController);
});

test('Test Calendar page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoCalendarPage(testController);
  await calendarPage.isDisplayed(testController);
  await calendarPage.hasCalendar(testController);
});

test('Test Leaderboard page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoLeaderboardPage(testController);
  await leaderboardPage.isDisplayed(testController);
  await leaderboardPage.hasLeaderboard(testController);
});

test('Test Courses page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoLeaderboardPage(testController);
  await leaderboardPage.isDisplayed(testController);
  await leaderboardPage.hasLeaderboard(testController);
});

test('Test Courses List page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoCoursesListPage(testController);
  await courselistPage.isDisplayed(testController);
  await courselistPage.hasCard(testController);
});

test('Test View Profiles page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoViewProfilesPage(testController);
  await viewprofilesPage.isDisplayed(testController);
  await viewprofilesPage.hasCard(testController);
  await viewprofilesPage.clickViewProfile(testController);
});

test('Test User Profile page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoUserProfilePage(testController);
  await userprofilePage.isDisplayed(testController);
  await userprofilePage.editProfile(testController);
  await userprofilePage.editCourse(testController);
});

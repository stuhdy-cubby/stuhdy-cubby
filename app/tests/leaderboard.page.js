import { Selector } from 'testcafe';

class LeaderboardPage {
  constructor() {
    this.pageId = '#navbar-leaderboard';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Checks that the page has at least a card. */
  async hasLeaderboard(testController) {
    const hasLeaderboard = Selector('#leaderboard').exists;
    await testController.expect(hasLeaderboard).ok();
  }
}

export const leaderboardPage = new LeaderboardPage();

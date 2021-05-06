import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Header, Loader, Icon, Segment } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import Leaderboard from '../components/Leaderboard';
import { ProfilesPoints } from '../../api/profiles/ProfilesPoints';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class LeaderboardPage extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const data = ProfilesPoints.collection.find({}, { sort: { points: -1 } }).fetch();
    const person = _.groupBy(data, 'profile');
    const personObj = {};
    _.each(person, function (val, key) {
      personObj[key] = _.reduce(val, function (memo, v) {
        return memo + v.points;
      }, 0);
    });
    const profilePoints = _.sortBy(_.map(_.keys(personObj), function (s) {
      return { profile: s, points: personObj[s] };
    }), 'points').reverse();
    return (
        <div className="leaderboard">
          <Container>
            <Header as="h1" textAlign="center" block>Leaderboard
              <Icon name="trophy"/>
            </Header>
            <Segment textAlign="center" size="large" inverted color='olive'>Climb up to the top of the leaderboard to win rewards! Register for a study session today!</Segment>
            <Table className="ui green table">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Profile</Table.HeaderCell>
                  <Table.HeaderCell>Points</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {profilePoints.map((leaderboard) => <Leaderboard key={leaderboard.profile} leaderboard={leaderboard}/>)}
              </Table.Body>
            </Table>
          </Container>
        </div>
    );
  }
}

/** Require an array of Stuff documents in the props. */
LeaderboardPage.propTypes = {
  profiles: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(ProfilesPoints.userPublicationName);
  return {
    /** get collection and sort by points */
    profiles: ProfilesPoints.collection.find({}, { sort: { points: -1 } }).fetch(),
    ready: subscription.ready(),
  };
})(LeaderboardPage);

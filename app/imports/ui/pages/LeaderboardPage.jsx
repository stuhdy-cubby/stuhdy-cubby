import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import Leaderboard from '../components/Leaderboard';
import { Profiles } from '../../api/profiles/Profiles';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class LeaderboardPage extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
      <Container id="my-dojo-page">
        <Header as="h2" textAlign="center" inverted>Rankings</Header>
        <Table celled striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Points</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.props.profiles.map((Leaderboard) => <Leaderboard key={Leaderboard._id} stuff={Leaderboard}/>)}
          </Table.Body>
        </Table>
      </Container>
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
  const subscription = Meteor.subscribe(Profiles.userPublicationName);
  return {
    /** get collection and sort by points */
    profiles: Profiles.collection.find({}, { sort: { points: -1 } }).fetch(),
    ready: subscription.ready(),
  };
})(LeaderboardPage);

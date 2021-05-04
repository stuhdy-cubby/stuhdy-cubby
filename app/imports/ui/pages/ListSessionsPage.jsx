import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Header, Loader, Card, Container, Segment } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { SessionsCourses } from '../../api/sessions/SessionsCourses';
import { SessionsProfiles } from '../../api/sessions/SessionsProfiles';
import ListSessions from '../components/ListSessions';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListSessionsPage extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <div className='listsessions-background'>
        <Container id="sessions list">
          <Segment>
            <Header as='h1' textAlign="center" color='green'>
              Register for a Session!
            </Header>
          </Segment>
          <Card.Group centered>
            {this.props.sessions.map((sessions) => <ListSessions key={sessions._id} sessions={sessions} sessionsProfiles={this.props.sessionsProfiles.filter(p => (p.topic === sessions._id))} />)}
          </Card.Group>
        </Container>
      </div>
    );
  }
}

// Require an array of Stuff documents in the props.
ListSessionsPage.propTypes = {
  sessions: PropTypes.array.isRequired,
  sessionsProfiles: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(SessionsCourses.userPublicationName);
  const sub2 = Meteor.subscribe(SessionsProfiles.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready() && sub2.ready();
  // Get the Stuff documents
  const sessions = SessionsCourses.collection.find({}).fetch();
  const sessionsProfiles = SessionsProfiles.collection.find({}).fetch();
  return {
    sessions,
    sessionsProfiles,
    ready,
  };
})(ListSessionsPage);

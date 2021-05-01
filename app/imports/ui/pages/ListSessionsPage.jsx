import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Header, Loader, Card, Grid, Container } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { SessionsCourses } from '../../api/sessions/SessionsCourses';
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
        <Container id="sessions list">
          <div className="ui segment">
            <h1 className="ui center aligned header">
              Register for a Session!
            </h1>
          </div>
          <Card.Group centered>
            {this.props.sessions.map((sessions) => <ListSessions key={sessions._id} sessions={sessions} />)}
          </Card.Group>
        </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
ListSessionsPage.propTypes = {
  sessions: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(SessionsCourses.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const sessions = SessionsCourses.collection.find({}).fetch();
  return {
    sessions,
    ready,
  };
})(ListSessionsPage);

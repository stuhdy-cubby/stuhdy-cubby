import React from 'react';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Container, Table, Header, Loader, Divider, Button } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { SessionsCourses } from '../../api/sessions/SessionsCourses';
import ListSessionsAdmin from '../components/ListSessionsAdmin';
import { SessionsProfiles } from '../../api/sessions/SessionsProfiles';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class AdminHome extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    const user = Meteor.user().username;
    console.log(user);
    const userData = SessionsCourses.collection.find({ email: user }).fetch();
    return (
      <Container>
        <Divider hidden />
        <Header as="h1">My Sessions</Header>
        <p>List of all your current and past sessions.</p>
        <Button as={NavLink} activeClassName="active" exact to="/addsession" key='list' color='blue'>Add Session</Button>
        <Table striped selectable color='blue'>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Course</Table.HeaderCell>
              <Table.HeaderCell>Topic</Table.HeaderCell>
              <Table.HeaderCell>Location</Table.HeaderCell>
              <Table.HeaderCell>Owner</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {_.map(userData, (profiles) => <ListSessionsAdmin key={profiles._id} profiles={profiles} sessions={this.props.sessions.filter(s => (s.owner === profiles.email))}/>)}
          </Table.Body>
        </Table>

        <Divider hidden />
        <Divider clearing />
        <Divider hidden />

        <Header as="h1">All Sessions</Header>
        <p>List of all current and past sessions.</p>
        <Table striped selectable color='brown'>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Course</Table.HeaderCell>
              <Table.HeaderCell>Topic</Table.HeaderCell>
              <Table.HeaderCell>Location</Table.HeaderCell>
              <Table.HeaderCell>Owner</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.props.sessions.map((session) => <ListSessionsAdmin key={session._id} sessions={session} />)}
          </Table.Body>
        </Table>
      </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
AdminHome.propTypes = {
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
})(AdminHome);

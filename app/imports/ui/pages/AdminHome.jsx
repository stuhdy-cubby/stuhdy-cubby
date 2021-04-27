import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Table, Container, Button, Divider, Loader } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import StuffItemAdmin from '../components/StuffItemAdmin';
import { SessionsCourses } from '../../api/sessions/SessionsCourses';

/** A simple static component to render some text for the landing page. */
class AdminHome extends React.Component {
  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    return (
      <Container id="user-profile">
        <h1>My Sessions</h1>
        <p>List of all your current and past sessions.</p>
        <Button as={NavLink} exact to="/addsession" key='list' color='blue'>Add Session</Button>
        <Table striped singleLine selectable color='blue'>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Topic</Table.HeaderCell>
              <Table.HeaderCell>Course</Table.HeaderCell>
              <Table.HeaderCell>Owner</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.props.sessions.map((sessions) => <StuffItemAdmin key={sessions._id} sessions={sessions} />)}
          </Table.Body>
        </Table>

        <Divider hidden/>
        <Divider clearing/>

        <h1>All Sessions</h1>
        <p>List of all current and past sessions.</p>
        <Table striped singleLine selectable color='brown'>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Topic</Table.HeaderCell>
              <Table.HeaderCell>Course</Table.HeaderCell>
              <Table.HeaderCell>Owner</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.props.sessions.map((sessions) => <StuffItemAdmin key={sessions._id} session={sessions} />)}
          </Table.Body>
        </Table>
      </Container>
    );
  }
}

AdminHome.propTypes = {
  sessions: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(SessionsCourses.adminPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const sessions = SessionsCourses.collection.find({}).fetch();
  return {
    sessions,
    ready,
  };
})(AdminHome);

// export default AdminHome;

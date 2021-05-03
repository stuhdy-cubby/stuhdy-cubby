import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Divider, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Profiles } from '../../api/profiles/Profiles';
import ProfileInfo from './ProfileInfo';
import { SessionsCourses } from '../../api/sessions/SessionsCourses';

class UserProfile extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready1) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <Container id="user-profile">
        <Divider hidden />
        {this.props.profiles.map((profiles) => <ProfileInfo key={profiles._id} profiles={profiles} />)}
        {this.props.sessions.map((sessions) => <ProfileInfo key={sessions._id} sessions={sessions} />)}
      </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
UserProfile.propTypes = {
  profiles: PropTypes.array.isRequired,
  sessions: PropTypes.array.isRequired,
  ready1: PropTypes.bool.isRequired,
  ready2: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription1 = Meteor.subscribe(Profiles.userPublicationName);
  const subscription2 = Meteor.subscribe(SessionsCourses.userPublicationName);
  // Determine if the subscription is ready
  const ready1 = subscription1.ready();
  const ready2 = subscription2.ready();
  // Get the Stuff documents
  const profiles = Profiles.collection.find({}).fetch();
  const sessions = SessionsCourses.collection.find({}).fetch();
  return {
    profiles,
    sessions,
    ready1,
    ready2,
  };
})(UserProfile);

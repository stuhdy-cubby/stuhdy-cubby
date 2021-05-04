import React from 'react';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
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
    const user = Meteor.user().username;
    console.log(user);
    const userData = Profiles.collection.find({ email: user }).fetch();
    return (
      <Container id="user-profile">
        <Divider hidden />
        {_.map(userData, (profiles) => <ProfileInfo key={profiles._id} profiles={profiles} sessions={this.props.sessions.filter(s => (s.owner === profiles.email))}/>)}
      </Container>
    );
  }
}

// Require an array of Profiles documents in the props.
UserProfile.propTypes = {
  profiles: PropTypes.array.isRequired,
  sessions: PropTypes.array.isRequired,
  ready1: PropTypes.bool.isRequired,
  ready2: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to documents.
  const subscription1 = Meteor.subscribe(Profiles.userPublicationName);
  const subscription2 = Meteor.subscribe(SessionsCourses.userPublicationName);
  // Determine if the subscription is ready
  const ready1 = subscription1.ready();
  const ready2 = subscription2.ready();
  // Get the documents
  const profiles = Profiles.collection.find({}).fetch();
  const sessions = SessionsCourses.collection.find({}).fetch();
  return {
    profiles,
    sessions,
    ready1,
    ready2,
  };
})(UserProfile);

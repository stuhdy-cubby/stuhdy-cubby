import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Loader, Card } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { Profiles } from '../../api/profiles/Profiles';
import { Sessions } from '../../api/sessions/Sessions';
import { SessionsProfiles } from '../../api/sessions/SessionsProfiles';
import { SessionsCourses } from '../../api/sessions/SessionsCourses';
import { ProfileCard } from '../components/ProfileCard';

/** Returns the Session and associated Profiles */
function getSessionData(topic) {
  const data = Sessions.collection.findOne({ topic });
  const sessioncourse = _.pluck(SessionsCourses.collection.find({ topic: topic }).fetch(),'course');
  const profiles = _.pluck(SessionsProfiles.collection.find({ topic: topic }).fetch(), 'profile');
  const profilePictures = profiles.map(profile => Profiles.collection.findOne({ email: profile }).picture);
  return _.extend({ }, data, { sessioncourse, participants: profilePictures });
}

/** Renders the Profile Collection as a set of Cards. */
class Session extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const sessions = _.pluck(Sessions.collection.find().fetch(), 'topic');
    
    const emails = _.pluck(Profiles.collection.find().fetch(), 'email');
    const profileData = emails.map(email => getProfileData(email));
    return (
        <Container id="profiles-page">
          <Card.Group>
            {_.map(profileData, (profile, index) => <ProfileCard key={index} profile={profile}/>)}
          </Card.Group>
        </Container>
    );
  }
}

Session.propTypes = {
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Ensure that minimongo is populated with all collections prior to running render().
  const sub1 = Meteor.subscribe(Profiles.userPublicationName);
  const sub2 = Meteor.subscribe(ProfilesInterests.userPublicationName);
  const sub3 = Meteor.subscribe(ProfilesProjects.userPublicationName);
  const sub4 = Meteor.subscribe(Projects.userPublicationName);
  return {
    ready: sub1.ready() && sub2.ready() && sub3.ready() && sub4.ready(),
  };
})(Session);

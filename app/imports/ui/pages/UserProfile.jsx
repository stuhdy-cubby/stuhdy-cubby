import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Loader, Card, Image, Divider } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { Profiles } from '../../api/profiles/Profiles';

/** Returns the Profile and associated Projects and Interests associated with the passed user email. */
function getProfileData(email) {
  const data = Profiles.collection.findOne({ email });
  const firstname = _.pluck(Profiles.collection.find({ profile: email }).fetch(), 'firstName');
  const lastname = _.pluck(Profiles.collection.find({ profile: email }).fetch(), 'lastName');
  return _.extend({ }, data, { firstname, lastname });
}

/** Component for layout out a Profile Card. */
const MakeCard = (props) => (
  <Card>
    <Card.Content>
      <Image floated='right' circular src={props.profile.picture} />
      <Card.Header>{props.profile.firstName} {props.profile.lastName}</Card.Header>
      <Card.Meta>
        <span>{props.profile.email}</span>
      </Card.Meta>
      <Divider clearing />
      <Card.Description>
        Institution: {props.profile.institution}
      </Card.Description>
      <Card.Description>
        Major: {props.profile.major}
      </Card.Description>
      <Card.Description>
        Class Standing: {props.profile.standing}
      </Card.Description>
      <Divider hidden />
      <Card.Description>
        {props.profile.bio}
      </Card.Description>
    </Card.Content>
  </Card>
);

MakeCard.propTypes = {
  profile: PropTypes.object.isRequired,
};

/** Renders the Profile Collection as a set of Cards. */
class UserProfile extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const emails = _.pluck(Profiles.collection.find().fetch(), 'email');
    const profileData = emails.map(email => getProfileData(email));
    return (
      <Container id="profiles-page">
        <Card.Group>
          {_.map(profileData, (profile, index) => <MakeCard key={index} profile={profile}/>)}
        </Card.Group>
      </Container>
    );
  }
}

UserProfile.propTypes = {
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Ensure that minimongo is populated with all collections prior to running render().
  const sub = Meteor.subscribe(Profiles.userPublicationName);
  return {
    ready: sub.ready(),
  };
})(UserProfile);

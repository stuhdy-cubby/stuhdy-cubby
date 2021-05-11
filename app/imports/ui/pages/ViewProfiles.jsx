import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Loader, Card, Image, Divider, Modal, Button, Header, Grid } from 'semantic-ui-react';
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
  <Card color='teal'>
    <Card.Content>
      <Image floated='right' circular src={props.profile.picture} />
      <Card.Header>{props.profile.firstName} {props.profile.lastName}</Card.Header>
      <Card.Meta>
        <span>{props.profile.email}</span>
      </Card.Meta>
      <Card.Description>
        {props.profile.bio}
        <Divider hidden />
        <Modal
          id='viewprofilemodal'
          closeIcon
          image
          scrolling
          centered={false}
          trigger={
            <Grid>
              <Grid.Column textAlign="center">
                <Button basic color='teal' id='view-profile-button'>View Profile</Button>
              </Grid.Column>
            </Grid>
          }
        >
          <Modal.Header>View Profile</Modal.Header>
          <Modal.Content image scrolling>
            <Image size='large' circular src={props.profile.picture} wrapped />

            <Modal.Description>
              <Header as={'h2'}>{props.profile.firstName} {props.profile.lastName}</Header>
              <Grid columns={2}>
                <Grid.Row>
                  <Grid.Column width={2}>
                    <p><strong>Institution: </strong></p>
                  </Grid.Column>
                  <Grid.Column width={10}>
                    <p>{props.profile.institution}</p>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column width={2}>
                    <p><strong>Major: </strong></p>
                  </Grid.Column>
                  <Grid.Column width={10}>
                    <p>{props.profile.major}</p>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column width={2}>
                    <p><strong>Standing: </strong></p>
                  </Grid.Column>
                  <Grid.Column width={10}>
                    <p>{props.profile.standing}</p>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column width={2}>
                    <p><strong>Bio: </strong></p>
                  </Grid.Column>
                  <Grid.Column width={10}>
                    <p>{props.profile.bio}</p>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column width={2}>
                    <p><strong>Skills: </strong></p>
                  </Grid.Column>
                  <Grid.Column width={10}>
                    <p>
                      {_.map(props.profile.skills, (s, index) => ((props.profile.skills.length - 1 === index) ? `${s}` : `${s}, `))}
                    </p>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column width={2}>
                    <p><strong>Interests: </strong></p>
                  </Grid.Column>
                  <Grid.Column width={10}>
                    <p>
                      {_.map(props.profile.interests, (i, index) => ((props.profile.interests.length - 1 === index) ? `${i}` : `${i}, `))}
                    </p>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Modal.Description>
          </Modal.Content>
        </Modal>
      </Card.Description>
    </Card.Content>
  </Card>
);

MakeCard.propTypes = {
  profile: PropTypes.object.isRequired,
};

/** Renders the Profile Collection as a set of Cards. */
class ViewProfiles extends React.Component {

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
        <Divider hidden/>
        <Card.Group id='profile-cards'>
          {_.map(profileData, (profile, index) => <MakeCard key={index} profile={profile}/>)}
        </Card.Group>
      </Container>
    );
  }
}

ViewProfiles.propTypes = {
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Ensure that minimongo is populated with all collections prior to running render().
  const sub = Meteor.subscribe(Profiles.userPublicationName);
  return {
    ready: sub.ready(),
  };
})(ViewProfiles);

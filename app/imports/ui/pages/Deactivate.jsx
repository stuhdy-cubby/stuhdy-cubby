import React from 'react';
import { Container, Divider, Icon } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Profiles } from '../../api/profiles/Profiles';

/** A simple static component to render some text for the landing page. */
class Deactivate extends React.Component {

  deleteUser(data) {
    console.log(data);
    Meteor.logout();
    const profile = _.pluck(Profiles.collection.find({ email: data }).fetch(), '_id');
    const id = profile[0];
    Profiles.collection.remove({ _id: id });
    window.location.href = '#/';
  }

  render() {
    const email = Meteor.user().username;
    this.deleteUser(email);
    return (
      <Container id='deactivate' verticalAlign='middle' textAlign='center'>
        <Divider hidden />
        <Divider hidden />
        <Icon name='frown outline' size='massive'/>
        <h1>Account Deactivated</h1>
        <p>Your account has been deactivated. Thank you for using stUHdy cubby!</p>
        <Divider hidden />
      </Container>
    );
  }
}

export default Deactivate;

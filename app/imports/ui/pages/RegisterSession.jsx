import React from 'react';
import { Grid, Loader, Header, Segment, Message } from 'semantic-ui-react';
import swal from 'sweetalert';
import { AutoForm, ErrorsField, DateField, SubmitField, TextField } from 'uniforms-semantic';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { _ } from 'meteor/underscore';
import moment from 'moment';
import PropTypes from 'prop-types';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { SessionsCourses } from '../../api/sessions/SessionsCourses';
import { SessionsProfiles } from '../../api/sessions/SessionsProfiles';
import { ProfilesPoints } from '../../api/profiles/ProfilesPoints';

const formSchema = new SimpleSchema({
  topic: String,
  course: String,
  location: String,
  sessionDate: Date,
  sessionNotes: String,
  owner: String,
  response: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for editing a single document. */
class RegisterSession extends React.Component {

  // On successful submit, insert the data.
  submit(data) {
    const { course, response } = data;
    const topic = this.props.doc._id;
    const session = this.props.doc._id;
    const profile = Meteor.user().username;
    const points = 1;
    SessionsProfiles.collection.insert({ topic, course, profile, response },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          ProfilesPoints.collection.insert({ profile, session, points },
            (err) => {
              if (err) {
                swal('Error', err.message, 'error');
              } else {
                swal('Success', 'Successfully registered for session', 'success')
                  .then(() => {
                    window.location.href = '#/list';
                  });
              }
            });
        }
      });
  }

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  renderPage() {
    // console.log(this.props.doc._id);
    const userRegistered = _.pluck(SessionsProfiles.collection.find({ topic: this.props.doc._id }).fetch(), 'profile');
    const curDateTime = new Date();
    // console.log(curDateTime);
    const sd = moment.utc(this.props.doc.sessionDate).format('MM-DD-YYYY hh:mm A');
    // console.log(sd);
    // console.log(userRegistered);
    // console.log(Meteor.user().username);
    // console.log(userRegistered.includes(Meteor.user().username));

    return (
      <div className='registersession-background' id='register-session-page'>
        <Grid container centered columns={2}>
          <Grid.Column color={'yellow'}>
            <Header as="h2" inverted textAlign="center">Register for Session</Header>
            <AutoForm schema={bridge} onSubmit={data => this.submit(data)} model={this.props.doc}>
              <Segment>
                <TextField name='topic' readOnly={true} disabled={true}/>
                <TextField name='course' readOnly={true} disabled={true}/>
                <TextField name='location' readOnly={true} disabled={true}/>
                <DateField name='sessionDate' readOnly={true} disabled={true}/>
                <TextField name='sessionNotes' readOnly={true} disabled={true}/>
                <TextField label='Created by' name='owner' readOnly={true} disabled={true}/>
                {userRegistered.includes(Meteor.user().username) || moment(curDateTime).isAfter(sd) ?
                  <Message icon='pencil alternate' negative
                    header='Unable to register'
                    content='You are already registered for this session or the session has past'
                  /> :
                  <Segment><TextField id='response' name='response'/>
                    <SubmitField id='submit' value='Submit'/>
                  </Segment>
                }
                <ErrorsField/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

// Require the presence of a Sessions document in the props object. Uniforms adds 'model' to the props, which we use.
RegisterSession.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to SessionsCourses documents.
  const subscription = Meteor.subscribe(SessionsCourses.userPublicationName);
  const sub2 = Meteor.subscribe(SessionsProfiles.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready() && sub2.ready();
  // Get the document
  const doc = SessionsCourses.collection.findOne(documentId);
  return {
    doc,
    ready,
  };
})(RegisterSession);

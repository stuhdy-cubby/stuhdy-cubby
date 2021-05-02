import React from 'react';
import { Grid, Loader, Header, Segment } from 'semantic-ui-react';
import swal from 'sweetalert';
import { AutoForm, ErrorsField, DateField, SubmitField, TextField } from 'uniforms-semantic';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { _ } from 'meteor/underscore';
import { SessionsCourses } from '../../api/sessions/SessionsCourses';
import { SessionsProfiles } from '../../api/sessions/SessionsProfiles';
import { ProfilesPoints } from '../../api/profiles/ProfilesPoints';
import { Profiles } from '../../api/profiles/Profiles';

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
    const { topic, course, response } = data;
    const session = topic;
    const profile = Meteor.user().username;
    const points = 1;
    SessionsProfiles.collection.insert({ topic, course, profile, response },
    (error) => {
          if (error) {
            swal('Error', error.message, 'error');
          } else {
            ProfilesPoints.collection.insert({ profile, session, points},
            (err) => {
              if (err) {
                swal('Error', err.message, 'error');
              } else {
                swal('Success', 'Successfully registered for session', 'success');
                Profiles.collection.update(profile._id, { $inc: { points: 1 } });
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
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">Register for Session</Header>
            <AutoForm schema={bridge} onSubmit={data => this.submit(data)} model={this.props.doc}>
              <Segment>
                <TextField name='topic' readOnly={true}/>
                <TextField name='course' readOnly={true}/>
                <TextField name='location' readOnly={true}/>
                <DateField name='sessionDate' readOnly={true}/>
                <TextField name='sessionNotes' readOnly={true}/>
                <TextField label='Created by' name='owner' readOnly={true}/>
                <TextField name='response'/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

// Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use.
RegisterSession.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(SessionsCourses.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the document
  const doc = SessionsCourses.collection.findOne(documentId);
  return {
    doc,
    ready,
  };
})(RegisterSession);

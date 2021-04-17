import React from 'react';
import { Grid, Segment, Header, Form, Loader } from 'semantic-ui-react';
import { AutoForm, TextField, DateField, SelectField, SubmitField, ErrorsField } from 'uniforms-semantic';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Sessions } from '../../api/sessions/Sessions';
import { Profiles } from '../../api/profiles/Profiles';
import { SessionsProfiles } from '../../api/sessions/SessionsProfiles';

/** Create a schema to specify the structure of the data to appear in the form. */
const formSchema = new SimpleSchema({
  topic: String,
  profile: String,
  response: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class SignupSession extends React.Component {

  /** On submit, insert the data. */
  submit(data) {
    let insertError;
    const { topic, profile, response } = data;
    SessionsProfiles.collection.insert({ topic, profile, response }, (error) => { insertError = error; });
    if (insertError) {
      swal('Error', insertError.message, 'error');
    } else {
      swal('Success', 'Added to the stUHdy session');
    }
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  renderPage() {
    return (
      <Grid id="signup-session-page" container centered>
        <Grid.Column>
          <Header as="h2" textAlign="center">Sign up for Session</Header>
          <AutoForm schema={bridge} onSubmit={data => this.submit(data)} model={this.props.doc}>
            <Segment>
              <Form.Group widths={'equal'}>
                <TextField name='topic' readOnly={true}/>
                <SelectField name='course' showInlineError={true} placeholder='Course'/>
                <TextField id='location' name='location' showInlineError={true} placeholder='Location'/>
                <DateField name='sessionDate' showInlineError={true}/>
              </Form.Group>
              <SubmitField id='submit' value='Submit'/>
              <ErrorsField/>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

SignupSession.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(({ match }) => {
  const documentId = match.params._id;
  const subsessions = Meteor.subscribe(Sessions.userPublicationName);
  const subprofiles = Meteor.subscribe(Profiles.userPublicationName);
  const doc = Sessions.collection.findOne(documentId);
  return {
    doc,
    ready: subsessions.ready() && subprofiles.ready(),
  };
})(SignupSession);

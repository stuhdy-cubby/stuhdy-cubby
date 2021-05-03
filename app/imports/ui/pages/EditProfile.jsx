import React from 'react';
import { Grid, Loader, Header, Segment, Divider, Checkbox, Button } from 'semantic-ui-react';
import swal from 'sweetalert';
import { AutoForm, ErrorsField, SelectField, SubmitField, TextField } from 'uniforms-semantic';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Profiles } from '../../api/profiles/Profiles';

const bridge = new SimpleSchema2Bridge(Profiles.schema);

/** Renders the Page for editing a single document. */
class EditProfile extends React.Component {

  // On successful submit, insert the data.
  submit(data) {
    const owner = Meteor.user().username;
    const { firstName, lastName, email, institution, major, standing, bio, _id, interests, skills } = data;
    Profiles.collection.update(_id, { $set: { firstName, lastName, email, institution, major, standing, bio, owner, interests, skills } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Item updated successfully', 'success')));
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
          <Divider hidden />
          <Header as="h2" textAlign="center">Edit Profile</Header>
          <Divider hidden />
          <AutoForm schema={bridge} onSubmit={data => this.submit(data)} model={this.props.doc}>
            <Segment>
              <TextField name='firstName'/>
              <TextField name='lastName' />
              <TextField name='email' />
              <SelectField name='institution'/>
              <SelectField name='major'/>
              <SelectField name='standing'/>
              <TextField name='bio' />

              <Divider hidden />
              <Divider clearing />
              <Divider hidden />

              <p><strong>Interests</strong></p>
              <p>Select all that apply.</p>
              <Grid columns='three'>
                <Grid.Row>
                  <Grid.Column width={3}>
                    <Checkbox label={<label>Art</label>} />
                    <Divider hidden />
                    <Checkbox label={<label>Culinary Arts</label>} />
                  </Grid.Column>
                  <Grid.Column width={3}>
                    <Checkbox label={<label>Music</label>} />
                    <Divider hidden />
                    <Checkbox label={<label>Athletics</label>} />
                  </Grid.Column>
                  <Grid.Column width={3}>
                    <Checkbox label={<label>Creative Media</label>} />
                    <Divider hidden />
                    <Checkbox label={<label>Technology</label>} />
                  </Grid.Column>
                  <Grid.Column width={3}>
                    <Checkbox label={<label>Other</label>} />
                  </Grid.Column>
                </Grid.Row>
              </Grid>

              <Divider hidden />
              <Divider clearing />
              <Divider hidden />

              <p><strong>Skills</strong></p>
              <p>Select all that apply.</p>
              <Grid columns='three'>
                <Grid.Row>
                  <Grid.Column width={2}>
                    <Checkbox label={<label>Javascript</label>} />
                    <Divider hidden />
                    <Checkbox label={<label>Java</label>} />
                  </Grid.Column>
                  <Grid.Column width={2}>
                    <Checkbox label={<label>HTML</label>} />
                    <Divider hidden />
                    <Checkbox label={<label>CSS</label>} />
                  </Grid.Column>
                  <Grid.Column width={2}>
                    <Checkbox label={<label>C</label>} />
                    <Divider hidden />
                    <Checkbox label={<label>C++</label>} />
                  </Grid.Column>
                  <Grid.Column width={2}>
                    <Checkbox label={<label>Other</label>}/>
                  </Grid.Column>
                </Grid.Row>
              </Grid>

              <Divider hidden />
              <Divider hidden />

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
EditProfile.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Profiles.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the document
  const doc = Profiles.collection.findOne(documentId);
  return {
    doc,
    ready,
  };
})(EditProfile);

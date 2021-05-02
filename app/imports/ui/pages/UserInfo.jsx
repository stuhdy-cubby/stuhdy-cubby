import React from 'react';
import { Grid, Segment, Header, Divider } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SelectField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Profiles } from '../../api/profiles/Profiles';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  email: { type: String, index: true, unique: true },
  firstName: { type: String },
  lastName: { type: String },
  bio: { type: String, optional: true },
  picture: { type: String, optional: true },
  institution: {
    type: String,
    allowedValues: ['University of Hawaii at Manoa', 'University of Hawaii West Oahu'],
  },
  major: {
    type: String,
    allowedValues: ['Computer Science', 'Computer Engineering'],
  },
  standing: {
    type: String,
    allowedValues: ['Freshman', 'Sophomore', 'Junior', 'Senior', 'Other'],
  },
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class UserInfo extends React.Component {

  // On submit, insert the data.
  submit(data, formRef) {
    const { firstName, lastName, email, institution, major, standing, bio } = data;
    const owner = Meteor.user().username;
    Profiles.collection.insert({ firstName, lastName, email, institution, major, standing, bio, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();
        }
      });
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  render() {
    let fRef = null;
    return (
      <Grid container centered>
        <Grid.Column>
          <Divider hidden />
          <Header as="h2" textAlign="center">Create Profile</Header>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
            <Segment>
              <TextField name='firstName'/>
              <TextField name='lastName' />
              <TextField name='email' />
              <SelectField name='institution'/>
              <SelectField name='major'/>
              <SelectField name='standing'/>
              <TextField name='bio' />
              <SubmitField value='Submit'/>
              <ErrorsField/>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

// Require a document to be passed to this component.
UserInfo.propTypes = {
  profiles: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    institution: PropTypes.string,
    major: PropTypes.string,
    standing: PropTypes.string,
    bio: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(UserInfo);
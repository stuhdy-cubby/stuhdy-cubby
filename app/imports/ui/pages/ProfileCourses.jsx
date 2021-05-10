import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SubmitField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { _ } from 'meteor/underscore';
import MultiSelectField from '../forms/controllers/MultiSelectField';
import { Courses } from '../../api/courses/Courses';
import { Profiles } from '../../api/profiles/Profiles';

// Create a schema to specify the structure of the data to appear in the form.
const bridge = new SimpleSchema2Bridge(Profiles.schema);

/** Renders the Page for adding a document. */
class ProfileCourses extends React.Component {

  // On submit, insert the data.
  submit(data) {
    const { senseicourses, grasshoppercourses, _id } = data;
    // console.log(this.props.doc._id);
    // console.log(data);

    const exists = _.filter(senseicourses, function (s) {
      return grasshoppercourses.indexOf(s) !== -1;
    });

    // console.log(exists);

    if (exists.length > 0) {
      swal('Error', `You cannot be a sensei and grasshopper in the same course(s):\n${exists}`, 'error');
    } else {
      Profiles.collection.update(_id, { $set: { senseicourses, grasshoppercourses } }, (error) => (error ?
        swal('Error', error.message, 'error') :
        swal('Success', 'Updated Courses', 'success')
          .then(function () {
            window.location.href = '#/profile';
          })
      ));
    }
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  render() {
    return (
      <Grid container centered>
        <Grid.Column>
          <Header as="h2" textAlign="center">Edit Courses</Header>
          <AutoForm schema={bridge} onSubmit={data => this.submit(data)} model={this.props.doc}>
            <Segment>
              <Header as={'h3'}>Sensei Courses</Header>
              <MultiSelectField label='Sensei Courses' name='senseicourses' showInlineError={true} placeholder={'Select Courses'}/>
              <Header as={'h3'}>Grasshopper Courses</Header>
              <MultiSelectField label='Grasshopper Courses' name='grasshoppercourses' showInlineError={true} placeholder={'Select Courses'}/>
              <SubmitField value='Submit'/>
              <ErrorsField/>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

ProfileCourses.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(({ match }) => {
  const documentId = match.params._id;
  const subProfiles = Meteor.subscribe(Profiles.userPublicationName);
  const subCourses = Meteor.subscribe(Courses.userPublicationName);
  const doc = Profiles.collection.findOne(documentId);
  return {
    doc,
    ready: subProfiles.ready() && subCourses.ready(),
  };
})(ProfileCourses);

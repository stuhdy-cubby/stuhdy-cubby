import React from 'react';
import { Grid, Segment, Header, Form } from 'semantic-ui-react';
import { AutoForm, TextField, DateField, SelectField, SubmitField, ErrorsField } from 'uniforms-semantic';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { _ } from 'meteor/underscore';
import PropTypes from 'prop-types';
import { Courses } from '../../api/courses/Courses';
import { Sessions } from '../../api/sessions/Sessions';
import { SessionsCourses } from '../../api/sessions/SessionsCourses';

/** Create a schema to specify the structure of the data to appear in the form. */
const makeSchema = (allCourses) => new SimpleSchema({
  topic: String,
  course: { type: String, allowedValues: allCourses, optional: false },
  location: String,
  sessionDate: { label: 'Session Date', type: Date, defaultValue: new Date() },
});

/** Renders the Page for adding a document. */
class AddSession extends React.Component {

  /** On submit, insert the data. */
  submit(data, formRef) {
    let insertError;
    const { topic, course, location, sessionDate } = data;
    Sessions.collection.insert({ topic }, (error) => { insertError = error; });
    if (insertError) {
      swal('Error', insertError.message, 'error');
    } else {
      SessionsCourses.collection.insert({ topic, course, location, sessionDate },
        (error) => { insertError = error; });
      if (insertError) {
        swal('Error', insertError.message, 'error');
      } else {
        swal('Success', 'The stUHdy session was creacted');
        formRef.reset();
      }
    }
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    let fRef = null;
    const allCourses = _.pluck(Courses.collection.find().fetch(), 'name');
    const formSchema = makeSchema(allCourses);
    const bridge = new SimpleSchema2Bridge(formSchema);
    return (
      <Grid id="add-session-page" container centered>
        <Grid.Column>
          <Header as="h2" textAlign="center">Add Session</Header>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
            <Segment>
              <Form.Group widths={'equal'}>
                <TextField id='topic' name='topic' showInlineError={true} placeholder='Topic'/>
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

AddSession.propTypes = {
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const sub1 = Meteor.subscribe(Courses.userPublicationName);
  return {
    ready: sub1.ready(),
  };
})(AddSession);

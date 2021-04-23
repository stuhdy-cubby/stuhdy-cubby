import React from 'react';
import { Grid, Segment, Header, Form, Input } from 'semantic-ui-react';
import { AutoForm, TextField, DateField, SelectField, LongTextField,
  HiddenField, SubmitField, ErrorsField } from 'uniforms-semantic';
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
  topic: { type: String, optional: false },
  description: String,
  course: { type: String, allowedValues: allCourses, optional: false },
  location: { type: String, defaultValue: 'ICSpace', label: 'Location' },
  sessionDate: { label: 'Session Date', type: Date, defaultValue: new Date() },
  sessionNotes: { type: String, label: 'Session Notes' },
});

/** Renders the Page for adding a document. */
class AddSession extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = { description: '' };
  }

  handleChange(e) {
    this.setState({ description: e.target.value });
  }

  /** On submit, insert the data. */
  submit(data, formRef) {
    const { topic, description, course, location, sessionDate, sessionNotes } = data;
    const owner = Meteor.user().username;
    if (Sessions.collection.find({ topic: topic }).count() === 0) {
      Sessions.collection.insert({ topic, description });
    }
    SessionsCourses.collection.insert({ topic, course, location, sessionDate, sessionNotes, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'stUHdy session added successfully', 'success');
          formRef.reset();
        }
      });
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    let fRef = null;
    const descrip = this.state.description;
    const allCourses = _.pluck(Courses.collection.find().fetch(), 'name');
    const allSessions = _.pluck(Sessions.collection.find().fetch(), 'topic');
    const formSchema = makeSchema(allCourses);
    const bridge = new SimpleSchema2Bridge(formSchema);
    return (
      <Grid id="add-session-page" container centered>
        <Grid.Column>
          <Header as="h2" textAlign="center">Add Session</Header>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
            <Segment>
              <Input size='large' list='topics'
                label='Topic' name='topics' placeholder='Select or Enter a topic ' onChange={this.handleChange}/>
              <datalist id='topics'>
                {allSessions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </datalist>
              <HiddenField name='topic' value={descrip} />
              <HiddenField name='description' value={descrip} />
              <Form.Group widths={'equal'}>
                <SelectField id='course' name='course' showInlineError={true} placeholder='Course'/>
                <TextField id='location' name='location' showInlineError={true} placeholder='Location'/>
                <DateField name='sessionDate' showInlineError={true}/>
              </Form.Group>
              <LongTextField id='sessionNotes' name='sessionNotes' placeholder='Session notes'/>
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
  const subCourses = Meteor.subscribe(Courses.userPublicationName);
  const subSessions = Meteor.subscribe(Sessions.userPublicationName);
  return {
    ready: subCourses.ready() && subSessions.ready(),
  };
})(AddSession);

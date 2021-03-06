import React from 'react';
import { Grid, Segment, Header, Form, Input, Message, Button, Icon } from 'semantic-ui-react';
import { AutoForm, TextField, DateField, SelectField, LongTextField,
  HiddenField, SubmitField, ErrorsField } from 'uniforms-semantic';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { _ } from 'meteor/underscore';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Profiles } from '../../api/profiles/Profiles';
import { Courses } from '../../api/courses/Courses';
import { Sessions } from '../../api/sessions/Sessions';
import { SessionsCourses } from '../../api/sessions/SessionsCourses';
import { ProfilesPoints } from '../../api/profiles/ProfilesPoints';

/** Create a schema to specify the structure of the data to appear in the form. */
const makeSchema = (allCourses) => new SimpleSchema({
  topic: { type: String, optional: false },
  description: String,
  course: { type: String, label: 'Courses', optional: false, allowedValues: allCourses },
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

  /** On submit, insert the data and sends email */
  submit(data, formRef) {
    const { topic, description, course, location, sessionDate, sessionNotes } = data;
    const emailList = _.pluck(Profiles.collection.find().fetch(), 'email');
    // console.log(emailList);
    const subjectLine = `New session for: ${topic}`;
    const owner = Meteor.user().username;
    const profile = Meteor.user().username;
    const points = 1;
    const session = topic;
    if (Sessions.collection.find({ topic: topic }).count() === 0) {
      Sessions.collection.insert({ topic, description });
    }
    SessionsCourses.collection.insert({ topic, course, location, sessionDate, sessionNotes, owner },
      (error, docsInserted) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          ProfilesPoints.collection.insert({ profile, session, points });
          const emailMessage = `<b>Topic:</b> ${topic}<br/>
            <b>Course:</b> ${course}<br/>
            <b>Location:</b> ${location}<br/>
            <b>Date and Time:</b> ${sessionDate}<br/>
            <b>Notes:</b> ${sessionNotes}<br/>
            <a href="https://stuhdy-cubby.xyz/#/registersession/${docsInserted}">Register for this session</a>`;
          swal('Success', 'stUHdy session added successfully', 'success');
          // console.log(docsInserted);
          /** Email registered users of new session */

          _.each(emailList, function (n) {
            // console.log(n);
            Meteor.call(
              'sendEmail',
              n,
              'stuhdy-cubby@gmail.com',
              subjectLine,
              emailMessage,
            );
          });

          formRef.reset();
        }
      });
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    let fRef = null;
    const email = Meteor.user().username;
    const descrip = this.state.description;
    const profile = _.pluck(Profiles.collection.find({ email: email }).fetch(), '_id');
    const profileId = profile[0];
    const allSessions = _.pluck(Sessions.collection.find().fetch(), 'topic');
    const userCourses = _.pluck(Profiles.collection.find({ email: email }).fetch(), 'grasshoppercourses');
    const allCourses = userCourses[0];
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth()).padStart(2, '0');
    const yyyy = today.getFullYear();
    const formSchema = makeSchema(allCourses);
    const bridge = new SimpleSchema2Bridge(formSchema);
    return (
      <div className='addsession-background'>
        <Grid id="add-session-page" container centered>
          <Grid.Column color={'green'}>
            <Header as="h2" inverted textAlign="center">Add Session</Header>
            <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
              {(_.size(allCourses) === 0) ?
                <Message icon>
                  <Icon name='frown outline'/>
                  <Message.Content>
                    <Message.Header>Oops!</Message.Header>
                      It looks like you do not have any Grasshopper Courses.
                  </Message.Content>
                  <Button as={NavLink} id='editcourses' activeClassName="active"
                    exact to={`/profilecourses/${profileId}`} key='profilecourses'
                    color='green' fluid>Please Add Courses</Button>
                </Message> : ''}
              <Segment>
                <Input size='large' list='topics'
                  label={{
                    as: 'a',
                    color: 'teal',
                    content: 'Topic *',
                    icon: 'book',
                  }} name='topicInput' id='topicInput' placeholder='Select or Enter a topic ' onChange={this.handleChange}/>
                <datalist id='topics'>
                  {allSessions.map((option) => (
                    <option key={option} id={option} value={option}>{option}</option>
                  ))}
                </datalist>
                <HiddenField name='topic' value={descrip} />
                <HiddenField name='description' value={descrip} />
                <Form.Group widths={'equal'}>
                  <SelectField id='course' name='course' showInlineError={true} placeholder='Course'/>
                  <TextField id='location' name='location' showInlineError={true} placeholder='Location'/>
                  <DateField id='sessionDate' name='sessionDate' showInlineError={true} min={new Date(yyyy, mm, dd)}
                  />
                </Form.Group>
                <LongTextField id='sessionNotes' name='sessionNotes' placeholder='Session notes'/>
                <SubmitField id='submit' value='Submit'/>
                <ErrorsField/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

AddSession.propTypes = {
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const subCourses = Meteor.subscribe(Courses.userPublicationName);
  const subSessions = Meteor.subscribe(Sessions.userPublicationName);
  const subProfiles = Meteor.subscribe(Profiles.userPublicationName);
  return {
    ready: subCourses.ready() && subSessions.ready() && subProfiles.ready(),
  };
})(AddSession);

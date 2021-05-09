import React from 'react';
import { Grid, Segment, Header, Divider, Checkbox } from 'semantic-ui-react';
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
  bio: { type: String },
  picture: { type: String },
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
  interests: { type: Array, optional: true },
  'interests.$': { type: String },
  // enrolledCourses: { type: String },
  // previouslyEnrolledCourses: { type: String },
  skills: { type: Array, optional: true },
  'skills.$': { type: String },
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { checkedInterests: [], checkedSkills: [] };
    this.handleCheckInterest = this.handleCheckInterest.bind(this);
    this.handleCheckSkills = this.handleCheckSkills.bind(this);
  }

  // code adapted from https://stackoverflow.com/questions/60611907/
  // how-to-set-the-handler-for-multiple-checkboxes-in-react by keikai

  handleCheckInterest = id => () => {
    const { checkedInterests } = this.state;
    const result = checkedInterests.includes(id)
      ? checkedInterests.filter(x => x !== id)
      : [...checkedInterests, id];
    this.setState({ checkedInterests: result }, () => {
      console.log(this.state.checkedInterests);
    });
  };

  handleCheckSkills = id => () => {
    const { checkedSkills } = this.state;
    const result = checkedSkills.includes(id)
      ? checkedSkills.filter(x => x !== id)
      : [...checkedSkills, id];
    this.setState({ checkedSkills: result }, () => {
      console.log(this.state.checkedSkills);
    });
  };

  // On submit, insert the data.
  submit(data, formRef) {
    const interests = this.state.checkedInterests;
    const skills = this.state.checkedSkills;
    const { firstName, lastName, email, institution, major, standing, picture, bio } = data;
    const owner = Meteor.user().username;
    Profiles.collection.insert({ firstName, lastName, email, institution, major, standing, picture, bio, owner, interests, skills },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Profile successfully added', 'success');
          formRef.reset();
        }
      });
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  render() {
    let fRef = null;
    const { checkedInterests, checkedSkills } = this.state;
    return (
      <Grid container centered>
        <Grid.Column>
          <Divider hidden />
          <Header as="h2" textAlign="center">Create Profile</Header>
          <Divider hidden />
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
            <Segment>
              <TextField name='firstName'/>
              <TextField name='lastName' />
              <TextField name='email' />
              <SelectField name='institution'/>
              <SelectField name='major'/>
              <SelectField name='standing'/>
              <TextField name='picture' placeholder='URL to your picture' />
              <TextField name='bio' />

              <Divider hidden />
              <Divider clearing />
              <Divider hidden />

              <p><strong>Interests</strong></p>
              <p>Select all that apply.</p>
              <Grid columns='three'>
                <Grid.Row>
                  <Grid.Column width={3}>
                    <Checkbox label={<label>Art</label>} onChange={this.handleCheckInterest('Art')}
                      checked={checkedInterests.includes('Art')} />
                    <Divider hidden />
                    <Checkbox label={<label>Culinary Arts</label>} onChange={this.handleCheckInterest('Culinary Arts')}
                      checked={checkedInterests.includes('Culinary Arts')} />
                  </Grid.Column>
                  <Grid.Column width={3}>
                    <Checkbox label={<label>Music</label>} onChange={this.handleCheckInterest('Music')}
                      checked={checkedInterests.includes('Music')}/>
                    <Divider hidden />
                    <Checkbox label={<label>Athletics</label>} onChange={this.handleCheckInterest('Athletics')}
                      checked={checkedInterests.includes('Athletics')} />
                  </Grid.Column>
                  <Grid.Column width={3}>
                    <Checkbox label={<label>Creative Media</label>} onChange={this.handleCheckInterest('Creative Media')}
                      checked={checkedInterests.includes('Creative Media')} />
                    <Divider hidden />
                    <Checkbox label={<label>Technology</label>} onChange={this.handleCheckInterest('Technology')}
                      checked={checkedInterests.includes('Technology')} />
                  </Grid.Column>
                  <Grid.Column width={3}>
                    <Checkbox label={<label>Other</label>} onChange={this.handleCheckInterest('Other')}
                      checked={checkedInterests.includes('Other')} />
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
                    <Checkbox label={<label>Javascript</label>} onChange={this.handleCheckSkills('Javascript')}
                      checked={checkedSkills.includes('Javascript')} />
                    <Divider hidden />
                    <Checkbox label={<label>Java</label>} onChange={this.handleCheckSkills('Java')}
                      checked={checkedSkills.includes('Java')}/>
                  </Grid.Column>
                  <Grid.Column width={2}>
                    <Checkbox label={<label>HTML</label>} onChange={this.handleCheckSkills('HTML')}
                      checked={checkedSkills.includes('HTML')} />
                    <Divider hidden />
                    <Checkbox label={<label>CSS</label>} onChange={this.handleCheckSkills('CSS')}
                      checked={checkedSkills.includes('CSS')}/>
                  </Grid.Column>
                  <Grid.Column width={2}>
                    <Checkbox label={<label>C</label>} onChange={this.handleCheckSkills('C')}
                      checked={checkedSkills.includes('C')}/>
                    <Divider hidden />
                    <Checkbox label={<label>C++</label>} onChange={this.handleCheckSkills('C++')}
                      checked={checkedSkills.includes('C++')}/>
                  </Grid.Column>
                  <Grid.Column width={2}>
                    <Checkbox label={<label>Other</label>} onChange={this.handleCheckSkills('Other')}
                      checked={checkedSkills.includes('Other')}/>
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

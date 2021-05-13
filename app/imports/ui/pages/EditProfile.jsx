import React from 'react';
import { Grid, Loader, Header, Segment, Divider, Checkbox } from 'semantic-ui-react';
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
  constructor(props) {
    super(props);
    this.state = { checkedInterests: [], checkedSkills: [], checked: false };
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

  // On successful submit, insert the data.
  submit(data) {
    const owner = Meteor.user().username;
    const interests = this.state.checkedInterests;
    const skills = this.state.checkedSkills;
    const { firstName, lastName, email, institution, major, standing, bio, _id } = data;
    Profiles.collection.update(_id, { $set: { firstName, lastName, email, institution, major, standing, bio, owner, interests, skills } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Profile updated successfully', 'success')
        .then(function () {
          window.location.href = '#/profile';
        })
    ));
  }

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  renderPage() {
    const { checkedInterests, checkedSkills, checked } = this.state;

    // initial populate
    if (checked === false) {
      if (this.props.doc.interests !== undefined) {
        this.setState({ checkedInterests: this.props.doc.interests });
      }

      if (this.props.doc.skills !== undefined) {
        this.setState({ checkedSkills: this.props.doc.skills });
      }
      this.setState({ checked: true });
    }
    return (
      <Grid container centered>
        <Grid.Column>
          <Divider hidden />
          <Header as="h2" textAlign="center">Edit Profile</Header>
          <Divider hidden />
          <AutoForm schema={bridge} onSubmit={data => this.submit(data)} model={this.props.doc}>
            <Segment>
              <TextField id='firstName' name='firstName'/>
              <TextField id='lastName' name='lastName' />
              <TextField id='email' name='email' />
              <SelectField id='institution' name='institution'/>
              <SelectField id='major' name='major'/>
              <SelectField id='standing' name='standing'/>
              <TextField id='picurl' name='picture' placeholder='URL to your picture' />
              <TextField id='bio' name='bio' />

              <Divider hidden />
              <Divider clearing />
              <Divider hidden />

              <p><strong>Interests</strong></p>
              <p>Select all that apply.</p>
              <Grid columns='three'>
                <Grid.Row>
                  <Grid.Column width={3}>
                    <Checkbox id='art' label={<label>Art</label>} onChange={this.handleCheckInterest('Art')}
                      checked={checkedInterests.includes('Art')} />
                    <Divider hidden />
                    <Checkbox id='culinary' label={<label>Culinary Arts</label>} onChange={this.handleCheckInterest('Culinary Arts')}
                      checked={checkedInterests.includes('Culinary Arts')} />
                  </Grid.Column>
                  <Grid.Column width={3}>
                    <Checkbox id='music' label={<label>Music</label>} onChange={this.handleCheckInterest('Music')}
                      checked={checkedInterests.includes('Music')}/>
                    <Divider hidden />
                    <Checkbox id='athletics' label={<label>Athletics</label>} onChange={this.handleCheckInterest('Athletics')}
                      checked={checkedInterests.includes('Athletics')} />
                  </Grid.Column>
                  <Grid.Column width={3}>
                    <Checkbox id='creativemedia' label={<label>Creative Media</label>} onChange={this.handleCheckInterest('Creative Media')}
                      checked={checkedInterests.includes('Creative Media')} />
                    <Divider hidden />
                    <Checkbox id='technology' label={<label>Technology</label>} onChange={this.handleCheckInterest('Technology')}
                      checked={checkedInterests.includes('Technology')} />
                  </Grid.Column>
                  <Grid.Column width={3}>
                    <Checkbox id='interestother' label={<label>Other</label>} onChange={this.handleCheckInterest('Other')}
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
                    <Checkbox id='javascript' label={<label>Javascript</label>} onChange={this.handleCheckSkills('Javascript')}
                      checked={checkedSkills.includes('Javascript')} />
                    <Divider hidden />
                    <Checkbox id='java' label={<label>Java</label>} onChange={this.handleCheckSkills('Java')}
                      checked={checkedSkills.includes('Java')}/>
                  </Grid.Column>
                  <Grid.Column width={2}>
                    <Checkbox id='html' label={<label>HTML</label>} onChange={this.handleCheckSkills('HTML')}
                      checked={checkedSkills.includes('HTML')} />
                    <Divider hidden />
                    <Checkbox id='css' label={<label>CSS</label>} onChange={this.handleCheckSkills('CSS')}
                      checked={checkedSkills.includes('CSS')}/>
                  </Grid.Column>
                  <Grid.Column width={2}>
                    <Checkbox id='c' label={<label>C</label>} onChange={this.handleCheckSkills('C')}
                      checked={checkedSkills.includes('C')}/>
                    <Divider hidden />
                    <Checkbox id ='c++' label={<label>C++</label>} onChange={this.handleCheckSkills('C++')}
                      checked={checkedSkills.includes('C++')}/>
                  </Grid.Column>
                  <Grid.Column width={2}>
                    <Checkbox id='skillsother' label={<label>Other</label>} onChange={this.handleCheckSkills('Other')}
                      checked={checkedSkills.includes('Other')}/>
                  </Grid.Column>
                </Grid.Row>
              </Grid>

              <Divider hidden />
              <Divider hidden />

              <SubmitField id='submit' value='Submit'/>
              <ErrorsField/>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

// Require the presence of a Profiles document in the props object. Uniforms adds 'model' to the props, which we use.
EditProfile.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Profiles documents.
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

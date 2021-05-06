import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, label, Header, Loader, Form, Button } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { Profiles } from '../../api/profiles/Profiles';
import { ProfilesCourses } from '../../api/profiles/ProfilesCourses';

/** Renders a table of courses */
class ProfileCourses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ics101: '', ics111: '', ics141: '',
      ics211: '', ics212: '', ics222: '', ics241: '',
      ics311: '', ics312: '', ics314: '', ics321: '', ics332: '', ics355: '', ics361: '', ics390: '',
      ics414: '', ics422: '', ics425: '', ics427: '', ics435: '', ics451: '', ics461: '', ics464: '',
      ics485: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (e, { name, value }) => {
    // console.log(name);
    // console.log(value);
    this.setState({ [name]: value });
  }

  submit() {
    const profile = Meteor.user().username;
    const {
      ics101, ics111, ics141,
      ics211, ics212, ics222, ics241,
      ics311, ics312, ics314, ics321, ics332, ics355, ics361, ics390,
      ics414, ics422, ics425, ics427, ics435, ics451, ics461, ics464, ics485,
    } = this.state;
    let data = [];
    if (ics101.length > 0) {
      data = [...data, { profile: profile, course: 'ICS 101', role: ics101 }];
    }
    if (ics111.length > 0) {
      data = [...data, { profile: profile, course: 'ICS 111', role: ics111 }];
    }
    if (ics141.length > 0) {
      data = [...data, { profile: profile, course: 'ICS 141', role: ics141 }];
    }
    if (ics211.length > 0) {
      data = [...data, { profile: profile, course: 'ICS 211', role: ics211 }];
    }
    if (ics212.length > 0) {
      data = [...data, { profile: profile, course: 'ICS 212', role: ics212 }];
    }
    if (ics222.length > 0) {
      data = [...data, { profile: profile, course: 'ICS 222', role: ics222 }];
    }
    if (ics241.length > 0) {
      data = [...data, { profile: profile, course: 'ICS 241', role: ics241 }];
    }
    if (ics311.length > 0) {
      data = [...data, { profile: profile, course: 'ICS 311', role: ics311 }];
    }
    if (ics312.length > 0) {
      data = [...data, { profile: profile, course: 'ICS 312', role: ics312 }];
    }
    if (ics314.length > 0) {
      data = [...data, { profile: profile, course: 'ICS 314', role: ics314 }];
    }
    if (ics321.length > 0) {
      data = [...data, { profile: profile, course: 'ICS 321', role: ics321 }];
    }
    if (ics332.length > 0) {
      data = [...data, { profile: profile, course: 'ICS 332', role: ics332 }];
    }
    if (ics355.length > 0) {
      data = [...data, { profile: profile, course: 'ICS 355', role: ics355 }];
    }
    if (ics361.length > 0) {
      data = [...data, { profile: profile, course: 'ICS 361', role: ics361 }];
    }
    if (ics390.length > 0) {
      data = [...data, { profile: profile, course: 'ICS 390', role: ics390 }];
    }
    if (ics414.length > 0) {
      data = [...data, { profile: profile, course: 'ICS 414', role: ics414 }];
    }
    if (ics422.length > 0) {
      data = [...data, { profile: profile, course: 'ICS 422', role: ics422 }];
    }
    if (ics425.length > 0) {
      data = [...data, { profile: profile, course: 'ICS 425', role: ics425 }];
    }
    if (ics427.length > 0) {
      data = [...data, { profile: profile, course: 'ICS 427', role: ics427 }];
    }
    if (ics435.length > 0) {
      data = [...data, { profile: profile, course: 'ICS 435', role: ics435 }];
    }
    if (ics451.length > 0) {
      data = [...data, { profile: profile, course: 'ICS 451', role: ics451 }];
    }
    if (ics461.length > 0) {
      data = [...data, { profile: profile, course: 'ICS 461', role: ics461 }];
    }
    if (ics464.length > 0) {
      data = [...data, { profile: profile, course: 'ICS 464', role: ics464 }];
    }
    if (ics485.length > 0) {
      data = [...data, { profile: profile, course: 'ICS 485', role: ics485 }];
    }
    // console.log(data);

    if (data) {
      data.map((course) => ProfilesCourses.collection.insert(course));
      swal('Success', 'Courses added to profile', 'success')
        .then(function () {
          window.location.href = '#/profile';
        });
    }
  }

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    const {
      ics101, ics111, ics141,
      ics211, ics212, ics222, ics241,
      ics311, ics312, ics314, ics321, ics332, ics355, ics361, ics390,
      ics414, ics422, ics425, ics427, ics435, ics451, ics461, ics464, ics485,
    } = this.state;
    return (
      <Container>
        <Header as="h2" textAlign="center">Profile Courses</Header>
        <Form size={'big'} onSubmit={data => this.submit(data)}>
          <Button>Submit</Button>
          <Header as="h3">100-level coures</Header>
          <Form.Group inline>
            <label>ICS 101</label>
            <Form.Radio
              label='Sensei'
              name='ics101'
              value='sensei'
              checked={ics101 === 'sensei'}
              onChange={this.handleChange}
            />
            <Form.Radio
              label='Grasshopper'
              name='ics101'
              value='grasshopper'
              checked={ics101 === 'grasshopper'}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group inline>
            <label>ICS 111</label>
            <Form.Radio
              label='Sensei'
              name='ics111'
              value='sensei'
              checked={ics111 === 'sensei'}
              onChange={this.handleChange}
            />
            <Form.Radio
              label='Grasshopper'
              name='ics111'
              value='grasshopper'
              checked={ics111 === 'grasshopper'}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group inline>
            <label>ICS 141</label>
            <Form.Radio
              label='Sensei'
              name='ics141'
              value='sensei'
              checked={ics141 === 'sensei'}
              onChange={this.handleChange}
            />
            <Form.Radio
              label='Grasshopper'
              name='ics141'
              value='grasshopper'
              checked={ics141 === 'grasshopper'}
              onChange={this.handleChange}
            />
          </Form.Group>
          <hr/>
          <Header as="h3">200-level coures</Header>
          <Form.Group inline>
            <label>ICS 211</label>
            <Form.Radio
              label='Sensei'
              name='ics211'
              value='sensei'
              checked={ics211 === 'sensei'}
              onChange={this.handleChange}
            />
            <Form.Radio
              label='Grasshopper'
              name='ics211'
              value='grasshopper'
              checked={ics211 === 'grasshopper'}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group inline>
            <label>ICS 212</label>
            <Form.Radio
              label='Sensei'
              name='ics212'
              value='sensei'
              checked={ics212 === 'sensei'}
              onChange={this.handleChange}
            />

            <Form.Radio
              label='Grasshopper'
              name='ics212'
              value='grasshopper'
              checked={ics212 === 'grasshopper'}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group inline>
            <label>ICS 222</label>
            <Form.Radio
              label='Sensei'
              name='ics222'
              value='sensei'
              checked={ics222 === 'sensei'}
              onChange={this.handleChange}
            />
            <Form.Radio
              label='Grasshopper'
              name='ics222'
              value='grasshopper'
              checked={ics222 === 'grasshopper'}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group inline>
            <label>ICS 241</label>
            <Form.Radio
              label='Sensei'
              name='ics241'
              value='sensei'
              checked={ics241 === 'sensei'}
              onChange={this.handleChange}
            />
            <Form.Radio
              label='Grasshopper'
              name='ics241'
              value='grasshopper'
              checked={ics241 === 'grasshopper'}
              onChange={this.handleChange}
            />
          </Form.Group>
          <hr/>
          <Header as="h3">300-level coures</Header>
          <Form.Group inline>
            <label>ICS 311</label>
            <Form.Radio
              label='Sensei'
              name='ics311'
              value='sensei'
              checked={ics311 === 'sensei'}
              onChange={this.handleChange}
            />
            <Form.Radio
              label='Grasshopper'
              name='ics311'
              value='grasshopper'
              checked={ics311 === 'grasshopper'}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group inline>
            <label>ICS 312</label>
            <Form.Radio
              label='Sensei'
              name='ics312'
              value='sensei'
              checked={ics312 === 'sensei'}
              onChange={this.handleChange}
            />
            <Form.Radio
              label='Grasshopper'
              name='ics312'
              value='grasshopper'
              checked={ics312 === 'grasshopper'}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group inline>
            <label>ICS 314</label>
            <Form.Radio
              label='Sensei'
              name='ics314'
              value='sensei'
              checked={ics314 === 'sensei'}
              onChange={this.handleChange}
            />
            <Form.Radio
              label='Grasshopper'
              name='ics314'
              value='grasshopper'
              checked={ics314 === 'grasshopper'}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group inline>
            <label>ICS 321</label>
            <Form.Radio
              label='Sensei'
              name='ics321'
              value='sensei'
              checked={ics321 === 'sensei'}
              onChange={this.handleChange}
            />
            <Form.Radio
              label='Grasshopper'
              name='ics321'
              value='grasshopper'
              checked={ics321 === 'grasshopper'}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group inline>
            <label>ICS 332</label>
            <Form.Radio
              label='Sensei'
              name='ics332'
              value='sensei'
              checked={ics332 === 'sensei'}
              onChange={this.handleChange}
            />
            <Form.Radio
              label='Grasshopper'
              name='ics332'
              value='grasshopper'
              checked={ics332 === 'grasshopper'}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group inline>
            <label>ICS 355</label>
            <Form.Radio
              label='Sensei'
              name='ics355'
              value='sensei'
              checked={ics355 === 'sensei'}
              onChange={this.handleChange}
            />
            <Form.Radio
              label='Grasshopper'
              name='ics355'
              value='grasshopper'
              checked={ics355 === 'grasshopper'}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group inline>
            <label>ICS 361</label>
            <Form.Radio
              label='Sensei'
              name='ics361'
              value='sensei'
              checked={ics361 === 'sensei'}
              onChange={this.handleChange}
            />
            <Form.Radio
              label='Grasshopper'
              name='ics361'
              value='grasshopper'
              checked={ics361 === 'grasshopper'}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group inline>
            <label>ICS 390</label>
            <Form.Radio
              label='Sensei'
              name='ics390'
              value='sensei'
              checked={ics390 === 'sensei'}
              onChange={this.handleChange}
            />
            <Form.Radio
              label='Grasshopper'
              name='ics390'
              value='grasshopper'
              checked={ics390 === 'grasshopper'}
              onChange={this.handleChange}
            />
          </Form.Group>
          <hr/>
          <Header as="h3">400-level coures</Header>
          <Form.Group inline>
            <label>ICS 414</label>
            <Form.Radio
              label='Sensei'
              name='ics414'
              value='sensei'
              checked={ics414 === 'sensei'}
              onChange={this.handleChange}
            />
            <Form.Radio
              label='Grasshopper'
              name='ics414'
              value='grasshopper'
              checked={ics414 === 'grasshopper'}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group inline>
            <label>ICS 422</label>
            <Form.Radio
              label='Sensei'
              name='ics422'
              value='sensei'
              checked={ics422 === 'sensei'}
              onChange={this.handleChange}
            />
            <Form.Radio
              label='Grasshopper'
              name='ics422'
              value='grasshopper'
              checked={ics422 === 'grasshopper'}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group inline>
            <label>ICS 425</label>
            <Form.Radio
              label='Sensei'
              name='ics425'
              value='sensei'
              checked={ics425 === 'sensei'}
              onChange={this.handleChange}
            />
            <Form.Radio
              label='Grasshopper'
              name='ics425'
              value='grasshopper'
              checked={ics425 === 'grasshopper'}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group inline>
            <label>ICS 427</label>
            <Form.Radio
              label='Sensei'
              name='ics427'
              value='sensei'
              checked={ics427 === 'sensei'}
              onChange={this.handleChange}
            />
            <Form.Radio
              label='Grasshopper'
              name='ics427'
              value='grasshopper'
              checked={ics427 === 'grasshopper'}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group inline>
            <label>ICS 435</label>
            <Form.Radio
              label='Sensei'
              name='ics435'
              value='sensei'
              checked={ics435 === 'sensei'}
              onChange={this.handleChange}
            />
            <Form.Radio
              label='Grasshopper'
              name='ics435'
              value='grasshopper'
              checked={ics435 === 'grasshopper'}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group inline>
            <label>ICS 451</label>
            <Form.Radio
              label='Sensei'
              name='ics451'
              value='sensei'
              checked={ics451 === 'sensei'}
              onChange={this.handleChange}
            />
            <Form.Radio
              label='Grasshopper'
              name='ics451'
              value='grasshopper'
              checked={ics451 === 'grasshopper'}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group inline>
            <label>ICS 461</label>
            <Form.Radio
              label='Sensei'
              name='ics461'
              value='sensei'
              checked={ics461 === 'sensei'}
              onChange={this.handleChange}
            />
            <Form.Radio
              label='Grasshopper'
              name='ics461'
              value='grasshopper'
              checked={ics461 === 'grasshopper'}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group inline>
            <label>ICS 464</label>
            <Form.Radio
              label='Sensei'
              name='ics464'
              value='sensei'
              checked={ics464 === 'sensei'}
              onChange={this.handleChange}
            />
            <Form.Radio
              label='Grasshopper'
              name='ics464'
              value='grasshopper'
              checked={ics464 === 'grasshopper'}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group inline>
            <label>ICS 485</label>
            <Form.Radio
              label='Sensei'
              name='ics485'
              value='sensei'
              checked={ics485 === 'sensei'}
              onChange={this.handleChange}
            />
            <Form.Radio
              label='Grasshopper'
              name='ics485'
              value='grasshopper'
              checked={ics485 === 'grasshopper'}
              onChange={this.handleChange}
            />
          </Form.Group>
        </Form>
      </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
ProfileCourses.propTypes = {
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  const subscription = Meteor.subscribe(Profiles.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the document
  const doc = Profiles.collection.findOne(documentId);
  return {
    doc,
    ready,
  };
})(ProfileCourses);

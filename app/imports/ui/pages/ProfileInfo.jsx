import React from 'react';
import { _ } from 'meteor/underscore';
import { Button, Card, Container, Divider, Grid, Header, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';
import moment from 'moment';

/** Renders a single row in the List Profiles table. See pages/ViewProfiles.jsx. */
class ProfileInfo extends React.Component {

  render() {
    return (
      <Container id="user-profile">
        <Grid container padded='horizontally'>
          <Grid.Column width={4}>
            <Image floated='left' size='medium' circular src={this.props.profiles.picture} />
            <Header as='h2'>{this.props.profiles.firstName} {this.props.profiles.lastName}</Header>
            <p>{this.props.profiles.email}</p>

            <Button as={NavLink} id='editprofile' activeClassName="active" exact to={`/edit/${this.props.profiles._id}`} key='edit' color='teal' fluid basic>Edit Profile</Button>
            <Divider clearing />

            <p><strong>Institution: </strong>{this.props.profiles.institution}</p>
            <p><strong>Major: </strong>{this.props.profiles.major}</p>
            <p><strong>Class Standing: </strong>{this.props.profiles.standing}</p>
            <p>{this.props.profiles.bio}</p>

            <Divider hidden />
          </Grid.Column>

          <Grid.Column width={8}>
            <Card.Group>
              <Card fluid>
                <Card.Content>
                  <Card.Header>Courses</Card.Header>
                  <Card.Description>
                    <Button as={NavLink} id='editcourses' activeClassName="active"
                      exact to={`/profilecourses/${this.props.profiles._id}`} key='profilecourses'
                      color='gray' fluid>Edit Courses</Button>
                  </Card.Description>
                </Card.Content>
              </Card>
              <Card fluid>
                <Card.Content>
                  <Card.Header>Sensei Courses</Card.Header>
                  <Card.Description>
                    {_.map(this.props.profiles.senseicourses, (c) => <p>{c}</p>)}
                    <Divider clearing />
                    <Header>Grasshopper Courses</Header>
                    {_.map(this.props.profiles.grasshoppercourses, (g) => <p>{g}</p>)}
                  </Card.Description>
                </Card.Content>
              </Card>
              <Card fluid>
                <Card.Content>
                  <Card.Header>Skills</Card.Header>
                  <Card.Description>{_.map(this.props.profiles.skills, (s) => <p>{s}</p>)}</Card.Description>
                </Card.Content>
              </Card>
            </Card.Group>

            <Divider hidden />

          </Grid.Column>

          <Grid.Column width={3}>
            <h3>Interests</h3>
            <Divider clearing />
            {_.map(this.props.profiles.interests, (i) => <p>{i}</p>)}

            <h3>My Sessions</h3>
            <Divider clearing />
            {_.map(this.props.sessions, (s) => <p id={s}><strong>Topic: </strong>{s.topic}<br/>
              <strong>Course: </strong>{s.course}<br/>
              <strong>Date: </strong>{moment.utc(this.props.sessions.sessionDate).format('MM-DD-YYYY hh:mm A')}<br/>
              <strong>Location: </strong>{s.location}
              <hr style={{ width: '10em' }}/>
            </p>)}

          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

// Require a document to be passed to this component.
ProfileInfo.propTypes = {
  profiles: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    institution: PropTypes.string,
    major: PropTypes.string,
    standing: PropTypes.string,
    bio: PropTypes.string,
    picture: PropTypes.object,
    interests: PropTypes.string,
    skills: PropTypes.string,
    senseicourses: PropTypes.string,
    grasshoppercourses: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
  sessions: PropTypes.array.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(ProfileInfo);

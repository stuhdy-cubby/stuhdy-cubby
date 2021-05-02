import React from 'react';
import { Button, Card, Container, Divider, Grid, Header, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class ProfileInfo extends React.Component {
  render() {
    return (
      <Container id="user-profile">
        <Grid container padded='horizontally'>
          <Grid.Column width={4}>
            <Image floated='left' size='medium' rounded src={this.props.profiles.picture} />
            <Header as='h2'>{this.props.profiles.firstName} {this.props.profiles.lastName}</Header>
            <p>{this.props.profiles.email}</p>

            <Button as={NavLink} activeClassName="active" exact to="/edit/:_id" key='edit' color='gray' fluid basic>Edit Profile</Button>

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
                  <Card.Header>Enrolled Courses</Card.Header>
                  <Card.Description></Card.Description>
                </Card.Content>
              </Card>
              <Card fluid>
                <Card.Content>
                  <Card.Header>Previously Taken Courses</Card.Header>
                  <Card.Description></Card.Description>
                </Card.Content>
              </Card>
              <Card fluid>
                <Card.Content>
                  <Card.Header>Skills</Card.Header>
                  <Card.Description></Card.Description>
                </Card.Content>
              </Card>
              <Card fluid>
                <Card.Content>
                  <Card.Header>Needs Help With</Card.Header>
                  <Card.Description></Card.Description>
                </Card.Content>
              </Card>
            </Card.Group>
          </Grid.Column>

          <Grid.Column width={3}>
            <h3>Interests</h3>
            <p><strong>Technical</strong></p>
            <p>List of technical interests.</p>

            <Divider clearing />

            <p><strong>Non-technical</strong></p>
            <p>List of non-technical interests.</p>
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
    _id: PropTypes.string,
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(ProfileInfo);
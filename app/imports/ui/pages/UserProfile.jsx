import React from 'react';
import { Button, Card, Container, Divider, Grid, Image } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class UserProfile extends React.Component {
  render() {
    return (
      <Container id="user-profile">
        <Grid container padded>
          <Grid.Column width={4}>
            <Image rounded src='https://react.semantic-ui.com/images/wireframe/image.png' />
            <h2>John Doe</h2>
            <p>johndoe@hawaii.edu</p>
            <Button fluid basic color='gray'><strong>Edit Profile</strong></Button>
            <Divider clearing />
            <p><strong>Institution: </strong>University of Hawaii at Manoa</p>
            <p><strong>Major: </strong>Information & Computer Sciences</p>
            <p><strong>Class Standing: </strong>Junior</p>
          </Grid.Column>

          <Grid.Column width={9}>
            <Card.Group>
              <Card fluid>
                <Card.Content>
                  <Card.Header>Enrolled Courses</Card.Header>
                  <Card.Description>
                    <p>ICS 314 - Software Engineering I</p>
                    <p>ICS 321 - Databases Systems I</p>
                    <p>ICS 332 - Operating Systems</p>
                    <p>ICS 355 - Security and Trust I</p>
                  </Card.Description>
                </Card.Content>
              </Card>

              <Card fluid>
                <Card.Content>
                  <Card.Header>Previously Taken Courses</Card.Header>
                  <Card.Description>
                    <p>ICS 101 - Tools for the Info World</p>
                    <p>ICS 141 - Discrete Math for CS I</p>
                    <p>ICS 211 - Intro to Computer Science II</p>
                    <p>ICS 212 - Program Structure</p>
                    <p>ICS 222 - Basic Concepts of Comp. Sci.</p>
                    <p>ICS 241 - Discrete Mathematics II</p>
                    <p>ICS 311 - Algorithms</p>
                    <p>ICS 312 - Machine-Lvl & Systems Programming</p>
                  </Card.Description>
                </Card.Content>
              </Card>

              <Card fluid>
                <Card.Content>
                  <Card.Header>Highly Skilled In</Card.Header>

                  <Card.Description>
                    <p>Programming Languages: HTML/CSS, C, C++, Python, Javascript</p>
                  </Card.Description>
                </Card.Content>
              </Card>

              <Card fluid>
                <Card.Content>
                  <Card.Header>Needs Help With</Card.Header>

                  <Card.Description>
                    <p>ICS 332 - Operating Systems</p>
                    <p>ICS 355 - Security and Trust I</p>
                  </Card.Description>
                </Card.Content>
              </Card>
            </Card.Group>
          </Grid.Column>

          <Grid.Column width={3}>
            <h3>Interests</h3>
            <Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' />
            <Divider clearing />
            <Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' />
            <Divider clearing />
            <Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' />
            <Divider clearing />
            <Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' />
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

export default UserProfile;

import React from 'react';
import { Container, Card, Button, Divider } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
      <Container id='landing-page' verticalAlign='middle' textAlign='center'>

        <Divider hidden/>

        <h1>Collaboration and learning all in one place.</h1>

        <Divider hidden/>

        <Button basic color='green' content='green'>Sign Up</Button>

        <Divider hidden/>

        <Card.Group>
          <Card fluid>
            <Card.Content>
              <Card.Header>Networking Made Easy</Card.Header>
              <Card.Description>
                <p>
                  Sign up and create a profile!
                </p>
                <p>
                  Meet fellow University of Hawaii at Manoa students through live study sessions now.
                </p>
              </Card.Description>
            </Card.Content>
          </Card>

          <Divider hidden/>

          <Card fluid>
            <Card.Content>
              <Card.Header>Gain Points and Earn Rewards</Card.Header>
              <Card.Description>
                <p>
                  Become a sensei or grasshopper and earn rewards!
                </p>
                <p>
                  By participating in study sessions, you can gain points and fun rewards. The more points you receive, the better the reward!
                </p>
              </Card.Description>
            </Card.Content>
          </Card>

          <Divider hidden/>

          <Card fluid>
            <Card.Content>
              <Card.Header>Live Study Sessions</Card.Header>

              <Card.Description>
                <p>
                  Need help? Want company and motivation? Study with fellow students that are enrolled in the same classes!
                </p>
                <p>
                  Schedule study sessions in advance or start collaborating with students ASAP!
                </p>
                <p>
                  Collaborative learning has never been easier.
                </p>

                <Divider hidden/>

                <Button basic color='green' content='green'>Start Collaborating</Button>

              </Card.Description>
            </Card.Content>
          </Card>
        </Card.Group>
      </Container>
    );
  }
}

export default Landing;

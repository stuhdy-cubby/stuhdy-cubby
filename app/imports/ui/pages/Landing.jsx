import React from 'react';
import { Container, Card, Button, Divider, Grid } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
      <div>
        <div className='landing-page-background'>
          <Divider hidden/>
          <Divider hidden/>
          <Divider hidden/>
          <Divider hidden/>
          <Divider hidden/>

          <h1>Collaboration and learning all in one place.</h1>

          <Divider hidden/>

          <Button as={ NavLink } exact to="/signup" size='large' color='teal'>Start Collaborating</Button>

          <Divider hidden/>
        </div>
        <Container verticalAlign='middle' id='landing-page'>
          <Divider hidden/>
          <Divider hidden/>
          <Grid columns='two'>
            <Grid.Row>
              <Grid.Column>
                <Card fluid>
                  <Card.Content>
                    <Card.Header textAlign='center'>Networking Made Easy</Card.Header>
                    <Card.Description>
                      <ul>
                        <li>Meet fellow students through live work and study sessions now!</li>
                        <li>Schedule one or more sessions to start collaborating and growing your network!</li>
                      </ul>
                    </Card.Description>
                  </Card.Content>
                </Card>
              </Grid.Column>

              <Grid.Column>
                <Card fluid>
                  <Card.Content>
                    <Card.Header textAlign='center'>Gain Points and Earn Rewards</Card.Header>
                    <Card.Description>
                      <ul>
                        <li>Become a sensei or grasshopper and earn rewards!</li>
                        <li>By participating in study sessions, you can gain points and fun rewards. The more points you receive, the better the reward!</li>
                      </ul>
                    </Card.Description>
                  </Card.Content>
                </Card>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Divider hidden />
          <Divider hidden />
        </Container>
      </div>
    );
  }
}

export default Landing;

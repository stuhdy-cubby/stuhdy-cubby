import React from 'react';
import { Container, Card, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
/* import { SessionsCourses } from '../../api/sessions/SessionsCourses'; */
/* import { SessionsProfiles } from '../../api/sessions/SessionsProfiles'; */

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
export default class Session extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (
      <Container>
        <Card.Group>
          <Card>
            <Card.Header>
              <Header as={'h1'}>Session Topic:</Header>
            </Card.Header>
            <Card.Content>
              <strong>Location:</strong> ICSpace<br/>
              <strong>Session Time and Date:</strong> 04/15/2021 5 PM
            </Card.Content>
            <Card.Content>
              <Header as={'h5'}>Participants</Header>
              <Link to={'/session'}>Register for session</Link>
            </Card.Content>
          </Card>
          <Card>
            <Card.Header>
              <Header as={'h1'}>Session Topic:</Header>
            </Card.Header>
            <Card.Content>
              <strong>Location:</strong> ICSpace<br/>
              <strong>Session Time and Date:</strong> 04/16/2021 9 AM
            </Card.Content>
            <Card.Content>
              <Header as={'h5'}>Participants</Header>
              <Link to={'/session'}>Register for session</Link>
            </Card.Content>
          </Card>
          <Card>
            <Card.Header>
              <Header as={'h1'}>Session Topic:</Header>
            </Card.Header>
            <Card.Content>
              <strong>Location:</strong> ICSpace<br/>
              <strong>Session Time and Date:</strong> 04/30/2021 2 PM
            </Card.Content>
            <Card.Content>
              <Header as={'h5'}>Participants</Header>
              <Link to={'/session'}>Register for session</Link>
            </Card.Content>
          </Card>
        </Card.Group>

      </Container>
    );
  }
}

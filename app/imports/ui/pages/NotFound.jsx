import React from 'react';
import { Container, Divider, Icon } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class NotFound extends React.Component {
  render() {
    return (
      <Container id='landing-page' verticalAlign='middle' textAlign='center'>

        <Divider hidden/>

        <Icon name='thumbs down' size='huge' />

        <h1>404</h1>

        <Divider hidden/>

        <p>Whoops! Page not found.</p>

      </Container>
    );
  }
}

export default NotFound;

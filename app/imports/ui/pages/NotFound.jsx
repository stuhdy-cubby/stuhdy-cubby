import React from 'react';
import { Container, Divider, Icon } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class NotFound extends React.Component {
  render() {
    return (
      <Container id='not-found' verticalAlign='middle' textAlign='center'>
        <Divider hidden />
        <Divider hidden />
        <Icon name='frown outline' size='massive'/>
        <h1>404</h1>
        <h2>Whoops! Page not found.</h2>
        <Divider hidden />
        <p>Looks like you broke the internet (just kidding). The page you are trying to access does not exist.</p>
        <Divider hidden />
      </Container>
    );
  }
}

export default NotFound;

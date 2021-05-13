import React from 'react';
import { Container, Divider, Icon } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Deactivate extends React.Component {
  render() {
    return (
      <Container id='deactivate' verticalAlign='middle' textAlign='center'>
        <Divider hidden />
        <Divider hidden />
        <Icon name='frown outline' size='massive'/>
        <h1>Account Deactivated</h1>
        <p>Your account has been deactivated. Thank you for using stUHdy cubby!</p>
        <Divider hidden />
      </Container>
    );
  }
}

export default Deactivate;

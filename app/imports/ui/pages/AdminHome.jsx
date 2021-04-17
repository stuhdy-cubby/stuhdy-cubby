import React from 'react';
import { Table, Container, Button, Divider } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class AdminHome extends React.Component {
  render() {
    return (
      <Container id="user-profile">
        <h1>My Sessions</h1>
        <p>List of all your current and past sessions.</p>
        <Button color='blue'>Add Session</Button>
        <Table striped singleLine selectable color='blue'>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Session</Table.HeaderCell>
              <Table.HeaderCell>Description</Table.HeaderCell>
              <Table.HeaderCell>Sensei</Table.HeaderCell>
              <Table.HeaderCell>Students</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell>Session 1</Table.Cell>
              <Table.Cell>September 14, 2013</Table.Cell>
              <Table.Cell>Jane Doe</Table.Cell>
              <Table.Cell>15</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Session 2</Table.Cell>
              <Table.Cell>January 11, 2014</Table.Cell>
              <Table.Cell>Jamie Harington</Table.Cell>
              <Table.Cell>17</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>

        <Divider hidden/>
        <Divider clearing/>

        <h1>All Sessions</h1>
        <p>List of all current and past sessions.</p>
        <Table striped singleLine selectable color='brown'>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Session</Table.HeaderCell>
              <Table.HeaderCell>Description</Table.HeaderCell>
              <Table.HeaderCell>Sensei</Table.HeaderCell>
              <Table.HeaderCell>Students</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell>Session 1</Table.Cell>
              <Table.Cell>September 14, 2013</Table.Cell>
              <Table.Cell>Jane Doe</Table.Cell>
              <Table.Cell>15</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Session 2</Table.Cell>
              <Table.Cell>January 11, 2014</Table.Cell>
              <Table.Cell>Jamie Harington</Table.Cell>
              <Table.Cell>17</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Container>
    );
  }
}

export default AdminHome;

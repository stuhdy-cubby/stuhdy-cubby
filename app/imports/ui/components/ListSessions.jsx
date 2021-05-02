import React from 'react';
import { Card, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class ListSessions extends React.Component {
  render() {
    return (
        <Card.Group>
          <Card>
            <Card.Content>
              <Card.Header>{this.props.sessions.topic}</Card.Header>
              <Card.Meta>{this.props.sessions.course}</Card.Meta>
              <Card.Meta>{this.props.sessions.location}</Card.Meta>
              <Card.Description>{this.props.sessions.sessionNotes}</Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Button basic color='green' id="register-form-button">
                <Link to={`/registersession/${this.props.sessions._id}`}>Register</Link>
              </Button>
            </Card.Content>
          </Card>
        </Card.Group>

        // <Table.Row>
        //   <Table.Cell>{this.props.sessions.topic}</Table.Cell>
        // <Table.Cell>{this.props.sessions.course}</Table.Cell>
        // <Table.Cell>{this.props.sessions.location}</Table.Cell>
        // <Table.Cell>{this.props.sessions.sessionNotes}</Table.Cell>
        // <Table.Cell>
        //  <Link to={`/registersession/${this.props.sessions._id}`}>Register</Link>
        // </Table.Cell>
        // </Table.Row>
    );
  }
}

// Require a document to be passed to this component.
ListSessions.propTypes = {
  sessions: PropTypes.shape({
    topic: PropTypes.string,
    course: PropTypes.string,
    location: PropTypes.string,
    sessionDate: PropTypes.instanceOf(Date),
    sessionNotes: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(ListSessions);

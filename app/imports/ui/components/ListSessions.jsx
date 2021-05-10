import React from 'react';
import { Card, Button, Feed, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import moment from 'moment';
import SessionsProfiles from './SessionsProfiles';

/** Renders a single row in the List Sessions table. See pages/ListSessionsPage.jsx. */
class ListSessions extends React.Component {
  render() {
    return (
      <Card>
        <Card.Content>
          <Card.Header>{this.props.sessions.topic}</Card.Header>
          <Card.Meta>{this.props.sessions.course}</Card.Meta>
          <Card.Meta>{this.props.sessions.location}</Card.Meta>
          <Card.Meta>
            {moment.utc(this.props.sessions.sessionDate).format('MM-DD-YYYY HH:mm A')}

          </Card.Meta>
          <Card.Description>{this.props.sessions.sessionNotes}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Header as={'h5'}>
                Session created by: {this.props.sessions.owner}
          </Header>
        </Card.Content>
        <Card.Content extra>
              Participants
          <Feed>
            {this.props.sessionsProfiles.map((p, index) => <SessionsProfiles key={index} sessionsProfiles={p} />)}
          </Feed>
        </Card.Content>
        <Card.Content extra>
          <Button basic color='green'>
            <Link to={`/registersession/${this.props.sessions._id}`}>Register</Link>
          </Button>
        </Card.Content>
      </Card>
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
    owner: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
  sessionsProfiles: PropTypes.array.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(ListSessions);

import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import moment from 'moment';

/** Renders a single row in the List Sessions admin table. See pages/AdminHome.jsx. */
class ListSessionsAdmin extends React.Component {
  render() {
    return (
      <Table.Row>
        <Table.Cell>{this.props.sessions.course}</Table.Cell>
        <Table.Cell>{this.props.sessions.topic}</Table.Cell>
        <Table.Cell>{moment.utc(this.props.sessions.sessionDate).format('MM-DD-YYYY hh:mm A')}</Table.Cell>
        <Table.Cell>{this.props.sessions.location}</Table.Cell>
        <Table.Cell>{this.props.sessions.owner}</Table.Cell>
      </Table.Row>
    );
  }
}

// Require a document to be passed to this component.
ListSessionsAdmin.propTypes = {
  sessions: PropTypes.shape({
    topic: PropTypes.string,
    course: PropTypes.string,
    location: PropTypes.string,
    owner: PropTypes.string,
    sessionNotes: PropTypes.string,
    sessionDate: PropTypes.instanceOf(Date),
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(ListSessionsAdmin);

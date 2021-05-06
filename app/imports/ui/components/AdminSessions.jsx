import React from 'react';
import { Table } from 'semantic-ui-react';
import { _ } from 'meteor/underscore';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class AdminSessions extends React.Component {
  render() {
    return (
      <Table.Row>
        {_.map(this.props.sessions, (s) => <Table.Cell id={s}>{s.course}</Table.Cell>)}
        {_.map(this.props.sessions, (s) => <Table.Cell id={s}>{s.topic}</Table.Cell>)}
        {_.map(this.props.sessions, (s) => <Table.Cell id={s}>{s.location}</Table.Cell>)}
        {_.map(this.props.sessions, (s) => <Table.Cell id={s}>{s.owner}</Table.Cell>)}
      </Table.Row>
    );
  }
}

// Require a document to be passed to this component.
AdminSessions.propTypes = {
  sessions: PropTypes.shape({
    topic: PropTypes.string,
    course: PropTypes.string,
    location: PropTypes.string,
    owner: PropTypes.string,
    sessionNotes: PropTypes.string,
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(AdminSessions);

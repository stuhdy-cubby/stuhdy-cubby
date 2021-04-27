import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';

/** Renders a single row in the List Stuff (Admin) table. See pages/ListStuffAdmin.jsx. */
class StuffItemAdmin extends React.Component {
  render() {
    return (
      <Table.Row>
        <Table.Cell>{this.props.sessions.topic}</Table.Cell>
        <Table.Cell>{this.props.sessions.course}</Table.Cell>
        <Table.Cell>{this.props.sessions.owner}</Table.Cell>
      </Table.Row>
    );
  }
}

// Require a document to be passed to this component.
StuffItemAdmin.propTypes = {
  sessions: PropTypes.shape({
    topic: PropTypes.string,
    course: PropTypes.string,
    _id: PropTypes.string,
    owner: PropTypes.string,
  }).isRequired,
};

export default StuffItemAdmin;

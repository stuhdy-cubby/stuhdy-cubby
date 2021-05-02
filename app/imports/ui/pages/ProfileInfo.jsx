import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class ProfileInfo extends React.Component {
  render() {
    return (
      <Card.Group>
        <Card>
          <Card.Content>
            <Image floated='right' circular src={this.props.profiles.picture} />
            <Card.Header>{this.props.profiles.firstName} {this.props.profiles.lastName}</Card.Header>
            <Card.Meta>{this.props.profiles.email}</Card.Meta>
            <Card.Meta>{this.props.profiles.institution}</Card.Meta>
            <Card.Meta>{this.props.profiles.major}</Card.Meta>
            <Card.Meta>{this.props.profiles.standing}</Card.Meta>
            <Card.Description>{this.props.profiles.bio}</Card.Description>
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
ProfileInfo.propTypes = {
  profiles: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    institution: PropTypes.string,
    major: PropTypes.string,
    standing: PropTypes.string,
    bio: PropTypes.string,
    picture: PropTypes.object,
    _id: PropTypes.string,
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(ProfileInfo);

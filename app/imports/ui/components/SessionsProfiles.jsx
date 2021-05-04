import React from 'react';
import { Feed } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Feed for participants in the sessions. See ./SessionsProfiles.jsx */
class SessionsProfiles extends React.Component {
  render() {
    return (
      <Feed.Event>
        <Feed.Content>
          <Feed.Summary>
            {this.props.sessionsProfiles.profile}
          </Feed.Summary>
        </Feed.Content>
      </Feed.Event>
    );
  }
}

// Require a document to be passed to this component.
SessionsProfiles.propTypes = {
  sessionsProfiles: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(SessionsProfiles);

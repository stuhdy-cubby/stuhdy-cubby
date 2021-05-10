import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Header, Loader, Container, Card } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { Profiles } from '../../api/profiles/Profiles';
import { Courses } from '../../api/courses/Courses';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListCoursesPage extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <div className='listcourses-background'>
        <Container id="course-list">

          <Header as='h1' textAlign="center" color='yellow'>
              Courses
          </Header>

          <Card.Group itemsPerRow={6}>

            {_.map(this.props.courses, (c) => <Card key={c._id}>
              <Card.Content>
                <Card.Header>{c.name} - {c.description}</Card.Header>
              </Card.Content>
              <Card.Content extra>
                        Sensei
                {this.props.profiles.senseicourses}
              </Card.Content>
            </Card>)}

          </Card.Group>

        </Container>
      </div>
    );
  }
}

// Require an array of Stuff documents in the props.
ListCoursesPage.propTypes = {
  profiles: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to profiles and courses
  const sub1 = Meteor.subscribe(Profiles.userPublicationName);
  const sub2 = Meteor.subscribe(Courses.userPublicationName);
  // Determine if the subscription is ready
  const ready = sub1.ready() && sub2.ready();

  const profiles = Profiles.collection.find({}).fetch();
  const courses = Courses.collection.find({}).fetch();
  return {
    profiles,
    courses,
    ready,
  };
})(ListCoursesPage);

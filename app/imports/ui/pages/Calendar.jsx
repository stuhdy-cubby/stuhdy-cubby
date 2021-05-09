import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import swal from 'sweetalert';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import moment from 'moment';
import { _ } from 'meteor/underscore';
import { Container, Loader } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { SessionsCourses } from '../../api/sessions/SessionsCourses';

class Calendar extends React.Component {
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    // const allEvents = this.props.sessions.map((s) => [{ title: s.topic, start: '2021-04-10', allDay: false }]);
    const k = this.props.sessions;
    const allEvents = _.map(_.keys(k), function (keys) {
      return {
        title: `${k[keys].topic}\n${k[keys].course}`,
        start: moment.utc(k[keys].sessionDate).format('YYYY-MM-DD HH:mm'),
        allDay: false,
        url: `/registersession/${k[keys]._id}`,
      };
    });
    console.log(allEvents);
    return (
        <div className='calendar'>
      <Container id="calendar">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          eventColor='#378006'
          events={allEvents}
          eventClick={function (info) {
            info.jsEvent.preventDefault();
            swal(`Register for Session:\n${info.event.title}`,
              {
                buttons: {
                  register: {
                    text: 'Register',
                    value: 'register',
                  },
                  ok: true,
                },
              })
              .then((value) => {
                if (value === 'register' && info.event.url) {
                  window.location.href = `#${info.event.url}`;
                }
              });
          }}
        />
      </Container>
        </div>
    );
  }
}

Calendar.propTypes = {
  sessions: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  // Get access to SessionsCourses documents.
  const subscription = Meteor.subscribe(SessionsCourses.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the sessions documents
  const sessions = SessionsCourses.collection.find({}).fetch();
  return {
    sessions,
    ready,
  };
})(Calendar);

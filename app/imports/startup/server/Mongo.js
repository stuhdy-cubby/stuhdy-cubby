import { Meteor } from 'meteor/meteor';
import { Profiles } from '../../api/profiles/Profiles';
import { Courses } from '../../api/courses/Courses';
import { Sessions } from '../../api/sessions/Sessions';

/* eslint-disable no-console */

// Initialize the database with a default data document.
function addCourse(data) {
  console.log(`  Adding course: ${data.name} `);
  Courses.collection.insert(data);
}

function addSession(data) {
  console.log(`  Adding session: ${data.topic} `);
  Sessions.collection.insert(data);
}

function addProfile(data) {
  console.log(`  Adding profile: ${data.email} `);
  Profiles.collection.insert(data);
}

// Initialize the Collections if empty.
if (Courses.collection.find().count() === 0) {
  if (Meteor.settings.defaultCourses) {
    console.log('Creating default course.');
    Meteor.settings.defaultCourses.map(data => addCourse(data));
  }
}

if (Sessions.collection.find().count() === 0) {
  if (Meteor.settings.defaultSessions) {
    console.log('Creating default sessions.');
    Meteor.settings.defaultSessions.map(data => addSession(data));
  }
}

if (Profiles.collection.find().count() === 0) {
  if (Meteor.settings.defaultProfiles) {
    console.log('Creating default profiles.');
    Meteor.settings.defaultProfiles.map(data => addProfile(data));
  }
}

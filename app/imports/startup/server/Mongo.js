import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { Courses } from '../../api/courses/Courses';
import { Sessions } from '../../api/sessions/Sessions';

/* eslint-disable no-console */

// Initialize the database with a default data document.
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.collection.insert(data);
}

function addCourse(data) {
  console.log(`  Adding course: ${data.name} `);
  Courses.collection.insert(data);
}

function addSession(data) {
  console.log(`  Adding session: ${data.topic} `);
  Sessions.collection.insert(data);
}

// Initialize the StuffsCollection if empty.
if (Stuffs.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.map(data => addData(data));
  }
}

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

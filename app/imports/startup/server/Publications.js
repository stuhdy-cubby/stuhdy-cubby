import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Stuffs } from '../../api/stuff/Stuff';
import { Courses } from '../../api/courses/Courses';
import { Profiles } from '../../api/profiles/Profiles';
import { ProfilesCourses } from '../../api/profiles/ProfilesCourses';
import { ProfilesPoints } from '../../api/profiles/ProfilesPoints';
import { Sessions } from '../../api/sessions/Sessions';
import { SessionsCourses } from '../../api/sessions/SessionsCourses';
import { SessionsProfiles } from '../../api/sessions/SessionsProfiles';

/** Define a publication to publish all courses. */
Meteor.publish(Courses.userPublicationName, () => Courses.collection.find());

/** Define a publication to publish all profiles. */
Meteor.publish(Profiles.userPublicationName, () => Profiles.collection.find());

/** Define a publication to publish this collection. */
Meteor.publish(ProfilesCourses.userPublicationName, () => ProfilesCourses.collection.find());

/** Define a publication to publish this collection. */
Meteor.publish(ProfilesPoints.userPublicationName, () => ProfilesPoints.collection.find());

/** Define a publication to publish all sessions. */
Meteor.publish(Sessions.userPublicationName, () => Sessions.collection.find());

/** Define a publication to publish this collection. */
Meteor.publish(SessionsCourses.userPublicationName, () => SessionsCourses.collection.find());

/** Define a publication to publish this collection. */
Meteor.publish(SessionsProfiles.userPublicationName, () => SessionsProfiles.collection.find());

// User-level publication.
// If logged in, then publish documents owned by this user. Otherwise publish nothing.
Meteor.publish(Stuffs.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Stuffs.collection.find({ owner: username });
  }
  return this.ready();
});

Meteor.publish(SessionsCourses.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return SessionsCourses.collection.find({ owner: username });
  }
  return this.ready();
});

// Admin-level publication.
// If logged in and with admin role, then publish all documents from all users. Otherwise publish nothing.
Meteor.publish(Stuffs.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Stuffs.collection.find();
  }
  return this.ready();
});

Meteor.publish(SessionsCourses.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return SessionsCourses.collection.find();
  }
  return this.ready();
});

// alanning:roles publication
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});

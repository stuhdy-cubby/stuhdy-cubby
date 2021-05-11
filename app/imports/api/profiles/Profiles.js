import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/**
 * The ProfilesCollection. It encapsulates state and variable values for profile.
 */

const ProfileDataValues = {
  interests: ['Art', 'Culinary Arts', 'Music', 'Athletics', 'Creative Media', 'Technology', 'Other'],
  skills: ['Javascript', 'Java', 'HTML', 'CSS', 'C', 'C++', 'Other'],
  courses: ['ICS 101', 'ICS 111', 'ICS 141', 'ICS 211', 'ICS 212', 'ICS 222', 'ICS 241',
    'ICS 311', 'ICS 312', 'ICS 314', 'ICS 321', 'ICS 332', 'ICS 355', 'ICS 361', 'ICS 390',
    'ICS 414', 'ICS 422', 'ICS 425', 'ICS 427', 'ICS 435', 'ICS 451', 'ICS 461', 'ICS 464', 'ICS 485'],
};

class ProfilesCollection {
  constructor() {
    // The name of this collection.
    this.name = 'ProfilesCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      email: { type: String, index: true, unique: true, optional: true },
      firstName: { type: String, optional: true },
      lastName: { type: String, optional: true },
      bio: { type: String, optional: true },
      picture: { type: String, optional: true },
      points: { type: Number, optional: true },
      institution: {
        type: String,
        allowedValues: ['University of Hawaii at Manoa', 'University of Hawaii West Oahu'],
        optional: true },
      major: {
        type: String,
        allowedValues: ['Computer Science', 'Computer Engineering'],
        optional: true },
      standing: {
        type: String,
        allowedValues: ['Freshman', 'Sophomore', 'Junior', 'Senior', 'Other'],
        optional: true },
      interests: { type: Array, optional: true },
      'interests.$': { type: String, allowedValues: ProfileDataValues.interests },
      // enrolledCourses: { type: String },
      // previouslyEnrolledCourses: { type: String },
      skills: { type: Array, optional: true },
      'skills.$': { type: String, allowedValues: ProfileDataValues.skills },
      senseicourses: { type: Array, optional: true },
      'senseicourses.$': { type: String, allowedValues: ProfileDataValues.courses },
      grasshoppercourses: { type: Array, optional: true },
      'grasshoppercourses.$': { type: String, allowedValues: ProfileDataValues.courses },
    }, { tracker: Tracker });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the ProfilesCollection.
 * @type {ProfilesCollection}
 */
export const Profiles = new ProfilesCollection();

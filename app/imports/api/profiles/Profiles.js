import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/**
 * The ProfilesCollection. It encapsulates state and variable values for profile.
 */
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
      interests: {
        type: String,
        optional: true,
      },
      // enrolledCourses: { type: String },
      // previouslyEnrolledCourses: { type: String },
      skills: {
        type: String,
        optional: true,
      },
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

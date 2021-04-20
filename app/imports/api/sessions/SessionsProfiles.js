import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/**
 * The SessionsProfilesCollection. It encapsulates state and variable values for session profiles courses.
 */
class SessionsProfilesCollection {
  constructor() {
    // The name of this collection.
    this.name = 'SessionsProfilesCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      topic: String,
      course: String,
      profile: String,
      response: String,
    }, { tracker: Tracker });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the SessionsProfilesCollection.
 * @type {SessionsProfilesCollection}
 */
export const SessionsProfiles = new SessionsProfilesCollection();

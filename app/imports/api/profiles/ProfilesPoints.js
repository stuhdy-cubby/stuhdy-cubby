import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/**
 * The ProfilesPointsCollection. It encapsulates state and variable values for profile points.
 */
class ProfilesPointsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'ProfilesPointsCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      profile: String,
      session: String,
      points: { type: Number, optional: true },
    }, { tracker: Tracker });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the ProfilesPointsCollection.
 * @type {ProfilesPointsCollection}
 */
export const ProfilesPoints = new ProfilesPointsCollection();

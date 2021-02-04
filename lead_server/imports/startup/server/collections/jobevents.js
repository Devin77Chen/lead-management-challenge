import { Collections } from '../utils/consts/collections';

// Initialise the job events collection
const JobEvents = new Mongo.Collection(Collections.JOB_EVENTS);

// Deny insert, update and remove operations syncs from clients.
JobEvents.deny({
     insert() { return true; }, 
     update() { return true; }, 
     remove() { return true; } 
});

export { JobEvents };
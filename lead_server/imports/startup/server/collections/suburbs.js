import { Collections } from '../utils/consts/collections';

// Initialise the suburbs collection
const Suburbs = new Mongo.Collection(Collections.SUBURBS);

// Deny insert, update and remove operations syncs from clients.
Suburbs.deny({
     insert() { return true; }, 
     update() { return true; }, 
     remove() { return true; } 
});

export { Suburbs };
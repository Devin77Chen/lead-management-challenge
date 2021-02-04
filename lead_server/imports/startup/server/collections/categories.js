import { Collections } from '../utils/consts/collections';

// Initialise the categories collection
const Categories = new Mongo.Collection(Collections.CATEGORIES);

// Deny insert, update and remove operations syncs from clients.
Categories.deny({
     insert() { return true; }, 
     update() { return true; }, 
     remove() { return true; } 
});

export { Categories };
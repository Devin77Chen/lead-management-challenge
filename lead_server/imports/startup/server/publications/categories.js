import { Meteor } from 'meteor/meteor';
import { Publications } from '../utils/consts/publications';
import { JobEvents } from '../collections/jobEvents';
import { Categories } from '../collections/categories';
// User is used to mock a logged-in user
import User from '../dataset/user';

Meteor.publish(Publications.MY_CATEGORIES, function() {
    if (!User) return new Error("Please login to perform the operation.");
    // TODO only get categoriesIDs from the jobs that the user is interested in
    const categoriesIDs = JobEvents.find().map(({ data }) => {
        const { category_id } = data || {};
        return category_id;
    })
    console.log(`Subscribing ${Publications.MY_CATEGORIES}`);
    return Categories.find({ _id: { $in: categoriesIDs }  });;
});

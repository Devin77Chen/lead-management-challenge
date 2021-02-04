import { Meteor } from 'meteor/meteor';
import { Publications } from '../utils/consts/publications';
import { JobEvents } from '../collections/jobevents';
// User is used to mock a logged-in user
import User from '../dataset/user';

Meteor.publish(Publications.MY_JOB_EVENTS, function() {
    if (!User) return new Error("Please login to perform the operation.");
    // TODO only return the jobs that the user is interested in, filtered by categories or suburbs
    const categoriesIDs = JobEvents.find().map(({ data }) => {
        const { category_id } = data || {};
        return category_id;
    })
    return Categories.find({ _id: { $in: categoriesIDs }  });
});

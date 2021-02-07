import { Meteor } from 'meteor/meteor';
import { Publications } from '../utils/consts/publications';
import { JobEvents } from '../collections/jobEvents';
import { Suburbs } from '../collections/suburbs';
// User is used to mock a logged-in user
import User from '../dataset/user';

Meteor.publish(Publications.MY_SUBURBS, function() {
    if (!User) return new Error("Please login to perform the operation.");
    // TODO only get suburbsIDs from the jobs that the user is interested in
    const suburbsIDs = JobEvents.find().map(({ data }) => {
        const { suburb_id } = data || {};
        return suburb_id;
    })
    return Suburbs.find({ _id: { $in: suburbsIDs }  });;
});

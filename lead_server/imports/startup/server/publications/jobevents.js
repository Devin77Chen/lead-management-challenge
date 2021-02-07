// import { Meteor } from 'meteor/meteor';
// import { Publications } from '../utils/consts/publications';
// import { JobEvents } from '../collections/jobEvents';
// // User is used to mock a logged-in user
// import User from '../dataset/user';

// Meteor.publish(Publications.MY_JOB_EVENTS, function() {
//     if (!User) return new Error("Please login to perform the operation.");
//     // TODO only return the jobs that the user is interested in, filtered by categories or suburbs
//     // TODO pagination - use a variable to limit only returning the first [limit] of job events
//     console.log(`Subscribing ${Publications.MY_JOB_EVENTS}`);
//     return JobEvents.find({});
// });

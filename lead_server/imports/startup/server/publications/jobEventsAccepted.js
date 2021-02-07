import { Meteor } from 'meteor/meteor';
import { JobEvents } from '../collections/jobEvents';
import { Publications } from '../utils/consts/publications';
import { Views } from '../utils/consts/views';
import { Job_Status } from '../utils/consts/job_status';
import { buildAggregator } from 'meteor/lamoglia:publish-aggregation';
import user from '../dataset/user';

Meteor.publish(Publications.MY_ACCEPTED_JOB_EVENTS, buildAggregator(
    JobEvents, 
    () => {
        const { username } = user;
        console.log('subscribing MY_ACCEPTED_JOB_EVENTS', username);
        // TODO only return the jobs that the user is interested in, filtered by categories or suburbs
        // TODO pagination - use a variable to limit only returning the first [limit] of job events
        return [
            { 
                $match: {
                    author: username,   // ideally, this should be userID
                    'data.status': Job_Status.ACCEPTED
                } 
            },
            {
                $project: {
                    jobDetails: '$data',
                    timestamp: 1,
                    jid: 1
                }
            },
        ];
    }, 
    {
        collectionName: Views.JOB_EVENTS_ACCEPTED,
        republishOnChange: () => JobEvents.find({})
    })
);

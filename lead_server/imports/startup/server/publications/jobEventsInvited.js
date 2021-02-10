import { Meteor } from 'meteor/meteor';
import { JobEvents } from '../collections/jobEvents';
import { Publications } from '../utils/consts/publications';
import { Views } from '../utils/consts/views';
import { Job_Status } from '../utils/consts/job_status';
import { buildAggregator } from 'meteor/lamoglia:publish-aggregation';
import user from '../dataset/user';

Meteor.publish(Publications.MY_INVITED_JOB_EVENTS, buildAggregator(
    JobEvents, 
    () => {
        const { username } = user || {};
        // TODO pagination - use a variable to limit to only return the first [limit] of job events
        // My invited job events should be grouped from the events:
        // 1: Any events created by me
        // 1: Any events not created by me but not accepted by others, i.e. I am still intersted in events that declined by others
        return [
            {
                $match: {
                    $or: [
                        { author: username } ,
                        { author: { $ne: username }, 'data.status': { $in: [Job_Status.NEW, Job_Status.ACCEPTED] } }
                    ]
                }
            },
            { $sort: { timestamp: 1 } },
            {
                $group: {
                    _id: '$jid',
                    jobDetails: {
                        $mergeObjects: '$data'
                    },
                    timestamp: {
                        $last: '$timestamp'
                    },
                    jid: {
                        $first: '$jid'
                    }
                }
            },
            { $match: { 'jobDetails.status': Job_Status.NEW } }
        ];
    }, 
    {
        collectionName: Views.JOB_EVENTS_INVITED,
        republishOnChange: () => JobEvents.find({}) // TODO only query on jobs that the user is interested in. Pass in a selector to filter the results.
    })
);

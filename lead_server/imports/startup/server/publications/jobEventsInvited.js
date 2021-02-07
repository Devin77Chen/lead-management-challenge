import { Meteor } from 'meteor/meteor';
import { JobEvents } from '../collections/jobEvents';
import { Publications } from '../utils/consts/publications';
import { Views } from '../utils/consts/views';
import { Job_Status } from '../utils/consts/job_status';
import { buildAggregator } from 'meteor/lamoglia:publish-aggregation';

Meteor.publish(Publications.MY_INVITED_JOB_EVENTS, buildAggregator(
    JobEvents, 
    () => {
        console.log('subscribing MY_INVITED_JOB_EVENTS');
        // TODO only return the jobs that the user is interested in, filtered by categories or suburbs
        // TODO pagination - use a variable to limit only returning the first [limit] of job events
        return [
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
        republishOnChange: () => JobEvents.find({})
    })
);

import { Meteor } from 'meteor/meteor';
import { JobEvents } from '../collections/jobEvents';
import { Job_Status } from '../utils/consts/job_status';
import { Job_Event_Types } from '../utils/consts/job_event_types';
import { Error_Types } from '../utils/consts/error_types';
import { buildJobEvent } from '../utils/helpers/jobEvents';
import user from '../dataset/user';

Meteor.methods({
    acceptJob: async function(jid) {
        // The authentication process is not done in this demo,
        // A static user is used to mock a logged-in user 
        if (!user) throw new Meteor.Error(Error_Types.LOGGED_OUT, "Please login to perform the operation. [aj1]");
        const { username } = user;
        const jobCreateEvent = JobEvents.findOne({ jid, type: Job_Event_Types.CREATE });
        if (!jobCreateEvent) throw new Meteor.Error(Error_Types.INVALID_OPERATION, "Invalid operations. Please contact admins. [aj2]");
        // The job was already accepted by me or other tradies
        const jobAcceptEvent = JobEvents.findOne({ jid, type: Job_Event_Types.UPDATE, 'data.status': Job_Status.ACCEPTED });
        if (jobAcceptEvent) throw new Meteor.Error(Error_Types.JOB_ALREADY_ACCEPTED, "The job was already accepted.");
        const { data } = jobCreateEvent;
        const updatedData = { ...data, status: Job_Status.ACCEPTED };
        const event = buildJobEvent(jid, Job_Event_Types.UPDATE, updatedData, username, new Date());
        const insertJobEvent = new Promise((resolve, reject) => {
            JobEvents.insert(event, (err, result) => {
                if (err) {
                    reject(new Error(err));
                }
                resolve(result);
            })
        });
        let result;
        try {
            result = await insertJobEvent;
        } catch (err) {
            // Log the error to server console for debugging.
            console.log("Error inserting a job event err: ", err);
            // Instead of exposing the database error infomation to users, 
            // we return a generic error information with a number for us to retrieve the error
            throw new Meteor.Error(500, "Internal server error. Please contact admins. [aj3]")
        }
        return result;
    },
    declineJob: async function(jid) {
        // The authentication process is not done in this demo,
        // A static user is used to mock a logged-in user 
        if (!user) throw new Meteor.Error(Error_Types.LOGGED_OUT, "Please login to perform the operation. [aj1]");
        const { username } = user;
        const jobCreateEvent = JobEvents.findOne({ jid, type: Job_Event_Types.CREATE });
        if (!jobCreateEvent) throw new Meteor.Error(Error_Types.INVALID_OPERATION, "Invalid operations. Please contact admins. [aj2]");
        // The job was already declined by me
        const jobDeclineEvent = JobEvents.findOne({ jid, type: Job_Event_Types.UPDATE, 'data.status': Job_Status.DECLINED, username });
        if (jobDeclineEvent) throw new Meteor.Error(Error_Types.JOB_ALREADY_ACCEPTED, "The job was already declined.");
        const { data } = jobCreateEvent;
        const updatedData = { ...data, status: Job_Status.DECLINED };
        const event = buildJobEvent(jid, Job_Event_Types.UPDATE, updatedData, username, new Date());
        const insertJobEvent = new Promise((resolve, reject) => {
            JobEvents.insert(event, (err, result) => {
                if (err) {
                    reject(new Error(err));
                }
                resolve(result);
            })
        });
        let result;
        try {
            result = await insertJobEvent;
        } catch (err) {
            // Log the error to server console for debugging.
            console.log("Error inserting a job event err: ", err);
            // Instead of exposing the database error infomation to users, 
            // we return a generic error information with a number for us to retrieve the error
            throw new Meteor.Error(500, "Internal server error. Please contact admins. [aj3]")
        }
        return result;
    }
})
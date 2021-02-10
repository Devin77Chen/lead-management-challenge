import { Job_Event_Types } from '../consts/job_event_types';
import { Job_Status } from '../consts/job_status';
import { buildJobEvent } from './jobEvents';
// Every function has a single responsibility
// Dependencies are injected via function params makes unit testing possible

/**
 * Dump categories data into Categories collection
 * @param  {Object} Categories the Categories mongodb collection
 * @param  {Array} CategoriesArr the categories json data
 * @param  {function} log output logging messages
 * @param  {function} logError output error messages
 */
export const insertCategoriesData = (Categories, CategoriesArr, log, logError) => {
    const numberOfCategories = Categories.find().count();
    if (numberOfCategories > 0) return;
    Categories.rawCollection().insertMany(CategoriesArr)
        .then(() => {
            log(CategoriesArr.length + " Categories data are inserted.");
        })
        .catch(err => {
            logError("Error inserting categories data: " + err);
        });
}

/**
 * Dump suburbs data into Suburbs collection
 * @param  {Object} Suburbs the Suburbs mongodb collection
 * @param  {Array} SuburbsArr the suburbs json data
 * @param  {function} log output logging messages
 * @param  {function} logError output error messages
 */
export const insertSuburbsData = (Suburbs, SuburbsArr, log, logError) => {
    const numberOfSuburbs = Suburbs.find().count();
    if (numberOfSuburbs > 0) return;
    Suburbs.rawCollection().insertMany(SuburbsArr)
        .then(() => {
            log(SuburbsArr.length + " Suburbs data are inserted.");
        })
        .catch(err => {
            logError("Error inserting suburbs data: " + err);
        });
}

/**
 * Dump job events data into JobEvents collection
 * @param  {Object} JobEvents the JobEvents mongodb collection
 * @param  {Array} JobEventsArr the job events json data
 * @param  {function} log output logging messages
 * @param  {function} logError output error messages
 */
export const insertJobEventsData = (JobEvents, JobEventsArr, log, logError) => {
    const numberOfJobEvents = JobEvents.find().count();
    if (numberOfJobEvents > 0) return;
    JobEvents.rawCollection().insertMany(JobEventsArr)
        .then(() => {
            log(JobEventsArr.length + " JobEvents data are inserted.");
        })
        .catch(err => {
            logError("Error inserting job events data: " + err);
        });
}

/**
 * format job events with a given job list
 * @param  {array} jobs The job list
 */
export const buildJobEvents = (jobs = []) => {
    if (!Array.isArray(jobs) || jobs.length < 1) return [];
    return jobs.reduce((jobEvents, job) => {
        const {
            id: jid, 
            status, 
            suburb_id, 
            category_id, 
            contact_name, 
            contact_phone, 
            contact_email, 
            price, 
            description, 
            created_at, 
            updated_at 
        } = job || {};
        const data = {
            status: Job_Status.NEW,
            suburb_id,
            category_id,
            contact_name,
            contact_phone,
            contact_email,
            price,
            description
        };
        const jobEvent = buildJobEvent(jid, Job_Event_Types.CREATE, data, contact_name, created_at);
        return jobEvents.concat(jobEvent);
    }, []);
}
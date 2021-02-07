/**
 * format a job event
 * @param  {string} jid The job ID
 * @param  {string} type The job event type
 * @param  {object} data The job data
 * @param  {string} author The user name who creates the job event
 */
export const buildJobEvent = (jid, type, data, author) => {
    return {
        jid,
        type,
        data,
        author,
        timestamp: new Date()
    };
}

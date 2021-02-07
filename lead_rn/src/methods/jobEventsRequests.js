/**
 * accept the job, update the status to the server.
 * @param  {function} caller Request caller
 * @param  {string} name Method name
 * @param  {string} jid Job ID
 */
export const acceptJob = (caller, name, jid) => {
    caller(name, jid, (err, result) => {
        if (err) {
            // TODO handle accept job error gracefully with proper user interface
            console.log("acceptJob error", err);
        } else {
            // TODO show successful accept alert
            console.log(`Job ${jid} is accepted.`);
        }
    });
};

/**
 * decline the job, update the status to the server.
 * @param  {function} caller Request caller
 * @param  {string} name Method name
 * @param  {string} jid Job ID
 */
export const declineJob = (caller, name, jid) => {
    caller(name, jid, (err, result) => {
        if (err) {
            // TODO handle decline job error gracefully with proper user interface
            console.log("declineJob error", err);
        } else {
            // TODO show successful decline alert
            console.log(`Job ${jid} is declined.`);
        }
    });
};
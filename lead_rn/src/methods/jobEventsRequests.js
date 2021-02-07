/**
 * accept the job, update the status to the server.
 * @param  {function} caller Request caller
 * @param  {string} name Method name
 * @param  {string} jid Job ID
 */
export const acceptJob = (caller, name, jid, callback) => {
    caller(name, jid, (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
};

/**
 * decline the job, update the status to the server.
 * @param  {function} caller Request caller
 * @param  {string} name Method name
 * @param  {string} jid Job ID
 */
export const declineJob = (caller, name, jid, callback) => {
    caller(name, jid, (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
};
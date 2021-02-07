export const buildJobEvent = (jid, type, data, author) => {
    return {
        jid,
        type,
        data,
        author,
        timestamp: new Date()
    };
}

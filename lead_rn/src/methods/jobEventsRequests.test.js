import { Methods } from '@consts/methods';
import { acceptJob, declineJob } from "./jobEventsRequests";

describe("Methods - acceptJob test suite", () => {
    test("Call succeed - Given a job ID, it should return a new ID", done => {
        const jid = "1";
        const newID = "xasdsadx";
        const succeededRequest = jest.fn((name, jid, callback) => 
            callback(null, newID)
        );
        const expectedCallback = (err, result) => {
            expect(result).toBe(newID);
            done();
        };
        acceptJob(succeededRequest, Methods.ACCEPT_JOB, jid, expectedCallback);
    });
    test("Call failed - Given a job ID, it should return an error", done => {
        const jid = "1";
        const failedRequest = jest.fn((name, jid, callback) => 
            callback({ reason: '' })
        );
        const expectedCallback = (err, result) => {
            expect(err).toBeTruthy();
            done();
        };
        acceptJob(failedRequest, Methods.ACCEPT_JOB, jid, expectedCallback);
    });
});

describe("Methods - declineJob test suite", () => {
    test("Call succeed - Given a job ID, it should return a new ID", done => {
        const jid = "1";
        const newID = "xasdsadx";
        const succeededRequest = jest.fn((name, jid, callback) => 
            callback(null, newID)
        );
        const expectedCallback = (err, result) => {
            expect(result).toBe(newID);
            done();
        };
        declineJob(succeededRequest, Methods.DECLINE_JOB, jid, expectedCallback);
    });
    test("Call failed - Given a job ID, it should return an error", done => {
        const jid = "1";
        const failedRequest = jest.fn((name, jid, callback) => 
            callback({ reason: '' })
        );
        const expectedCallback = (err, result) => {
            expect(err).toBeTruthy();
            done();
        };
        declineJob(failedRequest, Methods.DECLINE_JOB, jid, expectedCallback);
    });
});

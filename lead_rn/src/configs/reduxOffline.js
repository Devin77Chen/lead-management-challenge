import { DeviceEventEmitter } from 'react-native';
import Meteor from 'react-native-meteor';
import offlineConfig from '@redux-offline/redux-offline/lib/defaults';
import { acceptJob, declineJob } from '@methods/jobEventsRequests';
import { Methods } from '@consts/methods';

const config = {
    ...offlineConfig,
    effect: (effect, action) => {
        const { type, payload } = action || {};
        const { lead } = payload || {};
        const { jid } = lead || {};
        switch(type) {
            case 'ACCEPT_LEAD':
                return acceptJob(Meteor.call, Methods.ACCEPT_JOB, jid);
            case 'DECLINE_LEAD':
                return declineJob(Meteor.call, Methods.DECLINE_JOB, jid);
            default:
                return;
        }
    },
    detectNetwork: callback => {
        DeviceEventEmitter.addListener('serverConnectionChange', isServerConnected => {
            return isServerConnected ? callback(true) : callback(false);
        })
    }
}

export default config;
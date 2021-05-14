import React, { useEffect } from 'react';
import { FlatList, DeviceEventEmitter } from 'react-native';
import { connect } from 'react-redux';
import Meteor, { withTracker } from 'react-native-meteor';
import { Container, Header, Body, Title } from 'native-base';
import PropTypes from 'prop-types';
import InvitedLeadCard from '@components/InvitedLeadCard';
import { Collections } from '@consts/collections';
import { Views } from '@consts/views';
import { Job_Event_Types } from '@consts/job_event_types';
import { buildLeads } from '@helpers/jobEventsViews';
import { acceptJob, declineJob } from '@methods/jobEventsRequests';
import { Methods } from '@consts/methods';
import store from '../../store';
import { uniqBy } from 'lodash';
function InvitedTabScreen({ leads, isServerConnected }) {
    console.log("🚀 ~ file: index.js ~ line 16 ~ InvitedTabScreen ~ leads", leads)
    useEffect(() => {
        DeviceEventEmitter.emit('serverConnectionChange', isServerConnected);
    }, [isServerConnected])

    return (
        <Container>
            <FlatList 
                data={leads}
                keyExtractor={({ jid }) => jid}
                renderItem={({ item = {}}) => {
                    const {
                        category,
                        contact_name_first,
                        created_at,
                        description,
                        jid,
                        price,
                        suburb,
                        isOffline
                    } = item || {};
                    const { name: category_name } = category || {};
                    const { name: suburb_name, postcode } = suburb || {};
                    return (
                        <InvitedLeadCard 
                            category_name={category_name}
                            contact_name={contact_name_first}
                            created_at={created_at}
                            description={description}
                            jid={jid}
                            price={price}
                            suburb_name={suburb_name}
                            postcode={postcode}
                            isOffline={isOffline}
                            onAcceptButtonPress={() => {
                                // Meteor.collection(Views.JOB_EVENTS_INVITED).remove({ jid });
                                store.dispatch({
                                    type: 'ACCEPT_LEAD',
                                    payload: { lead: item },
                                    meta: {
                                        offline: {
                                            effect: { URI: Methods.ACCEPT_JOB, method: 'METEOR' },
                                            commit: { type: 'ACCEPT_LEAD_COMMIT', meta: { jid } },
                                            rollback: { type: 'ACCEPT_LEAD_ROLLBACK', meta: { jid } }
                                        }
                                    }
                                })
                            }}
                        />
                    )
                }}
            />
        </Container>
    );
}

InvitedTabScreen.propTypes = {
    leads: PropTypes.array
}

const InvitedTabScreenContainer = withTracker(({ offlineAcceptedLeads }) => {
    const suburbs = Meteor.collection(Collections.SUBURBS).find();
    const categories = Meteor.collection(Collections.CATEGORIES).find();
    const invitedJobEvents = Meteor.collection(Views.JOB_EVENTS_INVITED).find({}, { sort: { timestamp: -1 } });
    const interimLeads = buildLeads(suburbs, categories, invitedJobEvents);
    const leads = uniqBy(offlineAcceptedLeads.concat(interimLeads), 'jid');
    return {
        leads: leads.map(lead => {
            if (offlineAcceptedLeads.map(({ jid }) => jid).includes(lead.jid)) {
                return { ...lead, isOffline: true }
            }
            return lead
        }),
        isServerConnected: Meteor.status().connected
    }
})(InvitedTabScreen);

const mapStateToProps = ({ offline }) => {
    const { outbox } = offline || {};
    return {
        offlineAcceptedLeads: outbox.reduce((offlineLeads, { type, payload }) => {
            const { lead } = payload || {};
            if (type === 'ACCEPT_LEAD') return offlineLeads.concat({ ...lead, isOffline: true })
            return offlineLeads;
        }, [])
    }
}

export default connect(mapStateToProps)(InvitedTabScreenContainer);

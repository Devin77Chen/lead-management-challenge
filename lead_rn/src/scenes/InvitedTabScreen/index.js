import React from 'react';
import { FlatList } from 'react-native';
import Meteor, { withTracker } from 'react-native-meteor';
import { Container, Header, Body, Title } from 'native-base';
import InvitedLeadCard from '@components/InvitedLeadCard';
import { Collections } from '@consts/collections';
import { Views } from '@consts/views';
import { Job_Event_Types } from '@consts/job_event_types';
import { buildLeads } from '@helpers/jobEventsViews';

function InvitedTabScreen({ leads }) {
    console.log("🚀 ~ file: index.js ~ line 9 ~ InvitedTabScreen ~ leads", leads)
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
                        suburb
                    } = item || {};
                    console.log("🚀 ~ file: index.js ~ line 26 ~ InvitedTabScreen ~ contact_name_firstxx", contact_name_first)
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
                        />
                    )
                }}
            />
        </Container>
    );
}

export default withTracker(() => {
    const suburbs = Meteor.collection(Collections.SUBURBS).find();
    const categories = Meteor.collection(Collections.CATEGORIES).find();
    const invitedJobEvents = Meteor.collection(Views.JOB_EVENTS_INVITED).find();
    const leads = buildLeads(suburbs, categories, invitedJobEvents);
    return {
        leads
    }
})(InvitedTabScreen);
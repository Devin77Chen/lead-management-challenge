import React from 'react';
import { connect } from 'react-redux';
import { FlatList } from 'react-native';
import Meteor, { withTracker } from 'react-native-meteor';
import { Container } from 'native-base';
import PropTypes from 'prop-types';
import AcceptedLeadCard from '@components/AcceptedLeadCard';
import { Collections } from '@consts/collections';
import { Views } from '@consts/views';
import { buildLeads } from '@helpers/jobEventsViews';

function AcceptedTabScreen({ leads }) {
    console.log("🚀 ~ file: index.js ~ line 13 ~ AcceptedTabScreen ~ leads", leads)
    return (
        <Container>
            <FlatList 
                data={leads}
                keyExtractor={({ jid }) => jid}
                renderItem={({ item = {}}) => {
                    const {
                        category,
                        contact_name,
                        created_at,
                        description,
                        jid,
                        price,
                        suburb,
                        contact_phone,
                        contact_email,
                        isOffline
                    } = item || {};
                    const { name: category_name } = category || {};
                    const { name: suburb_name, postcode } = suburb || {};
                    return (
                        <AcceptedLeadCard 
                            category_name={category_name}
                            contact_name={contact_name}
                            created_at={created_at}
                            description={description}
                            jid={jid}
                            price={price}
                            suburb_name={suburb_name}
                            postcode={postcode}
                            contact_phone={contact_phone}
                            contact_email={contact_email}
                            isOffline={isOffline}
                        />
                    )
                }}
            />
        </Container>
    );
}

AcceptedTabScreen.propTypes = {
    leads: PropTypes.array
}

const AcceptedTabScreenContainer = withTracker(({ offlineAcceptedLeads }) => {
    const suburbs = Meteor.collection(Collections.SUBURBS).find();
    const categories = Meteor.collection(Collections.CATEGORIES).find();
    const acceptedJobEvents = Meteor.collection(Views.JOB_EVENTS_ACCEPTED).find({}, { sort: { timestamp: -1 } });
    const leads = buildLeads(suburbs, categories, acceptedJobEvents);
    return {
        leads: offlineAcceptedLeads.concat(leads)
    }
})(AcceptedTabScreen);

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

export default connect(mapStateToProps)(AcceptedTabScreenContainer);
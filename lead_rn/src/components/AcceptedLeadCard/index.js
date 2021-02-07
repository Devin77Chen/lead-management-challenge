import React from 'react';
import { Card, CardItem, Body, Text, View } from 'native-base';
import PropTypes from 'prop-types';
import AvatarNameTime from '../InvitedLeadCard/AvatarNameTime';
import SuburbPostcode from '../InvitedLeadCard/SuburbPostcode';
import JobCategory from '../InvitedLeadCard/JobCategory';
import JobID from '../InvitedLeadCard/JobID';
import JobDescription from '../InvitedLeadCard/JobDescription';
import Email from './Email';
import Phone from './Phone';
import themes from '@themes';


function AcceptedLeadCard({
    jid,
    category_name,
    contact_name,
    created_at,
    description,
    price,
    suburb_name,
    postcode,
    contact_email,
    contact_phone
}) {
    return (
        <Card style={themes.card}>
            <AvatarNameTime name={contact_name} time={created_at} />
            <CardItem bordered>
                <Body>
                    <View style={{ ...themes.row }}>
                        <SuburbPostcode suburb={suburb_name} postcode={postcode} />
                        <JobCategory categoryName={category_name} />
                    </View>
                    <View style={{ ...themes.row, marginTop: 5 }}>
                        <JobID jobID={jid} />
                        <Text style={{ ...themes.boldText, marginRight: 5 }}>${price}</Text>
                        <Text style={themes.secondaryText}>Lead Invitation</Text>
                    </View>
                </Body>
            </CardItem>
            <JobDescription description={description} />
            <CardItem bordered>
                <Body>
                    <Phone phoneNumber={contact_phone} />
                    <Email style={{ marginTop: 5 }} email={contact_email} />
                </Body>
            </CardItem>
        </Card>
    )
}

AcceptedLeadCard.propTypes = {
    jid: PropTypes.string,
    category_name: PropTypes.string,
    contact_name: PropTypes.string,
    created_at: PropTypes.object,
    description: PropTypes.string,
    price: PropTypes.number,
    suburb_name: PropTypes.string,
    postcode: PropTypes.string,
    contact_email: PropTypes.string,
    contact_phone: PropTypes.string
}

export default AcceptedLeadCard;
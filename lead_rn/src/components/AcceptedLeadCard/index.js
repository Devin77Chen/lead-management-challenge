import React from 'react';
import { Card, CardItem, Body, Text, View } from 'native-base';
import Meteor from 'react-native-meteor';
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
    console.log("🚀 ~ file: index.js ~ line 25 ~ contact_phone", contact_phone)
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

export default AcceptedLeadCard;
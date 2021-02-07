import React from 'react';
import { Card, CardItem, Body, Text, View, Icon, Button } from 'native-base';
import Meteor from 'react-native-meteor';
import PropTypes from 'prop-types';
import AvatarNameTime from './AvatarNameTime';
import SuburbPostcode from './SuburbPostcode';
import JobCategory from './JobCategory';
import JobID from './JobID';
import JobDescription from './JobDescription';
import AcceptButton from './AcceptButton';
import DeclineButton from './DeclineButton';
import { acceptJob, declineJob } from '@methods/jobEventsRequests';
import { Methods } from '@consts/methods';
import themes from '@themes';

function InvitedLeadCard({
    jid,
    category_name,
    contact_name,
    created_at,
    description,
    price,
    suburb_name,
    postcode
}) {
    return (
        <Card style={themes.card}>
            <AvatarNameTime name={contact_name} time={created_at} />
            <CardItem bordered>
                <Body>
                    <View style={themes.row}>
                        <SuburbPostcode suburb={suburb_name} postcode={postcode} />
                        <JobCategory categoryName={category_name} />
                        <JobID jobID={jid} />
                    </View>
                </Body>
            </CardItem>
            <JobDescription description={description} />
            <CardItem bordered>
                <Body style={themes.row}>
                    <AcceptButton 
                        jobID={jid} 
                        onButtonPress={() => acceptJob(Meteor.call, Methods.ACCEPT_JOB, jid, (err, result) => {
                            if (err) {
                                // TODO handle accept job error gracefully with proper user interface
                                console.log("acceptJob error", err);
                            } else {
                                // TODO show successful accept alert
                                console.log(`Job ${jid} is accepted.`);
                            }
                        })}
                    />
                    <DeclineButton 
                        jobID={jid} 
                        onButtonPress={() => declineJob(Meteor.call, Methods.DECLINE_JOB, jid, (err, result) => {
                            if (err) {
                                // TODO handle decline job error gracefully with proper user interface
                                console.log("declineJob error", err);
                            } else {
                                // TODO show successful decline alert
                                console.log(`Job ${jid} is declined.`);
                            }
                        })}
                    />
                    <Text style={{ ...themes.boldText, marginRight: 5 }}>${price}</Text>
                    <Text style={themes.secondaryText}>Lead Invitation</Text>
                </Body>
            </CardItem>
        </Card>
    )
}

InvitedLeadCard.propTypes = {
    jid: PropTypes.string,
    category_name: PropTypes.string,
    contact_name: PropTypes.string,
    created_at: PropTypes.object,
    description: PropTypes.string,
    price: PropTypes.number,
    suburb_name: PropTypes.string,
    postcode: PropTypes.string

}

export default InvitedLeadCard;
import React from 'react';
import { CardItem, Body, Text } from 'native-base';
import Avatar from 'react-native-user-avatar';
import { parseDate, monthNames } from '@helpers/formatTime';
import themes from '@themes';

function AvatarNameTime({ name, time }) {
    const nameInitial = name.length > 0 ? name[0] : ' ';
    const { date, time: cTime } = parseDate(time, monthNames);
    return (
        <CardItem header bordered>
            <Avatar style={{ marginRight: 10 }} name={nameInitial} />
            <Body>
                <Text>{name}</Text>
                <Text style={themes.secondaryText}>{date} @ {cTime}</Text>
            </Body>
        </CardItem>
    )
}

export default AvatarNameTime;
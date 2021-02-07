import React from 'react';
import { CardItem, Text } from 'native-base';
import themes from '@themes';

function JobDescription({ description }) {
    return (
        <CardItem bordered>
            <Text style={themes.secondaryText}>{description}</Text>
        </CardItem>
    )
}

export default JobDescription;
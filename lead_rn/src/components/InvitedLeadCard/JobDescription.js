import React from 'react';
import { CardItem, Text } from 'native-base';
import PropTypes from 'prop-types';
import themes from '@themes';

function JobDescription({ description }) {
    return (
        <CardItem bordered>
            <Text style={themes.secondaryText}>{description}</Text>
        </CardItem>
    )
}

JobDescription.propTypes = {
    description: PropTypes.string
}

export default JobDescription;
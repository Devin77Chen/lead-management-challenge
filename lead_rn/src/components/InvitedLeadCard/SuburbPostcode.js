import React from 'react';
import { View, Icon, Text } from 'native-base';
import PropTypes from 'prop-types';
import themes from '@themes';

function SuburbPostcode({ suburb, postcode }) {
    return (
        <View style={themes.row}>
            <Icon style={themes.gapRight} name="location-outline" />
            <Text style={themes.secondaryText}>{suburb} {postcode}</Text>
        </View>
    )
}

SuburbPostcode.propTypes = {
    suburb: PropTypes.string,
    postcode: PropTypes.string
}

export default SuburbPostcode;
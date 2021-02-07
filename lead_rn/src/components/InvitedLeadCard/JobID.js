import React from 'react';
import { View, Text } from 'native-base';
import PropTypes from 'prop-types';
import themes from '@themes';

function JobID({ jobID }) {
    return (
        <View style={themes.row}>
            <Text style={themes.secondaryText}>Job ID: {jobID}</Text>
        </View>
    )
}

JobID.propTypes = {
    jobID: PropTypes.string
}

export default JobID;
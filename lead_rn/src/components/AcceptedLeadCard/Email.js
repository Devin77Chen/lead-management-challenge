import React from 'react';
import { TouchableOpacity, Linking } from 'react-native';
import { Icon, Text } from 'native-base';
import PropTypes from 'prop-types';
import themes from '@themes';

function Email({ email }) {
    return (
        <TouchableOpacity 
            style={themes.row}
            onPress={() => {
                if (!Linking.canOpenURL(email)) {
                    // TODO Handle call error with a proper UI
                    console.log(`Cannot open email: ${email}`);
                }
                Linking.openURL(`mailto:${email}`)
            }}
        >
            <Icon style={themes.gapRight} name="mail-outline" />
            <Text style={{ color: themes.primaryColor }}>{email}</Text>
        </TouchableOpacity>
    )
}

Email.propTypes = {
    email: PropTypes.string
}

export default Email;
import React from 'react';
import { TouchableOpacity, Linking } from 'react-native';
import { View, Icon, Text, Touch } from 'native-base';
import call from 'react-native-phone-call';
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

export default Email;
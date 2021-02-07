import React from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Icon, Text, Touch } from 'native-base';
import call from 'react-native-phone-call';
import themes from '@themes';

function Phone({ phoneNumber }) {
    return (
        <TouchableOpacity 
            style={themes.row}
            onPress={() => call({
                number: phoneNumber,
                prompt: true
              }).catch(err => {
                // TODO Handle call error with a proper UI
                console.log('Phone call error: ', err);
              })}
        >
            <Icon style={themes.gapRight} name="call-outline" />
            <Text style={{ color: themes.primaryColor }}>{phoneNumber}</Text>
        </TouchableOpacity>
    )
}

export default Phone;
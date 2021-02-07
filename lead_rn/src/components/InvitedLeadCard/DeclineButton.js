import React from 'react';
import { Alert } from 'react-native';
import { Text, Button } from 'native-base';
import PropTypes from 'prop-types';
import themes from '@themes';

function DeclineButton({ onButtonPress }) {
    return (
        <Button 
            style={{ ...themes.gapRight, backgroundColor: themes.secondaryColor }}
            onPress={() => Alert.alert(
                "",
                "Are you sure to decline this job?",
                [
                    {
                        text: "Cancel",
                        onPress: () => console.log("Decline job button alert canceled.")
                    },
                    {
                        text: "OK",
                        onPress: () => onButtonPress()
                    }
                ]
            )}
        >
            <Text>Decline</Text>
        </Button>
    )
}

DeclineButton.propTypes = {
    onButtonPress: PropTypes.func
}

export default DeclineButton;
import React from 'react';
import { Alert } from 'react-native';
import { Text, Button } from 'native-base';
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

export default DeclineButton;
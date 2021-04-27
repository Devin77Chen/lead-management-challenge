import React, { useEffect } from 'react';
import Meteor from 'react-native-meteor';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import InvitedTabScreen from '@scenes/InvitedTabScreen';
import AcceptedTabScreen from '@scenes/AcceptedTabScreen';

import { Publications } from '@consts/publications';
import appConfigs from 'lead_rn/app.json';

function Home(props) {
    console.log("🚀 ~ file: index.js ~ line 12 ~ Home ~ props", props)
    const Tab = createMaterialTopTabNavigator();
    const insets = useSafeAreaInsets();
    useEffect(() => {
        Meteor.subscribe(Publications.MY_SUBURBS);
        Meteor.subscribe(Publications.MY_CATEGORIES);
        Meteor.subscribe(Publications.MY_INVITED_JOB_EVENTS);
        Meteor.subscribe(Publications.MY_ACCEPTED_JOB_EVENTS);
    }, []);
    return (
        <Tab.Navigator
            tabBarOptions={{
                labelStyle: { fontSize: 12, textTransform: 'none' },
                style: {
                    color: 'orange', 
                    backgroundColor: 'white',
                    marginTop: insets.top
                }
            }}
            barStyle={{ backgroundColor: 'tomato' }}
        >
            <Tab.Screen 
                name={appConfigs.HomeTabOneName} 
                component={InvitedTabScreen}
                options={{ tabBarLabel: appConfigs.HomeTabOneName }}
            />
            <Tab.Screen 
                name={appConfigs.HomeTabTwoName} 
                component={AcceptedTabScreen}
                options={{ tabBarLabel: appConfigs.HomeTabTwoName }}
            />
        </Tab.Navigator>
    );
}

export default Home;
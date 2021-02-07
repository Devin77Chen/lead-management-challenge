import React, { useEffect } from 'react';
import Meteor from 'react-native-meteor';
import { Container, Header, Body, Title } from 'native-base';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import InvitedTabScreen from '@scenes/InvitedTabScreen';
import AcceptedTabScreen from '@scenes/AcceptedTabScreen';

import { Publications } from '@consts/publications';
import { Collections } from '@consts/collections';
// import { Provider } from "react-redux";
// import { store } from "@redux/store";
// import HomeContent from "@components/HomeContent";
import appConfigs from 'lead_rn/app.json';
import MeteorListView from 'react-native-meteor/src/components/ListView';

function Home() {
    const Tab = createMaterialTopTabNavigator();
    const insets = useSafeAreaInsets();
    useEffect(() => {
        Meteor.subscribe(Publications.MY_SUBURBS);
        Meteor.subscribe(Publications.MY_CATEGORIES);
        Meteor.subscribe(Publications.MY_INVITED_JOB_EVENTS);
        console.log('subscribing ', Publications.MY_INVITED_JOB_EVENTS);
        Meteor.subscribe(Publications.MY_ACCEPTED_JOB_EVENTS);
        console.log('subscribing ', Publications.MY_ACCEPTED_JOB_EVENTS);
    }, []);
    // console.log("🚀 ~ file: index.js ~ line 26 ~ useEffect ~ MY_SUBURBS", Meteor.collection(SUBURBS).find());
    // console.log("🚀 ~ file: index.js ~ line 26 ~ useEffect ~ MY_CATEGORIES", Meteor.collection(CATEGORIES).find());
    // console.log("🚀 ~ file: index.js ~ line 26 ~ useEffect ~ MY_JOB_EVENTS", Meteor.collection(JOB_EVENTS).find());
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
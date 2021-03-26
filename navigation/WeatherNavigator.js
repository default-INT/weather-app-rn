import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialIcons } from "@expo/vector-icons";

import { CityScreen, CityDetailsScreen } from "../screens/city";
import { DailyScreen } from "../screens/daily";
import { HourlyScreen } from "../screens/hourly";

const defaultStackNavOtions = {
    headerStyle: {
        elevation: 0,
        shadowOpacity: 0
    }
}

const CityStackNavigator = createStackNavigator();

const CityNavigator = () => {
    return (
        <CityStackNavigator.Navigator
            screenOptions={defaultStackNavOtions}
        >
            <CityStackNavigator.Screen 
                name="City"
                component={CityScreen}
            />
            <CityStackNavigator.Screen 
                name="CityDetails"
                component={CityDetailsScreen}
            />
        </CityStackNavigator.Navigator>
    )
};

const DailyStackNavigator = createStackNavigator();

const DailyNavigator = () => {
    return (
        <DailyStackNavigator.Navigator
            screenOptions={defaultStackNavOtions}
        >
            <DailyStackNavigator.Screen
                name="Daily"
                component={DailyScreen}
            />
        </DailyStackNavigator.Navigator>
    )
};

const HourlyStackNavigator = createStackNavigator();

const HourlyNavigator = () => {
    return (
        <HourlyStackNavigator.Navigator
        screenOptions={defaultStackNavOtions}
        >
            <HourlyStackNavigator.Screen
                name="Hourly"
                component={HourlyScreen}
            />
        </HourlyStackNavigator.Navigator>
    )
};

const MainTabNavigator = createBottomTabNavigator();

export const MainNavigator = () => {
    return (
        <MainTabNavigator.Navigator
            lazy={true}
        >
            <MainTabNavigator.Screen
                name="CityScreen"
                component={CityNavigator}
                options={{
                    tabBarIcon: tabInfo => (
                        <MaterialIcons name='location-city' size={24} color={tabInfo.color} />
                    ),
                    tabBarLabel: 'City',
                }}
            />
            <MainTabNavigator.Screen
                name="DailyScreen"
                component={DailyNavigator}
                options={{
                    tabBarIcon: tabInfo => (
                        <MaterialIcons name='date-range' size={24} color={tabInfo.color} />
                    ),
                    tabBarLabel: 'Daily'
                }}
            />
            <MainTabNavigator.Screen
                name="HourlyScreen"
                component={HourlyNavigator}
                options={{
                    tabBarIcon: tabInfo => (
                        <MaterialIcons name='access-time' size={24} color={tabInfo.color} />
                    ),
                    tabBarLabel: 'Hourly'
                }}
            />
        </MainTabNavigator.Navigator>
    )
}
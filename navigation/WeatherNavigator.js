import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialIcons } from "@expo/vector-icons";

import { CityScreen, CityDetailsScreen } from "../screens/city";
import { DailyScreen } from "../screens/daily";
import { HourlyTodayScreen, HourlyYesterdayScreen } from "../screens/hourly";
import Colors  from "../constants/color";

const defaultStackNavOtions = {
    headerStyle: {
        elevation: 0,
        shadowOpacity: 0
    }
}

const CustomTab = ({tabInfo, children}) => (
    <View style={{ borderBottomColor: tabInfo.color}}>
        <Text style={{color: tabInfo.color, fontWeight: tabInfo.focused ? 'normal' : 'normal'}}>{children}</Text>
    </View>
)

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

const HourlyMaterialTopTabNavigator = createMaterialTopTabNavigator();

const HourlyTopTabNavigator = () => {
    return (
        <HourlyMaterialTopTabNavigator.Navigator 
            initialRouteName="HourlyToday"
            style={{
                backgroundColor: Colors.white
            }}
            tabBarOptions={{
                activeTintColor: Colors.primary,
                inactiveTintColor: Colors.hint,
                indicatorStyle: {
                    backgroundColor: Colors.primary
                },
                labelStyle: { 
                    activeTintColor: Colors.primary
                },
                style: {
                    alignSelf: 'center',
                    width: '50%',
                    elevation: 0,
                    shadowOffset: 0,
                    backgroundColor: Colors.white
                }
            }}
        >
            <HourlyMaterialTopTabNavigator.Screen
                name="HourlyYesterday"
                component={HourlyYesterdayScreen}
                options={{ 
                    tabBarLabel: tabInfo => (
                        <CustomTab tabInfo={tabInfo} >Yesterday</CustomTab>
                    )
                 }}

            />
            <HourlyMaterialTopTabNavigator.Screen
                name="HourlyToday"
                component={HourlyTodayScreen}
                options={{ 
                    tabBarLabel: tabInfo => (
                        <CustomTab tabInfo={tabInfo}>Today</CustomTab>
                    )
                 }}
            />
        </HourlyMaterialTopTabNavigator.Navigator>
    )
}

const HourlyStackNavigator = createStackNavigator();

const HourlyNavigator = () => {
    return (
        <HourlyStackNavigator.Navigator
        screenOptions={defaultStackNavOtions}
        >
            <HourlyStackNavigator.Screen
                name="Hourly"
                component={HourlyTopTabNavigator}
            />
        </HourlyStackNavigator.Navigator>
    )
};

const MainTabNavigator = createBottomTabNavigator();

export const MainNavigator = () => {
    return (
        <MainTabNavigator.Navigator
            lazy={true}
            tabBarOptions={{
                keyboardHidesTabBar: true
            }}
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
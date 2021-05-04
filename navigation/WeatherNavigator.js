import React from "react";
import {View} from "react-native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import {createStackNavigator} from "@react-navigation/stack";
import {MaterialIcons} from "@expo/vector-icons";
import Config from "react-native-config";

import {CityDetailsScreen, CityScreen} from "../screens/city";
import {DailyScreen} from "../screens/daily";
import {HourlyTodayScreen, HourlyYesterdayScreen} from "../screens/hourly";
import {DefaultText} from "../components/UI";
import {IconSelectorScreen, iconSelectorScreenOptions} from "../screens/other";

const defaultStackNavOptions = {
    headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        backgroundColor: Config.MAIN_COLOR
    },
    headerTintColor: Config.TEXT_COLOR,
    headerBackTitleStyle: {
        color: Config.TEXT_COLOR
    },
    headerTitleStyle: {
        color: Config.TEXT_COLOR
    },
    headerTitle: ''
}

const CustomTab = ({tabInfo, children}) => (
    <View style={{ borderBottomColor: tabInfo.color}}>
        <DefaultText style={{color: tabInfo.color, fontWeight: tabInfo.focused ? 'normal' : 'normal'}}>{children}</DefaultText>
    </View>
)

const CityStackNavigator = createStackNavigator();

const CityNavigator = () => {
    return (
        <CityStackNavigator.Navigator
            screenOptions={defaultStackNavOptions}
        >
            <CityStackNavigator.Screen 
                name="City"
                component={CityScreen}
            />
            <CityStackNavigator.Screen 
                name="CityDetails"
                component={CityDetailsScreen}
            />
            <CityStackNavigator.Screen
                name="ImageSelector"
                component={IconSelectorScreen}
                options={iconSelectorScreenOptions}
            />
        </CityStackNavigator.Navigator>
    )
};

const DailyStackNavigator = createStackNavigator();

const DailyNavigator = () => {
    return (
        <DailyStackNavigator.Navigator
            screenOptions={defaultStackNavOptions}
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
                backgroundColor: Config.MAIN_COLOR
            }}
            tabBarOptions={{
                activeTintColor: Config.PRIMARY_COLOR,
                inactiveTintColor: Config.HINT_COLOR,
                indicatorStyle: {
                    backgroundColor: Config.PRIMARY_COLOR
                },
                labelStyle: { 
                    activeTintColor: Config.PRIMARY_COLOR
                },
                style: {
                    alignSelf: 'center',
                    width: '50%',
                    elevation: 0,
                    shadowRadius: 0,
                    backgroundColor: Config.MAIN_COLOR
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
        screenOptions={defaultStackNavOptions}
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
            style={{
                backgroundColor: Config.MAIN_COLOR
            }}
            tabBarOptions={{
                keyboardHidesTabBar: true,
                activeTintColor: Config.PRIMARY_COLOR,
                inactiveTintColor: Config.TINT_COLOR,
                style: {
                    backgroundColor: Config.MAIN_COLOR
                }
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
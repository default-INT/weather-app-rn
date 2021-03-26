import React, { useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";

import { WeatherIcon } from "../../components/UI";
import { convertDateFromUTC, toTempFormatter, toTimeFormat, MONTHS } from "../../constants/utils";
import Colors from "../../constants/color";

const CityDetailsScreen = ({navigation, route, ...props}) => {
    const { weatherIcon, cityName, cityDt, cityWeather, cityTemp } = route.params;
    const date = convertDateFromUTC(cityDt);
    useEffect(() => {
        navigation.setOptions({
            headerTitle: cityName,
            headerTitleAlign: 'center'
        })
    }, []);
    // const weatherIcon = WEATHER_ICONS[cityWeather.toUpperCase()] || WEATHER_ICONS.DEFAULT;
    return (
        <View style={styles.screen}>
            <View>
                <View style={styles.title}>
                    <Text style={styles.titleText}>{MONTHS[date.getMonth()]}, {date.getDate()}st</Text>
                    <Text style={styles.titleText}>{toTimeFormat(date.getHours(), date.getMinutes())}</Text>
                </View>
                <View style={styles.weatherContainer}>
                    <WeatherIcon iconName={weatherIcon} size={130} />
                    <View style={styles.weather}>
                        <Text style={styles.weatherText}>{cityWeather}</Text>
                        <Text style={styles.weatherText}>{toTempFormatter(cityTemp)} С</Text>
                    </View>
                </View>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.white
    },
    weatherContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    weather: {
        paddingVertical: 5
    },
    title: {
        padding: 10,
        alignItems: 'center'
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    weatherText: {
        fontSize: 20,
        fontWeight: 'bold'
    }
});

export default CityDetailsScreen;

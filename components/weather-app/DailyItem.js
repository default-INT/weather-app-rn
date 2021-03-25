import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { convertDateFromUTC, toTempFormatter, MONTHS } from "../../constants/utils";
import { WEATHER_ICONS } from "../../constants/icon-name";
import Colors from "../../constants/color";

const DailyItem = ({daily, ...props}) => {
    const temp = toTempFormatter(daily.temp.day);
    const date = convertDateFromUTC(daily.dt);
    const weatherIcon = WEATHER_ICONS[daily.weather[0].main.toUpperCase()] || WEATHER_ICONS.DEFAULT;
    return (
        <View style={styles.item}>
            <View style={styles.mainContainer}>
                <View style={styles.leftContainer}>
                    <View style={styles.title}>
                        <Text style={styles.titleText}>{MONTHS[date.getMonth()]}, {date.getDate()}st</Text>
                    </View>
                    <View style={styles.temp}>
                        <Text>{temp} С</Text>
                    </View>
                </View>
                <View style={styles.rightContainer}>
                    <Ionicons name={weatherIcon.name} size={48} color={weatherIcon.color} />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        flex: 1,
        marginHorizontal: 10,
        elevation: 0,
        paddingHorizontal: 10
    },
    mainContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 4
    },
    leftContainer: {
        justifyContent: 'center'
    },
    temp: {
        paddingLeft: 10,
        paddingVertical: 5
    },
    title: {
        padding: 10,
        alignItems: 'center'
    },
    titleText: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    touchable: {
        overflow: 'hidden'
    }
});

export default DailyItem;
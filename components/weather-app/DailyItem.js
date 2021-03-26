import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { convertDateFromUTC, toTempFormatter, dayFormatter, MONTHS } from "../../constants/utils";
import { WeatherIcon } from "../../components/UI";

const DailyItem = ({daily, ...props}) => {
    const temp = toTempFormatter(daily.temp.day);
    const date = convertDateFromUTC(daily.dt);
    return (
        <View style={styles.item}>
            <View style={styles.mainContainer}>
                <View style={styles.leftContainer}>
                    <View style={styles.title}>
                        <Text style={styles.titleText}>{MONTHS[date.getMonth()]}, {dayFormatter(date.getDate())}</Text>
                    </View>
                    <View style={styles.temp}>
                        <Text>{temp} С</Text>
                    </View>
                </View>
                <View style={styles.rightContainer}>
                    <WeatherIcon iconName={daily.weather[0].icon} />
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
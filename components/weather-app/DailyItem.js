import React from "react";
import {StyleSheet, View} from "react-native";

import {convertDateFromUTC, dayFormatter, MONTHS, toTempFormatter} from "../../constants/utils";
import {DefaultText, TitleText, WeatherIcon} from "../../components/UI";

const DailyItem = ({daily, ...props}) => {
    const temp = toTempFormatter(daily.temp.day);
    const date = convertDateFromUTC(daily.dt);
    return (
        <View style={styles.item}>
            <View style={styles.mainContainer}>
                <View style={styles.leftContainer}>
                    <View style={styles.title}>
                        <TitleText>{MONTHS[date.getMonth()]}, {dayFormatter(date.getDate())}</TitleText>
                    </View>
                    <View style={styles.temp}>
                        <DefaultText>{temp} С</DefaultText>
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
    touchable: {
        overflow: 'hidden'
    }
});

export default DailyItem;
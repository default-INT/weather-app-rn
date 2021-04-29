import React from "react";
import {StyleSheet, View} from "react-native";

import {DefaultText, TitleText, WeatherIcon} from "../../components/UI";
import {convertDateFromUTC, toTempFormatter, toTimeFormat} from "../../constants/utils";

const HourItem = ({hour, ...props}) => {
    const temp = toTempFormatter(hour.temp);
    const date = convertDateFromUTC(hour.dt);
    return (
        <View style={styles.item}>
            <View style={styles.mainContainer}>
                <View style={styles.leftContainer}>
                    <View style={styles.title}>
                        <TitleText>{toTimeFormat(date.getHours(), date.getMinutes())}</TitleText>
                    </View>
                    <View style={styles.temp}>
                        <DefaultText>{temp} С</DefaultText>
                    </View>
                </View>
                <View style={styles.rightContainer}>
                    <WeatherIcon iconName={hour.weather[0].icon} />
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

export default HourItem;
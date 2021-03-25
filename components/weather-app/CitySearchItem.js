import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";

import Card from "../Card";
import { TouchableComponent } from "../UI";
import Colors from "../../constants/color";
import { WEATHER_ICONS } from "../../constants/icon-name";
import { City } from "../../models";

const CitySearchItem = ({city, ...prosp}) => {
    const weatherIcon = WEATHER_ICONS[city.weather[0].main.toUpperCase()] || WEATHER_ICONS.DEFAULT;
    let temp = (city.main.temp - 272.1).toFixed(0);
    if (temp > 0) {
        temp = '+ ' + temp;
    } else if (temp < 0) {
        temp = '- ' + temp;
    }
    return (
        <View style={styles.card}>
            <View style={styles.touchable}>
                <TouchableComponent>
                    <View style={styles.mainContainer}>
                        <View style={styles.leftContainer}>
                            <View style={styles.title}>
                                <Text style={styles.titleText}>{city.name}, {city.sys.country}</Text>
                            </View>
                            <View style={styles.temp}>
                                    <Text>{temp} С</Text>
                                </View>
                        </View>
                        <View style={styles.rightContainer}>
                            <Ionicons name={weatherIcon.name} size={48} color={weatherIcon.color} />
                        </View>
                    </View>
                </TouchableComponent>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: Colors.whitesmoke,
        marginHorizontal: 10,
        elevation: 0
    },
    mainContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10
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
})

export default CitySearchItem;
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";

import Card from "../Card";
import { TouchableComponent } from "../UI";
import Colors from "../../constants/color";
import { WEATHER_ICONS } from "../../constants/icon-name";

const CityCardItem = ({city, ...prosp}) => {
    const weatherIcon = WEATHER_ICONS[city.weather[0].main.toUpperCase()] || WEATHER_ICONS.DEFAULT;
    return (
        <Card style={styles.card}>
            <View style={styles.touchable}>
                <TouchableComponent>
                    <View>
                        <View style={styles.title}>
                            <Text style={styles.titleText}>{city.name}</Text>
                        </View>
                        <View style={styles.weatherContainer}>
                            <Ionicons name={weatherIcon.name} size={48} color={weatherIcon.color} />
                            <View style={styles.temp}>
                                <Text>{(city.main.temp - 272.1).toFixed(0)} С</Text>
                            </View>
                        </View>
                    </View>
                </TouchableComponent>
            </View>
        </Card>
    )
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        borderWidth: 1,
        borderColor: Colors.whitesmoke,
        margin: 10,
        borderRadius: 10,
        elevation: 0
    },
    weatherContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    temp: {
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
        overflow: 'hidden',
        borderRadius: 9
    }
})

export default CityCardItem;
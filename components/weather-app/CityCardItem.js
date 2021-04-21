import React from "react";
import { View, Text, StyleSheet } from "react-native";

import Card from "../Card";
import { TouchableComponent, WeatherIcon } from "../UI";
import { toTempFormatter } from "../../constants/utils";
import Colors from "../../constants/color";

const CityCardItem = ({city, onSelect, ...prosp}) => {
    return (
        <Card style={styles.card}>
            <View style={styles.touchable}>
                <TouchableComponent onPress={() => onSelect(city)}>
                    <View>
                        <View style={styles.title}>
                            <Text style={styles.titleText}>{city.name}</Text>
                        </View>
                        <View style={styles.weatherContainer}>
                            <WeatherIcon iconName={city.weather[0].icon} />
                            <View style={styles.temp}>
                                <Text>{toTempFormatter(city.main.temp)} С</Text>
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
        borderRadius: 10
    },
    weatherContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    temp: {
        paddingVertical: 5
    },
    logo: {
        width: 50,
        height: 50
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
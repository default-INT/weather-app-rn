import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { TouchableComponent, WeatherIcon } from "../UI";
import { toTempFormatter } from "../../constants/utils";
import Colors from "../../constants/color";

const CitySearchItem = ({city, onSelect, ...prosp}) => {
    const temp = toTempFormatter(city.main.temp);
    return (
        <View style={styles.card}>
            <View style={styles.touchable}>
                <TouchableComponent onPress={() => onSelect(city)}>
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
                            <WeatherIcon iconName={city.weather[0].icon} />
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
    icon: {
        width: 50,
        height: 50
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
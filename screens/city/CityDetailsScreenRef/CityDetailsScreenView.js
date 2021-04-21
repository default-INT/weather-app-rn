import React from "react";
import { Text, View } from "react-native";

import { WeatherIcon } from "../../../components/UI";
import { MONTHS, toTempFormatter, toTimeFormat } from "../../../constants/utils";
import styles from "./styles";


const CityDetailsScreenView = ({navigation, ...props}) => {
    const { weatherIcon, cityWeather, cityTemp, date } = props;
    
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

export default CityDetailsScreenView;
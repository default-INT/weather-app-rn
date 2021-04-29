import React from "react";
import { Text, View } from "react-native";

import {TitleText, WeatherIcon} from "../../../components/UI";
import { MONTHS, toTempFormatter, toTimeFormat } from "../../../constants/utils";
import styles from "./styles";


const CityDetailsScreenView = ({navigation, ...props}) => {
    const { weatherIcon, cityWeather, cityTemp, date } = props;
    
    return (
        <View style={styles.screen}>
            <View>
                <View style={styles.title}>
                    <TitleText style={styles.titleText}>{MONTHS[date.getMonth()]}, {date.getDate()}st</TitleText>
                    <TitleText style={styles.titleText}>{toTimeFormat(date.getHours(), date.getMinutes())}</TitleText>
                </View>
                <View style={styles.weatherContainer}>
                    <WeatherIcon iconName={weatherIcon} size={130} />
                    <View style={styles.weather}>
                        <TitleText style={styles.weatherText}>{cityWeather}</TitleText>
                        <TitleText style={styles.weatherText}>{toTempFormatter(cityTemp)} С</TitleText>
                    </View>
                </View>
            </View>
        </View>
    )
};

export default CityDetailsScreenView;
import React from "react";
import { ActivityIndicator, FlatList, View, TouchableOpacity, Image, Text } from "react-native";

import { HourItem } from "../../../components";
import { convertDateFromUTC } from "../../../constants/utils";
import { AllowAccesScreen } from "../../support-screen";
import {FloatButton} from "../../../components/UI";
import Colors from "../../../constants/color";
import styles from "./styles";


const HourlyScreenView = ({navigation, ...props}) => {
    const {
        isLoading,
        currentCityWeather,
        currentLocation,
        loadWeather,
        allowAccesHandler,
        onOpenFile
    } = props;

    if (isLoading) {
        return (
            <View style={{...styles.screen, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size='large' color={Colors.primary} /> 
            </View>
        )
    }

    if (!currentLocation) {
        return (
            <AllowAccesScreen allowAccesHandler={allowAccesHandler} />
        )
    }
    
    if (!currentCityWeather) {
        return (
            <View style={{...styles.screen, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size='large' color={Colors.primary} /> 
            </View>
        )
    }

    const date = convertDateFromUTC(currentCityWeather.hourly[0].dt);
    const hourly = currentCityWeather.hourly.filter(hour => convertDateFromUTC(hour.dt).getDate() === date.getDate());
    
    return (
        <View style={styles.screen}>
            <FlatList
                data={hourly}
                keyExtractor={item => item.dt + ''}
                renderItem={itemData => <HourItem hour={itemData.item} />}
                refreshing={isLoading}
                onRefresh={() => loadWeather()}
            />
            {onOpenFile && <FloatButton onPress={onOpenFile} />}
        </View>
    )
};

export default HourlyScreenView;
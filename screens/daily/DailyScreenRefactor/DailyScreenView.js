import React from "react";
import { ActivityIndicator, FlatList, View } from "react-native";

import { DailyItem } from "../../../components";
import { AllowAccesScreen } from "../../support-screen";
import styles from "./styles";
import Colors from "../../../constants/color";


const DailyScreenView = ({navigation, ...props}) => {
    const {
        isLoading,
        currentLocation,
        currentCityWeather,
        allowAccesHandler,
        loadWeather
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

    return (
        <View style={styles.screen}>
            <FlatList
                data={currentCityWeather.daily}
                keyExtractor={item => item.dt + ''}
                renderItem={itemData => <DailyItem daily={itemData.item} />}
                refreshing={isLoading}
                onRefresh={() => loadWeather()}
            />
        </View>
    )
};

export default DailyScreenView;
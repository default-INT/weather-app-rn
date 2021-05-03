import React from "react";
import {FlatList, View} from "react-native";

import {HourItem} from "../../../components";
import {convertDateFromUTC} from "../../../constants/utils";
import {AllowAccesScreen} from "../../support-screen";
import {FloatButton, LargeLoader} from "../../../components/UI";
import styles from "./styles";


const HourlyScreenView = ({navigation, ...props}) => {
    const {
        isLoading,
        currentCityWeather,
        currentLocation,
        loadWeather,
        allowAccesHandler,
        onOpenFile,
        onPressFloatButton,
        BottomSheetManager
    } = props;

    if (isLoading) {
        return (
            <View style={{...styles.screen, justifyContent: 'center', alignItems: 'center'}}>
                <LargeLoader />
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
                <LargeLoader />
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
            {onPressFloatButton && <FloatButton onPress={onPressFloatButton} />}
            {BottomSheetManager && <BottomSheetManager />}
        </View>
    )
};

export default HourlyScreenView;
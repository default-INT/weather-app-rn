import React, { useEffect, useState, useCallback } from "react";
import { View, StyleSheet, Alert, ActivityIndicator, FlatList, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { citiesActions } from "../../store/actions";
import { HourItem } from "../../components";
import { convertDateFromUTC, MONTHS } from "../../constants/utils";
import Colors from "../../constants/color";

const HourlyScreen = ({navigation, ...props}) => {
    const [isLoading, setIsLoading] = useState(false);
    const currentCityWeather = useSelector(state => state.cities.currentCityWeather);
    const date = convertDateFromUTC(currentCityWeather.hourly[0].dt);
    const dispatch = useDispatch();

    const loadWeather = useCallback(async () => {
        setIsLoading(true);
        try {
            await dispatch(citiesActions.getCurrentCityWeather());
        } catch (err) {
            Alert.alert('Error', err.message, [{message: 'Okay'}]);
        }
        setIsLoading(false);
    }, [isLoading, currentCityWeather]);

    useEffect(() => {
        navigation.setOptions({
            headerTitle: `${currentCityWeather.city} - ${MONTHS[date.getMonth()]}, ${date.getDate()}st`,
            headerTitleStyle: {
                fontSize: 28
            }
        });
    }, []);

    if (isLoading) {
        return (
            <View style={{...styles.screen, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size='large' color={Colors.primary} /> 
            </View>
        )
    }

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
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.white
    }
});

export default HourlyScreen;
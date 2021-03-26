import React, { useEffect, useState, useCallback } from "react";
import { View, StyleSheet, Alert, ActivityIndicator, FlatList, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { citiesActions, locationActions } from "../../store/actions";
import { AllowAccesScreen } from "../support-screen";
import { HourItem } from "../../components";
import { convertDateFromUTC, dayFormatter, MONTHS } from "../../constants/utils";
import Colors from "../../constants/color";

const HourlyScreen = ({navigation, ...props}) => {
    const [isLoading, setIsLoading] = useState(false);
    const currentLocation = useSelector(state => state.location.currentLocation);
    const currentCityWeather = useSelector(state => state.cities.currentCityWeather);
    const dispatch = useDispatch();

    const allowAccesHandler = useCallback(async () => {
        setIsLoading(true);
        try {
            await dispatch(locationActions.getCurrentLocation());
            await loadWeather();
        } catch (err) {
            Alert.alert('Error', err.message, [{text: 'Okay'}]);
        }
        setIsLoading(false);
    }, [dispatch, currentLocation]);

    const loadWeather = useCallback(async () => {
        setIsLoading(true);
        try {
            await dispatch(citiesActions.getCurrentCityWeather());
        } catch (err) {
            console.log(err.message);
        }
        setIsLoading(false);
    }, [isLoading, currentCityWeather]);

    useEffect(() => {
        if (!currentCityWeather) {
            loadWeather();
        }
        const getDate = () => {
            return convertDateFromUTC(currentCityWeather.hourly[0].dt)
        };
        navigation.setOptions({
            headerTitle: currentCityWeather ? `${currentCityWeather.city} - ${MONTHS[getDate().getMonth()]}, ${dayFormatter(getDate().getDate())}` : '',
            headerTitleStyle: {
                fontSize: 28
            }
        });
    }, [currentCityWeather]);

    useEffect(() => {
        let unsubscribeTabPress;
        const unsubscribeBlur = navigation.dangerouslyGetParent()
            .addListener('blur', () => {
                if (unsubscribeTabPress) {
                    unsubscribeTabPress();
                }
            });
        const unsubscribeFocus = navigation.dangerouslyGetParent()
            .addListener('focus', () => {
                unsubscribeTabPress = navigation.dangerouslyGetParent()
                    .addListener('tabPress', e => {
                        loadWeather();
                    });
            });
        return () => {
            unsubscribeBlur();
            unsubscribeFocus();
        }
    }, [navigation]);

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
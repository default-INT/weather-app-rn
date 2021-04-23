import React, { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as FileSystem from 'expo-file-system';


import { convertDateFromUTC, dayFormatter, MONTHS } from "../../../constants/utils";
import { citiesActions, locationActions } from "../../../store/actions";
import HourlyScreenView from "./HourlyScreenView";


const HourlyScreenContainer = ({ navigation, route, ...props }) => {
    const {
        currentCityWeather,
        loadWeatherAction
    } = props;

    const [isLoading, setIsLoading] = useState(false);
    const currentLocation = useSelector(state => state.location.currentLocation);
    const dispatch = useDispatch();

    const allowAccesHandler = useCallback(async () => {
        setIsLoading(true);
        try {
            await dispatch(locationActions.getCurrentLocation());
            await loadWeather();
        } catch (err) {
            Alert.alert('Error', err.message, [{ text: 'Okay' }]);
        }
        setIsLoading(false);
    }, [dispatch, currentLocation]);

    const loadWeather = useCallback(async () => {
        setIsLoading(true);
        try {
            await dispatch(loadWeatherAction());
            const getDate = () => {
                return convertDateFromUTC(currentCityWeather.hourly[0].dt)
            };
            navigation.dangerouslyGetParent().setOptions({
                headerTitle: currentCityWeather ? `${currentCityWeather.city} - ${MONTHS[getDate().getMonth()]}, ${dayFormatter(getDate().getDate())}` : '',
                headerTitleStyle: {
                    fontSize: 28
                }
            });
        } catch (err) {
            console.log(err.message);
        }
        setIsLoading(false);
    }, [isLoading, currentCityWeather]);

    useEffect(() => {
        if (!currentCityWeather) {
            loadWeather();
            return;
        }
        const getDate = () => {
            return convertDateFromUTC(currentCityWeather.hourly[0].dt)
        };
        navigation.dangerouslyGetParent().setOptions({
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
        const unsubscribeFocusTopTab = navigation
            .addListener('focus', () => {  
                loadWeather();
                
            });
        const unsubscribeFocus = navigation.dangerouslyGetParent().dangerouslyGetParent()
            .addListener('focus', () => {             
                unsubscribeTabPress = navigation.dangerouslyGetParent().dangerouslyGetParent()
                    .addListener('tabPress', e => {
                        loadWeather();
                    });
            });
        return () => {
            unsubscribeBlur();
            unsubscribeFocus();
            unsubscribeFocusTopTab();
        }
    }, [navigation]);

    return (
        <HourlyScreenView
            isLoading={isLoading}
            currentCityWeather={currentCityWeather}
            currentLocation={currentLocation}
            loadWeather={loadWeather}
            allowAccesHandler={allowAccesHandler}
        />
    )
};

export default HourlyScreenContainer;
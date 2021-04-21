import React, { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { citiesActions, locationActions } from "../../../store/actions";
import DailyScreenView from "./DailyScreenView";


const DailyScreenContainer = ({ navigation, ...props }) => {
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
            Alert.alert('Error', err.message, [{ text: 'Okay' }]);
        }
        setIsLoading(false);
    }, [dispatch, currentLocation]);

    const loadWeather = useCallback(async () => {
        setIsLoading(true);
        try {
            if (!currentLocation) {
                await dispatch(locationActions.getCurrentLocation());
            }
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
        navigation.setOptions({
            headerTitle: currentCityWeather ? currentCityWeather.city : '',
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


    return (
        <DailyScreenView
            isLoading={isLoading}
            currentLocation={currentLocation}
            currentCityWeather={currentCityWeather}
            allowAccesHandler={allowAccesHandler}
            loadWeather={loadWeather}
        />
    )
};

export default DailyScreenContainer;
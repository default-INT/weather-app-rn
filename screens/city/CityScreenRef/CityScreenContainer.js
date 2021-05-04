import React, { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { citiesActions, locationActions } from "../../../store/actions";
import CityScreenView from "./CityScreenView";


const CityScreenContainer = ({navigation, ...props}) => {
    const {
        citiesWeather,
        searchedCities
    } = useSelector(state => state.cities);
    
    const currentLocation = useSelector(state => state.location.currentLocation);

    const [cityInputValue, setCityInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isSearching, setIsSearching] = useState(false);
    const [error, setError] = useState(null);

    let timeoutId;
    const dispatch = useDispatch();

    const fetchCityByName = useCallback(async (text) => {
        setIsSearching(true);
        setIsLoading(true);
        try {
            await dispatch(citiesActions.getCitiesWeatherByName(text));
        } catch (err) {
            Alert.alert('Error', err.message, [{ message: 'Okay' }]);
            setError('Something went wrong during network call');
        }
        setIsLoading(false);
    }, [timeoutId, isLoading, setError]);

    const onSelectCityHandler = city => {
        navigation.navigate('CityDetails', {
            cityId: city.id,
            cityName: city.name,
            cityDt: city.dt,
            cityTemp: city.main.temp,
            cityWeather: city.weather[0].main,
            weatherIcon: city.weather[0].icon
        })
    }

    const textHandler = text => {
        setCityInputValue(text);
        if (text.trim() !== '' && text.length > 3) {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            timeoutId = setTimeout(() => {
                fetchCityByName(text);
            }, 500);
            return;
        }
        setIsSearching(false);
    };

    const loadCities = useCallback(async () => {
        setIsLoading(true);
        try {
            if (!currentLocation) {
                try {
                    await dispatch(locationActions.getCurrentLocation());
                    dispatch(citiesActions.getCurrentCityWeather());
                } catch (err) {
                    console.log(err.message);
                }
            }
            await dispatch(citiesActions.getCitiesInCircleWeather(8));
        } catch (err) {
            Alert.alert('Error', err.message, [{ text: 'Okay' }]);
            setError('Something went wrong during network call');
        }
        setIsLoading(false);
    }, [dispatch, setIsLoading]);


    useEffect(() => {
        loadCities();
    }, [loadCities]);

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
                        loadCities();
                    });
            });
        return () => {
            unsubscribeBlur();
            unsubscribeFocus();
        }
    }, [navigation]);

    const openIconSelectorScreen = () => {
        navigation.navigate("ImageSelector")
    }

    return (
        <CityScreenView
            error={error}
            loadCities={loadCities}
            isLoading={isLoading}
            isSearching={isSearching}
            cityInputValue={cityInputValue}
            searchedCities={searchedCities}
            onSelectCityHandler={onSelectCityHandler}
            fetchCityByName={fetchCityByName}
            citiesWeather={citiesWeather}
            textHandler={textHandler}
            navigation={navigation}
            openIconSelectorScreen={openIconSelectorScreen}
        />
    )
}

export default CityScreenContainer;
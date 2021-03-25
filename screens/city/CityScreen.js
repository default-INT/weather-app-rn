import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, View, Alert, ActivityIndicator, FlatList, Dimensions } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

import { SearchInput, CityCardItem, CitySearchItem } from "../../components";
import { citiesActions, locationActions } from "../../store/actions";
import Colors from "../../constants/color";


const CityScreen = ({navigation, ...props}) => {
    const currentLocation = useSelector(state => state.location.currentLocation);
    const citiesWeather = useSelector(state => state.cities.citiesWeather);
    const searchedCities = useSelector(state => state.cities.searchedCities);

    const [cityInputValue, setCityInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isSearching, setIsSearching] = useState(false);
    
    let timeoutId;
    const dispatch = useDispatch();

    const fetchCityByName = useCallback(async () => {
        setIsSearching(true);
        setIsLoading(true);
        try {
            await dispatch(citiesActions.getCitiesWeatherByName(cityInputValue));
        } catch (err) {
            Alert.alert('Error', err.message, [{message: 'Okay'}]);
        }
        setIsLoading(false);
    }, [cityInputValue, timeoutId, isLoading]);

    const onSelectCityHandler = city => {
        navigation.navigate('CityDetails', {
            cityId: city.id,
            cityName: city.name,
            cityDt: city.dt,
            cityTemp: city.main.temp,
            cityWeather: city.weather[0].main
        })
    }

    useEffect(() => {
        if (cityInputValue.trim() !== '' && cityInputValue.length > 3) {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            timeoutId = setTimeout(() => {
                fetchCityByName();
            }, 500);
            return;
        }
        //TODO: fix double request
        if (isSearching) {
            setIsSearching(false);
        }
    }, [cityInputValue, timeoutId, isSearching]);
    
    const textHandler = text => {
        setCityInputValue(text);
    };

    const loadCities = useCallback(async () => {
        setIsLoading(true);
        try {
            if (!currentLocation) {
                await dispatch(locationActions.getCurrentLocation());
                dispatch(citiesActions.getCurrentCityWeather());
            }
            await dispatch(citiesActions.getCitiesInCircleWeather(8));
        } catch (err) {
            Alert.alert('Error', err.message, [{text: 'Okay'}]);
        }
        setIsLoading(false);
    }, [dispatch, setIsLoading]);

    
    useEffect(() => {
        loadCities();
    }, [loadCities]);

    useEffect(() => {
        navigation.setOptions({
            headerTitle: () => {
                //TODO: onSubmit
                return (
                  <SearchInput value={cityInputValue} onChangeText={textHandler}/>
                );
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
    
    if (isSearching) {
        return (
            <View style={styles.screen}>
                <View style={styles.headSearch}>
                    <Text style={styles.headSearchText}>SEARCH RESULTS</Text>
                </View>
                <View>
                    {searchedCities.length === 0 ? (
                        <View style={styles.notFoundScreen}>
                            <View style={styles.imgContainer}>
                                <Ionicons name="md-sad-outline" color={Colors.gray} size={50}/>
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={styles.notFoundText} >No data for "{cityInputValue}"</Text>
                            </View>
                        </View>
                    ) : (
                        <FlatList
                            data={searchedCities}
                            keyExtractor={item => item.id + ''}
                            renderItem={itemData => <CitySearchItem city={itemData.item} onSelect={onSelectCityHandler.bind(this)} />}
                        />
                    )}
                </View>
            </View>
        )
    }

    return (
        <View style={styles.screen}>
            <FlatList
                data={citiesWeather}
                keyExtractor={item => item.id + ''}
                numColumns={2}
                renderItem={itemData => <CityCardItem city={itemData.item} onSelect={onSelectCityHandler.bind(this)} />}
                refreshing={isLoading}
                onRefresh={() => loadCities()}
             />
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        backgroundColor: Colors.white,
        flex: 1,
        paddingHorizontal: 5
    },
    headSearch: {
        padding: 10
    },
    notFoundScreen: {
        justifyContent: 'center',
        alignItems: 'center',
        height: Dimensions.get('screen').height / 2
    },
    imgContainer: {
        backgroundColor: Colors.lightGray,
        padding: 40,
        borderRadius: 80
    },
    notFoundText: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    headSearchText: {
        fontWeight: 'bold'
    },
    textContainer: {
        padding: 10
    }
});

export default CityScreen;


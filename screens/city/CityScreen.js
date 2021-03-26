import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, View, Alert, ActivityIndicator, FlatList } from "react-native";
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
    const [error, setError] = useState(null);
    
    let timeoutId;
    const dispatch = useDispatch();

    const fetchCityByName = useCallback(async (text) => {
        setIsSearching(true);
        setIsLoading(true);
        try {
            await dispatch(citiesActions.getCitiesWeatherByName(text));
        } catch (err) {
            Alert.alert('Error', err.message, [{message: 'Okay'}]);
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
            Alert.alert('Error', err.message, [{text: 'Okay'}]);
            setError('Something went wrong during network call');
        }
        setIsLoading(false);
    }, [dispatch, setIsLoading]);

    
    useEffect(() => {
        loadCities();
    }, [loadCities]);

    useEffect(() => {
        navigation.setOptions({
            headerTitle: () => {
                return (
                  <SearchInput value={cityInputValue} onChangeText={textHandler}/>
                );
            }
        });
    }, []);

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

    if (error) {
        return (
            <View style={{...styles.screen, justifyContent: 'center', alignItems: 'center'}}>
                <Text>{error}</Text>
            </View>
        )
    }


    if (isLoading) {
        return (
            <View style={{...styles.screen, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size='large' color={Colors.primary} />
            </View>
        )
    }
    
    if (isSearching && cityInputValue.trim().length > 3) {
        if (searchedCities.length === 0) {
            return (
                <View style={styles.notFoundScreen}>
                    <View style={styles.imgContainer}>
                        <Ionicons name="md-sad-outline" color={Colors.gray} size={50}/>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.notFoundText} >No data for "{cityInputValue}"</Text>
                    </View>
                </View>
            )
        }
        return (
            <View style={styles.screen}>
                <View style={styles.headSearch}>
                    <Text style={styles.headSearchText}>SEARCH RESULTS</Text>
                </View>
                <View>
                <FlatList
                    data={searchedCities}
                    keyExtractor={item => item.id + ''}
                    renderItem={itemData => <CitySearchItem city={itemData.item} onSelect={onSelectCityHandler.bind(this)} />}
                    refreshing={isLoading}
                    onRefresh={() => fetchCityByName(cityInputValue)}
                />
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.white
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
    textContainer: {
        padding: 10
    },
    headSearchText: {
        fontWeight: 'bold'
    },
});

export default CityScreen;


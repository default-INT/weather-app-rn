import React, { useEffect, useState, useCallback } from "react";
import { View, StyleSheet, Alert, ActivityIndicator, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { citiesActions, locationActions } from "../../store/actions";
import { DailyItem } from "../../components";
import { AllowAccesScreen } from "../support-screen";
import Colors from "../../constants/color";

const DailyScreen = ({navigation, ...props}) => {
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

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.white
    },
    imgContainer: {
        backgroundColor: Colors.lightGray,
        padding: 40,
        borderRadius: 80,
        marginBottom: 50
    },
    notFoundText: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    textContainer: {
        padding: 10,
        justifyContent: 'space-between',
        alignItems: "center",
        height: 80,
    },
    messageText: {
        color: Colors.gray
    },
    accessButton: {
        backgroundColor: Colors.black,
        borderRadius: 8,
        overflow: 'hidden',
        paddingVertical: 10,
        paddingHorizontal: 30,
        marginTop: 20
    },
    accessButtonText: {
        color: Colors.white,
    }
});

export default DailyScreen;
import React, { useEffect, useState, useCallback } from "react";
import { View, StyleSheet, Alert, ActivityIndicator, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { citiesActions } from "../../store/actions";
import { DailyItem } from "../../components";
import Colors from "../../constants/color";

const DailyScreen = ({navigation, ...props}) => {
    const [isLoading, setIsLoading] = useState(false);
    const currentCityWeather = useSelector(state => state.cities.currentCityWeather);
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
            headerTitle: currentCityWeather.city,
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
    }
});

export default DailyScreen;
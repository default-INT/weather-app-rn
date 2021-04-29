import React, { useEffect } from "react";
import { ActivityIndicator, Button, FlatList, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { CityCardItem, CitySearchItem, SearchInput } from "../../../components";
import {DefaultText} from "../../../components/UI";
import Colors from "../../../constants/color";
import styles from "./styles";



const CityScreenView = (props) => {
    const {
        error,
        loadCities,
        isLoading,
        isSearching,
        cityInputValue,
        searchedCities,
        onSelectCityHandler,
        fetchCityByName,
        citiesWeather,
        textHandler,
        navigation
    } = props;

    useEffect(() => {
        navigation.setOptions({
            headerTitle: () => {
                return (
                    <SearchInput value={cityInputValue} onChangeText={textHandler} />
                );
            }
        });
    }, []);


    if (error) {
        return (
            <View style={{...styles.screen, justifyContent: 'center', alignItems: 'center'}}>
                <DefaultText>{error}</DefaultText>
                <View>
                    <Button title='Try again' color={Colors.black} onPress={() => loadCities()}/>
                </View>
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
                        <DefaultText style={styles.notFoundText} >No data for "{cityInputValue}"</DefaultText>
                    </View>
                </View>
            )
        }

        return (
            <View style={styles.screen}>
                <View style={styles.headSearch}>
                    <DefaultText style={styles.headSearchText}>SEARCH RESULTS</DefaultText>
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
}


export default CityScreenView;
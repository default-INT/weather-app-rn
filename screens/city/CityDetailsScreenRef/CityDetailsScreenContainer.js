import React, { useEffect } from "react";

import { convertDateFromUTC } from "../../../constants/utils";
import CityDetailsScreenView from "./CityDetailsScreenView";



const CityDetailsScreenContainer = ({ navigation, route, ...props }) => {
    const { weatherIcon, cityName, cityDt, cityWeather, cityTemp } = route.params;
    const date = convertDateFromUTC(cityDt);
    useEffect(() => {
        navigation.setOptions({
            headerTitle: cityName,
            headerTitleAlign: 'center'
        })
    }, []);
    return (
        <CityDetailsScreenView
            weatherIcon={weatherIcon}
            cityWeather={cityWeather}
            cityTemp={cityTemp}
            date={date}
        />
    )
};

export default CityDetailsScreenContainer;
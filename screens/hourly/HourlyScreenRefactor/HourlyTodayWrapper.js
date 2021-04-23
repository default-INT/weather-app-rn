import React, { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { citiesActions, locationActions } from "../../../store/actions";
import HourlyScreenContainer from "./HourlyScreenContainer";

const HourlyTodayWrapper = (props) => {

    const currentCityWeather = useSelector(state => state.cities.currentCityWeather);

    return (
        <HourlyScreenContainer
            loadWeatherAction={citiesActions.getCurrentCityWeather}
            currentCityWeather={currentCityWeather}
            {...props}
        />
    )
}

export default HourlyTodayWrapper;
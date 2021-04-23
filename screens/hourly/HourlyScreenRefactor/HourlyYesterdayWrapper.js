import React, { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { citiesActions, locationActions } from "../../../store/actions";
import HourlyScreenContainer from "./HourlyScreenContainer";

const HourlyYesterdayWrapper = props => {

    const currentCityWeather = useSelector(state => state.cities.currentCityWeatherYesterday);

    return (
        <HourlyScreenContainer
            loadWeatherAction={citiesActions.getYesterdayWeather}
            currentCityWeather={currentCityWeather}
            {...props}
        />
    )
}

export default HourlyYesterdayWrapper;
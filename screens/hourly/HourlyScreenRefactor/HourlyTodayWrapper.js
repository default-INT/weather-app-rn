import React from "react";
import {useSelector} from "react-redux";

import {citiesActions} from "../../../store/actions";
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
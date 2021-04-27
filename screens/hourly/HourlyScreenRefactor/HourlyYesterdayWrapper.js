import React, { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";
import FileViewer from 'react-native-file-viewer';
import * as FileSystem from "expo-file-system";
import { useDispatch, useSelector } from "react-redux";

import { citiesActions, locationActions } from "../../../store/actions";
import { CITY_FILE_NAME } from "../../../constants";
import HourlyScreenContainer from "./HourlyScreenContainer";

const HourlyYesterdayWrapper = props => {

    const currentCityWeather = useSelector(state => state.cities.currentCityWeatherYesterday);

    const onOpenFile = useCallback(async () => {
        try {
            await FileViewer.open(FileSystem.documentDirectory + CITY_FILE_NAME);
        } catch (err) {
            console.error(err.message);
        }
    }, []);

    return (
        <HourlyScreenContainer
            loadWeatherAction={citiesActions.getYesterdayWeather}
            currentCityWeather={currentCityWeather}
            onOpenFile={onOpenFile}
            {...props}
        />
    )
}

export default HourlyYesterdayWrapper;
import * as FileSystem from "expo-file-system";

import { CITIES } from "../../constants/types";
import { URL, APPID, CITY_FILE_NAME } from "../../constants";
import { eqDate } from "../../constants/utils";
import { DEFAULT_CITIES } from "../../data/dummy-data";



export const clearCities = () => {
    return {
        type: CITIES.SET_CITIES_WEATHER,
        payload: []
    }
}

export const getStaticCities = () => {
    return async dispatch => {
        const cities = [];
        for (const city of DEFAULT_CITIES) {
            const response = await fetch(`${URL}/weather?id=${city.id}&appid=${APPID}`);
            const fetchCity = await response.json();
            cities.push(fetchCity);
        }
        dispatch({
            type: CITIES.SET_CITIES_WEATHER,
            payload: cities
        });
    }
}

export const getCitiesInCircleWeather = cityCount => {
    return async (dispatch, getState) => {
        dispatch(clearCities());
        const { currentLocation } = getState().location;
        if (!currentLocation) {
            await dispatch(getStaticCities());
            return;
        }
        const response = await fetch(`${URL}/find?lat=${currentLocation.lat}&lon=${currentLocation.lon}&cnt=${cityCount}&appid=${APPID}`);
        if (!response.ok) {
            throw new Error("Can't fetch cities in circle");
        }

        const cities = await response.json();
        dispatch({
            type: CITIES.SET_CITIES_WEATHER,
            payload: cities.list
        });
    }
};

export const getCitiesWeatherByName = cityName => {
    return async dispatch => {
        const response = await fetch(`${URL}/find?q=${cityName}&appid=${APPID}`);
        if (!response.ok) {
            throw new Error("Can't fetch cities by name");
        }
        const cities = await response.json();
        dispatch({
            type: CITIES.GET_CITIES_WEATHER_BY_NAME,
            payload: cities.list
        });
    }
}

export const getCurrentCityWeather = () => {
    return async (dispatch, getState) => {
        // dispatch({
        //     type: CITIES.SET_CURRENT_CITY_WEATHER,
        //     payload: null
        // })
        const { currentLocation } = getState().location;
        let response = await fetch(`${URL}/weather?lat=${currentLocation.lat}&lon=${currentLocation.lon}&appid=${APPID}`);
        if (!response.ok) {
            throw new Error("Can't find city on current location.");
        }
        const city = await response.json();
        const currentCityDaily = {
            id: city.id,
            city: city.name
        }
        response = await fetch(`${URL}/onecall?lat=${currentLocation.lat}&lon=${currentLocation.lon}&exclude=current,minutely,alerts&appid=${APPID}`)
        if (!response.ok) {
            throw new Error("Can't fetch weather data on loaction");
        }
        const { daily, hourly } = await response.json();
        dispatch({
            type: CITIES.SET_CURRENT_CITY_WEATHER,
            payload: {
                ...currentCityDaily,
                daily,
                hourly
            }
        })
    }
}

export const getYesterdayWeather = () => {
    return async (dispatch, getState) => {
        const { currentLocation } = getState().location;
        const { currentCityWeather } = getState().cities;
        const currentDate = new Date();

        const filePath = FileSystem.documentDirectory + CITY_FILE_NAME;
        const dirInfo = await FileSystem.getInfoAsync(filePath);

        if (dirInfo.exists) {
            const cityWeatherStr = await FileSystem.readAsStringAsync(filePath);

            
            const { city, date, hourly } = JSON.parse(cityWeatherStr);
            
            const prevDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 1);
            console.log(date)
            console.log(prevDate.toISOString())
            console.log(eqDate(new Date(date), prevDate))
            if (currentCityWeather.city === city && eqDate(new Date(date), prevDate)) {
                dispatch({
                    type: CITIES.SET_YESTERDAY_WEATHER,
                    payload: hourly
                })
                return;
            }
        }
        console.log('fetch');
        const yesterdayDt = Math.floor((Date.now() - 86400000)/1000);
        const response = await fetch(`${URL}/onecall/timemachine?lat=${currentLocation.lat}&lon=${currentLocation.lon}&dt=${yesterdayDt}&appid=${APPID}`);
        if (!response.ok) {
            throw new Error("Can't fetch weather data on loaction");
        }
        const { hourly } = await response.json();
        const prevDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 1);
        FileSystem.writeAsStringAsync(filePath, JSON.stringify({
            date: prevDate.toISOString(),
            city: currentCityWeather.city,
            hourly
        }));
        console.log('write');
        dispatch({
            type: CITIES.SET_YESTERDAY_WEATHER,
            payload: hourly
        })
    }
}
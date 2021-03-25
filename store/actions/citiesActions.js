import { CITIES } from "../../constants/types";

const APPID = '49dd015e8b9932d12c318a4b55ecb544';

export const clearCities = () => {
    return {
        type: CITIES.SET_CITIES_WEATHER,
        payload: []
    }
}

export const getCitiesInCircleWeather = cityCount => {
    return async (dispatch, getState) => {
        dispatch(clearCities());
        const { currentLocation } = getState().location;
        if (!currentLocation) {
            throw new Error('Not found user loaction');
        }
        const response = await fetch(`https://api.openweathermap.org/data/2.5/find?lat=${currentLocation.lat}&lon=${currentLocation.lon}&cnt=${cityCount}&appid=${APPID}`);
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
        const response = await fetch(`https://api.openweathermap.org/data/2.5/find?q=${cityName}&appid=${APPID}`);
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
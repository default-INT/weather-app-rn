import { CITIES } from "../../constants/types";

const initialState = {
    citiesWeather: [],
    searchedCities: [],
    currentCityDaily: null
}


const handlers = {
    [CITIES.SET_CITIES_WEATHER]: (state, {payload}) => ({
        ...state,
        citiesWeather: payload
    }),
    [CITIES.GET_CITIES_WEATHER_BY_NAME]: (state, {payload}) => ({
        ...state,
        searchedCities: payload
    }),
    [CITIES.SET_CURRENT_CITY_DAILY]: (state, {payload}) => ({
        ...state,
        currentCityDaily: payload
    }),
    DEFAULT: state => state
}

export const citiesReducer = (state = initialState, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT;
    return handle(state, action)
}
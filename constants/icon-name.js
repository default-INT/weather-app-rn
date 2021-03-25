import {Platform} from 'react-native';

import Colors from './color';

const isIos = () => Platform.OS === 'ios';

export const WEATHER_ICONS = {
    'RAINY': {
        name: isIos() ? 'ios-raint' : 'md-rainy',
        color: Colors.gray
    },
    'SUNNY': {
        name: isIos() ? 'ios-sunny' : 'md-sunny',
        color: Colors.orange
    },
    'CLEAR': {
        name: isIos() ? 'ios-sunny' : 'md-sunny',
        color: Colors.orange
    },
    'CLOUDY': {
        name: isIos() ? 'ios-cloudy' : 'md-cloudy',
        color: Colors.gray
    },
    'CLOUDS': {
        name: isIos() ? 'ios-cloudy' : 'md-cloudy',
        color: Colors.gray
    },
    DEFAULT: {
        name: isIos() ? 'ios-sunny' : 'md-sunny',
        color: Colors.orange
    }
}
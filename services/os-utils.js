import {Platform} from "react-native";

export const getOsValue = (androidValue, iosValue) => {
    return Platform.OS === 'android' ? androidValue : iosValue;
}
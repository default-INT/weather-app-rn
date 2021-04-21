import * as Location from "expo-location";
import * as Permission from "expo-permissions";

import {LOCATION} from "../../constants/types";


const verifyPermissions = async () => {
    const result = await Permission.askAsync(Permission.LOCATION);
    if (result.status !== 'granted') {
        return false;
    }
    return true;
}

export const getCurrentLocation = () => {
    return async dispatch => {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            throw new Error('You need to grant locarion permissions to use this app.')
        }
        try {
            const location = await Location.getCurrentPositionAsync({
                timeInterval: 5000
            });
            const {latitude, longitude} = location.coords;
            dispatch({
                type: LOCATION.GET_CURRENT_LOCATION,
                payload: {
                    lat: latitude,
                    lon: longitude
                }
            });
        } catch (err) {
            throw err;
        }
    }
}
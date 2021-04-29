import React from "react";
import { Image } from "react-native";

import { WEATHER_URI_ICONS } from "../../constants"

const WeatherIcon = ({iconName, style, imageScale = 4, size = 50, ...props}) => {
    return (
        <Image style={{width: size, height: size, ...style }} {...props}
               source={{uri: `${WEATHER_URI_ICONS}/${iconName}@${imageScale}x.png`}} />
    )
};
export default WeatherIcon;
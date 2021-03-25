import React from "react";
import { TouchableNativeFeedback, TouchableOpacity, Platform } from "react-native";

const TouchableComponent = ({children, ...props}) => {
    const TouchableCmp = Platform.OS === "android" && Platform.Version >= 21 ? TouchableNativeFeedback : TouchableOpacity;
    return (
        <TouchableCmp {...props}>
            {children}
        </TouchableCmp>
    )
};

export default TouchableComponent;
import React from "react";
import {TouchableNativeFeedback} from "react-native";

const TouchableComponent = ({children, ...props}) => {
    return (
        <TouchableNativeFeedback {...props}>
            {children}
        </TouchableNativeFeedback>
    )
};

export default TouchableComponent;
import React from "react";
import {TouchableOpacity} from "react-native";

const TouchableComponent = ({children, ...props}) => {
    return (
        <TouchableOpacity {...props}>
            {children}
        </TouchableOpacity>
    )
};

export default TouchableComponent;
import React from "react";
import { ActivityIndicator } from "react-native";
import Config from "react-native-config";

const LargeLoader = props => {
    return (
        <ActivityIndicator size='large' color={Config.PRIMARY_COLOR} {...props} />
    )
}

export default LargeLoader;
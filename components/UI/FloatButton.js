import React from "react";
import {StyleSheet, TouchableOpacity, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import Config from "react-native-config";

import Colors from "../../constants/color";


const FloatButton = ({onPress, ...props}) => {
    return (
        <TouchableOpacity
            style={{...styles.touchableOpacityStyle, ...props.style}}
            onPress={onPress}
        >
            <Ionicons name='folder-open' color={Colors.white} size={30}
                      {...props} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    touchableOpacityStyle: {
        position: 'absolute',
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30,
        backgroundColor: Config.PRIMARY_COLOR,
        borderRadius: 80,

    },
    floatingButtonStyle: {
        resizeMode: 'contain',
        width: 50,
        height: 50
    }
});

export default FloatButton;
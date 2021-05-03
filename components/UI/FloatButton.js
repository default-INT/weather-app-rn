import React from "react";
import {StyleSheet, TouchableOpacity} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import Config from "react-native-config";

import Colors from "../../constants/color";


const FloatButton = ({onPress, ...props}) => {
    return (
        <TouchableOpacity
            style={styles.touchableOpacityStyle}
            onPress={onPress}
            {...props}
        >
            <Ionicons name='folder-open' color={Colors.white} size={30} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btnContainer: {
        borderRadius: 20,
        backgroundColor: Config.PRIMARY_COLOR
    },
    touchableOpacityStyle: {
        position: 'absolute',
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30,
        backgroundColor: Config.PRIMARY_COLOR,
        elevation: 10,
        borderRadius: 80,
        shadowRadius: 5,
        shadowColor: Colors.black,
        shadowOffset: {
            width: 10,
            height: 10
        }
    },
    floatingButtonStyle: {
        resizeMode: 'contain',
        width: 50,
        height: 50
    }
});

export default FloatButton;
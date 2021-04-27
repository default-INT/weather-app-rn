import React from "react";
import {View, StyleSheet} from "react-native";
import {Ionicons} from "@expo/vector-icons";

import TouchableComponent from "./TouchableComponent";
import Colors from "../../constants/color";


const FloatButton = ({onPress, ...props}) => {
    return (
        <TouchableComponent
            activeOpacity={0.7}
            style={styles.touchableOpacityStyle}
            onPress={onPress}
            {...props}
        >
            <Ionicons name='folder-open' color={Colors.white} size={30} />
        </TouchableComponent>
    )
}

const styles = StyleSheet.create({
    btnContainer: {
        borderRadius: 20,
        backgroundColor: Colors.primary
    },
    touchableOpacityStyle: {
        position: 'absolute',
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30,
        backgroundColor: Colors.primary,
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
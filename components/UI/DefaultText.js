import React from "react";
import {Text, StyleSheet} from "react-native";
import Config from "react-native-config";


const DefaultText = ({style, children, ...props}) => {
    return <Text style={{...styles.text, ...style}}>{children}</Text>
};

const styles = StyleSheet.create({
    text: {
        color: Config.TEXT_COLOR,
        fontFamily: 'Roboto-Regular'
    }
});

export default DefaultText;
import React from "react";
import {Text, StyleSheet} from "react-native";

import Colors from "../../constants/color";

const DefaultText = ({style, children, ...props}) => {
    return <Text style={{...styles.text, ...style}}>{children}</Text>
};

const styles = StyleSheet.create({
    text: {
        color: Colors.black,
        fontFamily: 'Roboto-Regular'
    }
});

export default DefaultText;
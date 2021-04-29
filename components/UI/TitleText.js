import React from "react";
import {StyleSheet} from "react-native";

import DefaultText from "./DefaultText";

const TitleText = ({style, children, ...props}) => {
    return <DefaultText style={{...styles.titleText, ...style}}>{children}</DefaultText>
};

const styles = StyleSheet.create({
    titleText: {
        fontSize: 18,
        fontFamily: "Roboto-Bold"
    },
});

export default TitleText;
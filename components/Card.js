import React from 'react';
import { View, StyleSheet } from 'react-native';
import Config from "react-native-config";

const Card = props => {
    return <View style={{...styles.card, ...props.style}}>{props.children}</View>;
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 10,
        backgroundColor: Config.MAIN_COLOR
    }
});

export default Card;

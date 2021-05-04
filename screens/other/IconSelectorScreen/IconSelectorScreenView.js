import React from "react";
import {View, Image, Button, Text, StyleSheet, TouchableOpacity} from "react-native";
import Config from "react-native-config";
import {MaterialIcons} from "@expo/vector-icons";

import {TouchableComponent} from "../../../components/UI";
import {BottomSheet, ListItem} from "react-native-elements";

const IconSelectorScreenView = props => {
    const {
        profileImage,
        visibleBottomSheet,
        onAlertImageChoice
    } = props;
    return (
        <View style={styles.screen}>
            <View style={styles.imageContainer}>
                <View style={styles.touchable}>
                <TouchableOpacity useForeground onPress={onAlertImageChoice} >
                    <Image
                        style={styles.image}
                        source={profileImage ? require('../../../assets/my-adaptive-icon.png') : require('../../../assets/my-adaptive-icon.png')}
                    />
                </TouchableOpacity>
                </View>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Config.MAIN_COLOR
    },
    touchable: {
        borderRadius: 100,
        overflow: 'hidden'
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 100,
        borderWidth: 10,
        borderColor: Config.PRIMARY_COLOR
    },
    imageContainer: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 10
    }
});

export default IconSelectorScreenView;
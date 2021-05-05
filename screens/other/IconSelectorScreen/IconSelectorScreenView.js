import React from "react";
import {Image, StyleSheet, TouchableOpacity, View} from "react-native";
import Config from "react-native-config";

import {LargeLoader} from "../../../components/UI";

const IconSelectorScreenView = props => {
    const {
        onAlertImageChoice,
        imgUri,
        loading
    } = props;
    return (
        <View style={styles.screen}>
            <View style={styles.imageContainer}>
                <View style={styles.touchable}>
                <TouchableOpacity useForeground onPress={onAlertImageChoice} >
                    {loading ? <LargeLoader/> : <Image
                        style={styles.image}
                        source={imgUri ? {uri: imgUri} : require('../../../assets/my-adaptive-icon.png')}
                    />}
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
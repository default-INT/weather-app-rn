import React from "react";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Config from "react-native-config";

import {DefaultText, TouchableComponent} from "../../components/UI";
import Colors from "../../constants/color";


const AllowAccesScreen = ({allowAccesHandler, ...props}) => {
    return (
        <View style={styles.screen}>
            <View style={styles.imgContainer}>
                <Ionicons name="md-sad-outline" color={Colors.gray} size={80}/>
            </View>
            <View style={styles.textContainer}>
                <DefaultText style={styles.notFoundText} >Data is not available</DefaultText>
                <DefaultText style={styles.messageText}>Cannot determinate your current location</DefaultText>
            </View>
            <View style={styles.accessButton}>
                <TouchableComponent useForeground onPress={allowAccesHandler}>
                    <View>
                        <DefaultText style={styles.accessButtonText}>Allow access</DefaultText>
                    </View>
                </TouchableComponent>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Config.MAIN_COLOR,
        justifyContent: 'center',
        alignItems: 'center'
    },
    notFoundText: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    textContainer: {
        padding: 10,
        justifyContent: 'space-between',
        alignItems: "center",
        height: 80,
    },
    messageText: {
        color: Config.TEXT_COLOR
    },
    accessButton: {
        backgroundColor: Config.TEXT_COLOR,
        borderRadius: 8,
        overflow: 'hidden',
        paddingVertical: 10,
        paddingHorizontal: 30,
        marginTop: 20
    },
    accessButtonText: {
        color: Config.MAIN_COLOR,
    }
});

export default AllowAccesScreen;
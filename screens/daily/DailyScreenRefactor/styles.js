import { StyleSheet } from "react-native";

import Colors from "../../../constants/color";


export default StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.white,
        paddingHorizontal: '5%'
    },
    imgContainer: {
        backgroundColor: Colors.lightGray,
        padding: 40,
        borderRadius: 80,
        marginBottom: 50
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
        color: Colors.gray
    },
    accessButton: {
        backgroundColor: Colors.black,
        borderRadius: 8,
        overflow: 'hidden',
        paddingVertical: 10,
        paddingHorizontal: 30,
        marginTop: 20
    },
    accessButtonText: {
        color: Colors.white,
    }
});
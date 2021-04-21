import {StyleSheet} from "react-native";

import Colors from "../../../constants/color";

export default StyleSheet.create({
    screen: {
        backgroundColor: Colors.white,
        flex: 1,
        paddingHorizontal: 5
    },
    headSearch: {
        padding: 10
    },
    notFoundScreen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.white
    },
    imgContainer: {
        backgroundColor: Colors.lightGray,
        padding: 40,
        borderRadius: 80
    },
    notFoundText: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    textContainer: {
        padding: 10
    },
    headSearchText: {
        fontWeight: 'bold'
    },
});

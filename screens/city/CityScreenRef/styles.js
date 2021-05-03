import {StyleSheet} from "react-native";
import Config from "react-native-config";

export default StyleSheet.create({
    screen: {
        backgroundColor: Config.MAIN_COLOR,
        flex: 1,
        paddingHorizontal: '5%'
    },
    headSearch: {
        padding: 10
    },
    notFoundScreen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Config.MAIN_COLOR
    },
    imgContainer: {
        backgroundColor: Config.LIGHT_GRAY,
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

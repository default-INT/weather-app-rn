import {StyleSheet} from "react-native";
import Config from "react-native-config";


export default StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Config.MAIN_COLOR
    },
    weatherContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    weather: {
        paddingVertical: 5
    },
    title: {
        padding: 10,
        alignItems: 'center',
    },
    titleText: {
        fontSize: 20
    },
    weatherText: {
        fontSize: 20
    }
});

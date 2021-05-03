import {StyleSheet} from "react-native";
import Config from "react-native-config";

export default StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Config.MAIN_COLOR,
        paddingHorizontal: '5%'
    }
});
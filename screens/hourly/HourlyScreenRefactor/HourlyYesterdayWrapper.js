import React, {useCallback, useState} from "react";
import {Alert, Platform, PermissionsAndroid} from "react-native";
import FileViewer from 'react-native-file-viewer';
import * as FileSystem from "expo-file-system";
import * as RNFileSystem from "react-native-fs";
import {Notifications} from "react-native-notifications";
import {useSelector} from "react-redux";
import {BottomSheet, ListItem} from "react-native-elements";

import {citiesActions} from "../../../store/actions";
import {CITY_FILE_NAME} from "../../../constants";
import HourlyScreenContainer from "./HourlyScreenContainer";

const HourlyYesterdayWrapper = props => {
    const [visibleBottomSheet, setVisibleBottomSheet] = useState(false);
    const currentCityWeather = useSelector(state => state.cities.currentCityWeatherYesterday);

    const filePath = FileSystem.documentDirectory + CITY_FILE_NAME;

    const bottomSheetItems = [
        { title: 'Download file', onPress: () => onDownloadFile() },
        { title: 'Open file', onPress: () => onOpenFile() },
        {
            title: 'Cancel',
            containerStyle: { backgroundColor: 'red' },
            titleStyle: { color: 'white' },
            onPress: () => setVisibleBottomSheet(false),
        },
    ];

    const onDownloadFile = async () => {
        try {
            const result = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
            if (!result) {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: "Write External Permission",
                        message:
                            "WeatherApp needs access to your external storage.",
                        buttonNeutral: "Ask Me Later",
                        buttonNegative: "Cancel",
                        buttonPositive: "OK"
                    }
                );
                if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                    Alert.alert('Warning', "You can't write to external storage!", [{text: 'Ok'}]);
                    return;
                }
            }
            await RNFileSystem.copyFile(filePath,RNFileSystem.DownloadDirectoryPath + "/" + CITY_FILE_NAME);
            Notifications.postLocalNotification({
                body: "File with yesterday forecast succesfully donwloaded",
                title: "File Downloaded",
                sound: "chime.aiff",
                category: "SOME_CATEGORY",
                link: "localNotificationLink",
                fireDate: new Date(),
            });
            Alert.alert('Success', 'File downloaded success', [{ text: 'Ok' }]);
            setVisibleBottomSheet(false);
            onOpenFile(RNFileSystem.DownloadDirectoryPath + "/" + CITY_FILE_NAME);
        } catch (err) {
            Alert.alert('Error', err.message, [{text: 'Ok'}]);
        }
    }

    const onPressFloatButton = async () => {
        if (Platform.OS === 'android') {
            setVisibleBottomSheet(true);
            return;
        } else {
            Notifications.postLocalNotification({
                body: "File with yesterday forecast succesfully donwloaded",
                title: "File Downloaded",
                sound: "chime.aiff",
                category: "SOME_CATEGORY",
                link: "localNotificationLink",
                fireDate: new Date(),
            });
        }
        onOpenFile(filePath);
    }

    const BottomSheetManager = () => {
        return (
            <BottomSheet
                isVisible={visibleBottomSheet}
                containerStyle={{ backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)' }}
            >
                {bottomSheetItems.map((l, i) => (
                    <ListItem key={i} containerStyle={l.containerStyle} onPress={l.onPress}>
                        <ListItem.Content>
                            <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                ))}
            </BottomSheet>
        )
    }

    const onOpenFile = useCallback(async (path) => {
        try {
            await FileViewer.open(FileSystem.documentDirectory + CITY_FILE_NAME);
            setVisibleBottomSheet(false);
        } catch (err) {
            Alert.alert('Error', err.message, [{ text: 'Okay' }]);
            console.log(err.message);
        }
    }, []);



    return (
        <HourlyScreenContainer
            loadWeatherAction={citiesActions.getYesterdayWeather}
            currentCityWeather={currentCityWeather}
            onOpenFile={() => onOpenFile(filePath)}
            onPressFloatButton={onPressFloatButton}
            BottomSheetManager={BottomSheetManager}
            {...props}
        />
    )
}

export default HourlyYesterdayWrapper;
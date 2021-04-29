import React, {useCallback, useState} from "react";
import {Alert, Platform} from "react-native";
import FileViewer from 'react-native-file-viewer';
import * as FileSystem from "expo-file-system";
import * as RNFileSystem from "react-native-fs";
import * as Permissions from "expo-permissions";
import {useSelector} from "react-redux";

import {citiesActions} from "../../../store/actions";
import {CITY_FILE_NAME} from "../../../constants";
import HourlyScreenContainer from "./HourlyScreenContainer";
import {BottomSheet, ListItem} from "react-native-elements";

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

        // const permission = await MediaLibrary.getPermissionsAsync();
        // const askPermission = await MediaLibrary.requestPermissionsAsync();
        // const result = await MediaLibrary.createAssetAsync(filePath);
        // console.log(permission);
        // const data = await RNFileSystem.readFile(filePath);
        // console.log(filePath);
        const res = await RNFileSystem.copyFile(filePath,RNFileSystem.DownloadDirectoryPath + "/" + CITY_FILE_NAME);
        console.log(res);
        console.log(RNFileSystem.DownloadDirectoryPath)
    }

    const onPressFloatButton = () => {
        if (Platform.OS === 'android') {
            setVisibleBottomSheet(true);
            return;
        }
        onOpenFile();
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

    const onOpenFile = useCallback(async () => {
        try {
            await FileViewer.open(filePath);
        } catch (err) {
            Alert.alert('Error', err.message, [{ message: 'Okay' }]);
            console.log(err.message);
        }
    }, []);



    return (
        <HourlyScreenContainer
            loadWeatherAction={citiesActions.getYesterdayWeather}
            currentCityWeather={currentCityWeather}
            onOpenFile={onOpenFile}
            onPressFloatButton={onPressFloatButton}
            BottomSheetManager={BottomSheetManager}
            {...props}
        />
    )
}

export default HourlyYesterdayWrapper;
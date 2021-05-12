import React, {useEffect, useState} from "react";
import {Alert} from "react-native";
import * as Permission from "expo-permissions";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from "@react-native-async-storage/async-storage";

import IconSelectorScreenView from "./IconSelectorScreenView";
import {PermissionsAndroid} from "react-native";

const IconSelectorScreenContainer = props => {

    const [imgUri, setImgUri] = useState(null);
    const [loading, setLoading] = useState(false);

    const readItem = async () => {
        setLoading(true);
        try {
            console.log('read')
            const uri = await AsyncStorage.getItem('@user_photo');
            setImgUri(uri);
        } catch (err) {
            console.warn(err.message);
            Alert.alert('Error', err.message, [{text: 'Ok'}]);
        }
        setLoading(false);
    }

    const saveImageInStorage = async imgResponse => {
        try {
            if (imgResponse.didCancel) {
                return;
            }
            await AsyncStorage.setItem('@user_photo', imgResponse.uri);
            setImgUri(imgResponse.uri);
        } catch (err) {
            console.warn(err.message);
        }
    }

    const verifyCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: "Cool Photo App Camera Permission",
                    message:
                        "Cool Photo App needs access to your camera " +
                        "so you can take awesome pictures.",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the camera");
            } else {
                console.log("Camera permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    }

    const onOpenCamera = async () => {
        try {
            await verifyCameraPermission();
            const options = {
                mediaType: "photo",
                cameraType: 'front',
                saveToPhotos: true
            }
            launchCamera(options, response => {
                saveImageInStorage(response);
            })
        } catch (err) {
            Alert.alert('Error', "Camera permission denied", [{text: 'Ok'}]);
        }

    }

    const onOpenGallery = () => {
        launchImageLibrary({
            mediaType: 'photo'
        }, response => {
            saveImageInStorage(response);
        })
    }

    const onAlertImageChoice = () => Alert.alert(
        "Select image",
        "Take photo or select image",
        [
            {
                text: "Cancel",
                style: "destructive"
            },
            { text: "Take photo", onPress: () => onOpenCamera() },
            { text: "Select image", onPress: () => onOpenGallery() },
        ]
    );

    useEffect(() => {
        readItem();
    }, []);

    return (
        <IconSelectorScreenView
            loading={loading}
            onAlertImageChoice={onAlertImageChoice}
            imgUri={imgUri}
        />
    )
}

export const iconSelectorScreenOptions = {
    headerTitle: 'Image selector'
}

export default IconSelectorScreenContainer;
import React from "react";
import {Alert} from "react-native";

import IconSelectorScreenView from "./IconSelectorScreenView";

const IconSelectorScreenContainer = props => {

    const onAlertImageChoice = () => Alert.alert(
        "Select image",
        "Take photo or select image",
        [
            {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "destructive"
            },
            { text: "Take photo", onPress: () => console.log("OK Pressed") },
            { text: "Select image", onPress: () => console.log("Select image") },
        ]
    );


    return (
        <IconSelectorScreenView
            onAlertImageChoice={onAlertImageChoice}
        />
    )
}

export const iconSelectorScreenOptions = {
    headerTitle: 'Image selector'
}

export default IconSelectorScreenContainer;
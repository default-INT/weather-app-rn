import React, { useEffect, useState } from "react";
import { StyleSheet, TextInput, View, TouchableWithoutFeedback } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import Colors from "../constants/color";


const SearchInput = ({value, onChangeText = () => '', ...props}) => {
    const [inputValue, setInputValue] = useState(value || '');

    useEffect(() => {
        onChangeText(inputValue);
    }, [inputValue]);

    const textChangeHandler = text => {
        setInputValue(text);
    }

    return (
        <View style={styles.search}>
            <MaterialIcons name='search' size={20} color={Colors.whitesmoke}/>
            <TextInput 
                {...props}
                style={styles.searchInput} 
                placeholder='Enter city here'
                onChangeText={textChangeHandler}
                value={inputValue}
            />
            <TouchableWithoutFeedback onPress={() => textChangeHandler('')}>
                <MaterialIcons style={{opacity: inputValue !== '' ? 1 : 0}} name='cancel' size={20} color={Colors.whitesmoke}/>
            </TouchableWithoutFeedback>
        </View>
    );
}

const styles = StyleSheet.create({
    search: {
        borderColor: Colors.whitesmoke,
        borderWidth: 1,
        padding: 8,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10
    },
    iconContainer: {
        padding: 3,
        borderRadius: 20
    },
    searchInput: {
        color: Colors.black,
        width: '80%',
    }
});

export default SearchInput;
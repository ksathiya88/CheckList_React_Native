import React from 'react';
import {TextInput, View, Text} from 'react-native';

const Input = ({
                   label,
                   value,
                   onChangeText,
                   placeholder,
                   secureTextEntry,
                   onBlur,
                   onError
               }) => {
    let {inputStyle, labelStyle, containerStyle} = styles;
    if (onError) {
        inputStyle = styles.inputErrorStyle;
    }
    return (
        <View style={containerStyle}>
            <Text style={labelStyle}>{label}</Text>
            <TextInput
                secureTextEntry={secureTextEntry}
                placeholder={placeholder}
                autoCorrect={false}
                style={inputStyle}
                value={value}
                onChangeText={onChangeText}
                onBlur={onBlur}
            />
        </View>
    );
};

const styles = {
    inputStyle: {
        color: '#007aff',
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 18,
        lineHeight: 23,
        flex: 2,
    },
    inputErrorStyle: {
        borderColor: 'red',
        borderWidth: 3,
        color: '#007aff',
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 18,
        lineHeight: 23,
        flex: 2,
    },
    labelStyle: {
        fontSize: 18,
        paddingLeft: 20,
        flex: 1,
    },
    labelStyleBold: {
        fontSize: 18,
        paddingLeft: 20,
        flex: 1,
    },
    containerStyle: {
        height: 40,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
};

export {Input};

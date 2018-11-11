import React from 'react';
import { View, Text } from 'react-native';

class HelloThere extends React.Component {
    clickMe() {
        Alert.alert('hi!');
    }
    render() {
        console.log('Hello');
        return (
            <View>
                <Text>Hello1111122233</Text>
            </View>
        );
    }
}

export default HelloThere;

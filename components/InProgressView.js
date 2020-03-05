import React from 'react';
import {View, Text, StyleSheet} from "react-native";

const InProgressView = ({textToShow}) => {
    return (
        <View style={styles.inputViewStyle, {fontSize: 25}}>
            <Text style={{fontSize: 30, textAlign: 'center'}}>{textToShow}</Text>
        </View>
    );
};

export default InProgressView;

const styles = StyleSheet.create({
    inputViewStyle: {
        height: 49.5, right: 0, left: 80, top: 100, borderColor: 'white', borderWidth: 1, position: 'absolute'
    }
});
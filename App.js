import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';  //refer to https://reactnavigation.org/docs/en/stack-navigator.html
import LoginView from "./components/Login";
import RegistView from "./components/regist/RegistView";

const Stack = createStackNavigator();

export default class FSDemoApp extends Component {
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Home" component={LoginView} />
                    <Stack.Screen name="Details" component={RegistView} /> 
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF"
    },
    welcome: { fontSize: 20, textAlign: "center", margin: 10 },
    instructions: { textAlign: "center", color: "#333333", marginBottom: 5 }
});

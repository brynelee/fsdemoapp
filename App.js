import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import LoginView from "./components/Login"
import { name as appName } from './app.json';


export default class FSDemoApp extends Component {
    render() {
        return (
            <LoginView>
                
            </LoginView>
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

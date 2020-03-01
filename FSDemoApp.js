import React, { Component } from "react";
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';  //refer to https://reactnavigation.org/docs/en/stack-navigator.html
import {LoginViewConnected} from "./pages/login";
import {RegistView} from "./pages/registration";
import {UserHome} from "./pages/userhome";
import {LocalTest} from "./pages/localtest";

const Stack = createStackNavigator();

export default class FSDemoApp extends Component {
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home"
                screenOptions={{
                    headerStyle: {
                      backgroundColor: '#f4511e',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                      fontWeight: 'bold',
                    },
                  }}>
                    <Stack.Screen name="Home" component={LoginViewConnected} />
                    <Stack.Screen name="Details" component={RegistView} /> 
                    <Stack.Screen name="UserHome" component={UserHome} />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}






import React, { Component } from "react";
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';  //refer to https://reactnavigation.org/docs/en/stack-navigator.html
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {LoginViewConnected} from "./pages/login";
import {RegistView} from "./pages/registration";
import {UserHome} from "./pages/userhome";
import {LocalTest} from "./pages/localtest";
import ProductList from "./pages/productlist/view/ProductList";

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

function UserArea() {
  return (
    <Tab.Navigator tabBarOptions={{activeTintColor: 'red', inactiveTintColor: 'blue'}}>
      <Tab.Screen name="UserHome" component={UserHome} />
      <Tab.Screen name="ProductList" component={ProductList} />
    </Tab.Navigator>
  );
}

export default class FSDemoAppNav extends Component {
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
                    <Stack.Screen name="UserArea" component={UserArea} />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}






import React, { Component } from "react";
import {Image} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';  //refer to https://reactnavigation.org/docs/en/stack-navigator.html
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MaterialCommunityIcons} from 'react-native-vector-icons';
import {LoginViewConnected} from "./pages/login";
import {RegistView} from "./pages/registration";
import {UserHome} from "./pages/userhome";
import {LocalTest} from "./pages/localtest";
import ProductList from "./pages/productlist/view/ProductList";

import {HomeIcon, ProductIcon, ProfileIcon} from './resources';

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

function UserArea() {
  return (
    <Tab.Navigator initialRouteName="UserHome" tabBarOptions={{activeTintColor: 'red', inactiveTintColor: 'blue'}}>
      <Tab.Screen name="UserHome" component={UserHome} 
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: () => (
            <Image source={HomeIcon} style={{ height: 20, width: 20 }} />
          ),
        }}
      />
      <Tab.Screen name="ProductList" component={ProductList} 
        options={{
          tabBarLabel: 'ProductList',
          tabBarIcon: () => (
            <Image source={ProductIcon} style={{ height: 20, width: 20 }} />
          ),
        }}/>
      <Tab.Screen name="Profile" component={ProductList} 
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: () => (
            <Image source={ProfileIcon} style={{ height: 20, width: 20 }} />
          ),
        }}/>
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






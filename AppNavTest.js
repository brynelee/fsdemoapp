import * as React from 'react';
import { Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

import HomeIcon from './resources'; 
import ProductIcon from './resources';
import ProfileIcon from './resources';

function Feed() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Feed!</Text>
    </View>
  );
}

function Profile() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Profile!</Text>
    </View>
  );
}

function Notifications() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Notifications!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      tabBarOptions={{
        activeTintColor: '#e91e63',
      }}
    >
      <Tab.Screen
        name="Feed"
        component={Feed}
        options={{
            tabBarIcon: () => (
                <Image source={HomeIcon} style={{ height: 20, width: 20 }} />
            ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{
            tabBarIcon: () => (
                <Image source={ProductIcon} style={{ height: 20, width: 20 }} />
            ),
          }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
            tabBarIcon: () => (
                <Image source={ProfileIcon} style={{ height: 20, width: 20 }} />
            ),
          }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}

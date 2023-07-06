import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Profile from '../../screens/profile/profile';
import ListItem from '../../screens/home/listview/listitem';
import Home from '../../screens/home/home';

function SettingsScreen() {
  console.log('12');
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

const Buttombar = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 25,
          left: 20,
          right: 20,
          borderRadius: 20,
          height: 60,
          paddingBottom: 10,
          backgroundColor: '#ffffff',
          ...styles.shadow,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
              <Image
                source={require('../../../../assets/iconpng/home.png')}
                style={{width: 20, height: 20}}
                resizeMode="contain"
                tintColor={focused ? '#e32f45' : '#748c94'}
              />
              <Text style={{color: focused ? '#e32f45' : '#748c94'}}>home</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                top: -15,
                position: 'absolute',
                width: 50,
                height: 50,
                borderRadius: 100,
                backgroundColor: 'green',
              }}>
              <Image
                source={require('../../../../assets/iconpng/add.png')}
                style={{width: 20, height: 20}}
                resizeMode="contain"
                tintColor={focused ? '#e32f45' : '#748c94'}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
              <Image
                source={require('../../../../assets/iconpng/user.png')}
                style={{width: 20, height: 20}}
                resizeMode="contain"
                tintColor={focused ? '#e32f45' : '#748c94'}
              />
              <Text style={{color: focused ? '#e32f45' : '#748c94'}}>
                profile
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Buttombar;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 20,
  },
});

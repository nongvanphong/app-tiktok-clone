/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import type {PropsWithChildren} from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {NavigationContainer} from '@react-navigation/native';
import {Learns} from './src/learns/index';
import {Index} from './src/app';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './src/app/screens/login/login';
import Home from './src/app/screens/home/home';
import Buttombar from './src/app/components/buttombar/buttombar';
const windowHeight = Dimensions.get('window').height;
type SectionProps = PropsWithChildren<{
  title: string;
}>;
const Stack = createNativeStackNavigator();
function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    // backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    backgroundColor: isDarkMode ? '#000' : '#000',
  };

  return (
    <SafeAreaView style={[backgroundStyle, styles.SafeAreaViewContainer]}>
      {/* <Learns.Lap1></Learns.Lap1> */}

      {/* <Index.Home /> */}
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="home"
            component={Buttombar}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="selectvideo"
            component={Index.SelectVideoScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="livevideo"
            component={Index.LiveVideoScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: true,
              title: 'Đăng kí',
              headerTitleAlign: 'center',
            }}
          />
          <Stack.Screen
            name="Login1"
            component={Index.Logins}
            options={{
              headerShown: true,
              title: 'Đăng nhập',
              headerTitleAlign: 'center',
            }}
          />
          <Stack.Screen
            name="Register"
            component={Index.Register}
            options={{
              headerShown: true,
              title: 'Đăng kí',
              headerTitleAlign: 'center',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  SafeAreaViewContainer: {
    height: windowHeight,
    backgroundColor: '#000',
  },
});

export default App;

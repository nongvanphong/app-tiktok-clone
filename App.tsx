/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import type {PropsWithChildren} from 'react';
import {
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

type SectionProps = PropsWithChildren<{
  title: string;
}>;
const Stack = createNativeStackNavigator();
function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={[backgroundStyle, styles.SafeAreaViewContainer]}>
      {/* <Learns.Lap1></Learns.Lap1> */}
      {/* <Index.Home /> */}
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Buttombar}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="home"
            component={Buttombar}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  SafeAreaViewContainer: {
    flex: 1,
  },
});

export default App;

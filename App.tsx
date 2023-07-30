/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {createContext, useEffect} from 'react';
import type {PropsWithChildren} from 'react';
import {
  Button,
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
import Toast from 'react-native-toast-message';
import {useContext} from 'react';
const windowHeight = Dimensions.get('window').height;
type SectionProps = PropsWithChildren<{
  title: string;
}>;
const Stack = createNativeStackNavigator();

// Tạo Context
export const MyAlertContext = createContext<MyAlert>({} as MyAlert);

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    // backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    backgroundColor: isDarkMode ? '#000' : '#000',
  };

  const showToast = (title: string, type: string, msg: string) => {
    Toast.show({
      type: type,
      text1: title,
      text2: msg,
      visibilityTime: 1000,
    });
  };
  return (
    <MyAlertContext.Provider value={{showToast}}>
      <SafeAreaView style={[backgroundStyle, styles.SafeAreaViewContainer]}>
        {/* <Learns.Lap1></Learns.Lap1> */}

        {/* <Index.Home /> */}
        <NavigationContainer>
          <View>
            <View style={{zIndex: 100}}>
              <Toast />
            </View>
          </View>
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
            <Stack.Screen
              name="Setting"
              component={Index.Setting}
              options={{
                headerShown: true,
                title: 'Cài đặt',
                headerTitleAlign: 'center',
              }}
            />
            <Stack.Screen
              name="update name"
              component={Index.UpdateName}
              options={{
                headerShown: true,
                title: 'Tên',
                headerTitleAlign: 'center',
              }}
            />
            <Stack.Screen
              name="update password"
              component={Index.UpdatePassword}
              options={{
                headerShown: true,
                title: 'Mật khẩu',
                headerTitleAlign: 'center',
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </MyAlertContext.Provider>
  );
}

const styles = StyleSheet.create({
  SafeAreaViewContainer: {
    height: windowHeight,
    backgroundColor: '#000',
  },
});

export default App;

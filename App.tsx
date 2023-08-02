/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {createContext, useEffect, useState} from 'react';
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

import PushNotification from 'react-native-push-notification';

import {NavigationContainer} from '@react-navigation/native';
import {Learns} from './src/learns/index';
import {Index} from './src/app';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './src/app/screens/login/login';
import Home from './src/app/screens/home/home';
import Buttombar from './src/app/components/buttombar/buttombar';
import Toast from 'react-native-toast-message';
import io from 'socket.io-client';

import {useContext} from 'react';
import {api, http} from './src/servers/api/api';
import {LocalStorage} from './src/app/localStorage/LocalStorage';
import {User} from './src/interface/InterfaceUser';
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

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const connectSocket = async () => {
      try {
        const result = await LocalStorage.getData('user');

        // Sử dụng await để chờ kết nối socket hoàn tất
        const newSocket = await io(http);
        setSocket(newSocket);

        if (!result) {
          console.log('Bạn cần phải đăng nhập');
          return;
        }

        const handleNotify = data => {
          console.log('Nhận tin nhắn từ máy chủ:', data);
          showToast1(
            'Bạn có 1 thông báo mới',
            'success',
            `${data.username} đã bình luận: ${data.mesenger}`,
          );
          // Xử lý dữ liệu nhận được từ máy chủ tại đây (nếu cần)
        };

        // Lắng nghe sự kiện 'notify'
        newSocket.on('notify', handleNotify);

        // Gửi một sự kiện 'userLogin' ngay sau khi kết nối thành công và truyền thông tin user
        newSocket.emit('userLogin', {userId: result.id});

        // Hủy lắng nghe sự kiện 'notify' khi component bị unmount
        return () => {
          newSocket.off('notify', handleNotify);
        };
      } catch (error) {
        console.error('Lỗi khi kết nối socket:', error);
      }
    };

    // Gọi hàm tạo kết nối
    connectSocket();
  }, []);

  const showToast = (title: string, type: string, msg: string) => {
    Toast.show({
      type: type,
      text1: title,
      text2: msg,
      visibilityTime: 1000,
    });
  };
  const showToast1 = (title: string, type: string, msg: string) => {
    Toast.show({
      type: type,
      text1: title,
      text2: msg,

      visibilityTime: 5000,
    });
  };
  return (
    <MyAlertContext.Provider value={{showToast, showToast1, socket}}>
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
            <Stack.Screen
              name="notify"
              component={Index.Notify}
              options={{
                headerShown: true,
                title: 'Thông báo',
                headerTitleAlign: 'center',
              }}
            />
            <Stack.Screen
              name="list Video"
              component={Index.ListVideo}
              options={{
                headerShown: true,
                title: 'Danh sách video',
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

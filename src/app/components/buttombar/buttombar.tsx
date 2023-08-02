import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';
import React, {useEffect} from 'react';
import Toast from 'react-native-toast-message';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Profile from '../../screens/profile/profile';
import ListItem from '../../screens/home/listview/listitem';
import Home from '../../screens/home/home';
import Add from '../../screens/add/Add';
import PushNotification from 'react-native-push-notification';
import Notify from '../../screens/notify/Notify';
import Search from '../../screens/search/Search';

const Tab = createBottomTabNavigator();
const A = () => {
  const showToast = () => {
    console.log('pppp');
    Toast.show({
      type: 'success',
      text1: 'Hello',
      text2: 'This is some something 👋',
      visibilityTime: 1000,
    });
  };
  const showToast1 = () => {
    console.log('pppp');
    Toast.show({
      type: 'error',
      text1: 'Hello',
      text2: 'This is some something 👋',
      visibilityTime: 1000,
    });
  };
  // useEffect(() => {
  //   // Khởi tạo bộ xử lý thông báo
  //   PushNotification.configure({
  //     // Được gọi khi người dùng nhấn vào thông báo khi ứng dụng đang mở
  //     onNotification: function (notification) {
  //       console.log('Thông báo đã được mở hoặc nhận:', notification);
  //     },
  //   });
  // }, []);

  const handleSendNotification = () => {
    // Lập lịch thông báo cục bộ
    console.log('vào');
    PushNotification.localNotification({
      channelId: 'channel-id', // Đối với Android Oreo trở lên, cần phải chỉ định channelId
      title: 'Thông báo cục bộ',
      message: 'Đây là thông báo cục bộ từ ứng dụng của bạn!',
    });
    console.log('---------');
  };
  return (
    <View style={{flex: 1, backgroundColor: 'green'}}>
      <View style={{zIndex: 100}}>
        <Toast />
      </View>
      <Text>kkk</Text>

      <Button title="Show toast" onPress={showToast} />
      <Button title="Show toast1" onPress={showToast1} />
      <View>
        <Button title="Gửi thông báo" onPress={handleSendNotification} />
      </View>
    </View>
  );
};
const Buttombar = React.memo(() => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        // tabBarStyle: {
        //   height: 70,
        //   backgroundColor: 'rgba(0, 0, 0 ,1)',
        //   borderTopWidth: 2,
        //   borderColor: '#ffff',
        // },
        tabBarStyle: {
          height: 70,
          backgroundColor: 'rgba(0, 0, 0 ,1)',
          borderTopWidth: 2,
          borderColor: '#ffff',
          position: 'absolute',
          bottom: 0,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={require('../../../../assets/iconpng/home.png')}
                style={{width: 20, height: 20}}
                resizeMode="contain"
                tintColor={focused ? '#ffff' : '#748c94'}
              />
              <Text
                style={{color: focused ? '#ffff' : '#748c94', fontSize: 10}}>
                home
              </Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Tìm kiếm"
        component={Search}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={require('../../../../assets/iconpng/search.png')}
                style={{width: 20, height: 20}}
                resizeMode="contain"
                tintColor={focused ? '#ffff' : '#748c94'}
              />
              <Text
                style={{color: focused ? '#ffff' : '#748c94', fontSize: 10}}>
                Tìm kiếm
              </Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Settings"
        component={Add}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                // top: -15,
                //position: 'absolute',
                //width: 40,
                // height: 40,
                borderRadius: 100,
                // backgroundColor: 'rgba(0, 0, 0 ,0.5)',
              }}>
              <Image
                source={require('../../../../assets/iconpng/add.png')}
                style={{width: 30, height: 30}}
                resizeMode="contain"
                tintColor={focused ? '#ffff' : '#748c94'}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Thông báo"
        component={Notify}
        options={{
          headerShown: true,
          headerTitleAlign: 'center',
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={require('../../../../assets/iconpng/notification.png')}
                style={{width: 20, height: 20}}
                resizeMode="contain"
                tintColor={focused ? '#ffff' : '#748c94'}
              />
              <Text
                style={{color: focused ? '#ffff' : '#748c94', fontSize: 10}}>
                Thông báo
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Cài đặt"
        component={Profile}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={require('../../../../assets/iconpng/user.png')}
                style={{width: 20, height: 20}}
                resizeMode="contain"
                tintColor={focused ? '#ffff' : '#748c94'}
              />
              <Text
                style={{color: focused ? '#ffff' : '#748c94', fontSize: 10}}>
                Cá nhân
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
});

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

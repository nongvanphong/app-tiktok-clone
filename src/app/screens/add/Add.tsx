import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import Item from './item/Item';
import LoginAlert from '../../components/alert/alert/LoginAlert';
import {useNavigation} from '@react-navigation/native';
import {User} from '../../../interface/InterfaceUser';
import {LocalStorage} from '../../localStorage/LocalStorage';
import {ColorLight} from '../../../../assets/colors/colorLight';
const uriScreen1 = require('../../../../assets/iconpng/selectvideo.png');
const uriScreen2 = require('../../../../assets/iconpng/videocamera.png');
const Add = () => {
  const navigater = useNavigation();
  const [isShow, setIshow] = useState<boolean>(true);

  useEffect(() => {
    const getData = async () => {
      const data: User = await LocalStorage.getData('user');
      if (!data) return setIshow(true);
      setIshow(false);
    };

    getData();
  }, []);

  useEffect(() => {
    const unsubscribe = navigater.addListener('focus', () => {
      const getData = async () => {
        const data: User = await LocalStorage.getData('user');
        if (!data) return setIshow(true);
        setIshow(false);
      };
      getData();
    });

    return unsubscribe;
  }, [navigater]);

  const bntRegister = () => {
    setIshow(false);
    navigater.navigate('Login');
  };
  const bntSkip = () => {
    setIshow(false);
    navigater.goBack();
  };
  return (
    <View style={{flex: 1, backgroundColor: ColorLight.pkBg}}>
      <Item
        title="Chọn video"
        msg="Nhanh chóng, dễ dàng"
        screen={1}
        uri={uriScreen1}
        color="pink"></Item>
      <Item
        title="Quay video"
        msg="Thỏa sức sáng tạo"
        screen={2}
        uri={uriScreen2}
        color="#c0dff3"></Item>
      {/* <LoginAlert
        title="Bạn chưa có tài khoản"
        bntSkip={bntSkip}
        bntRegister={bntRegister}
        visible={isShow}
      /> */}
    </View>
  );
};

export default Add;

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';

import Itemfeedback from './itemfeedback';
import Itemname from './itemname';
import {Index} from './../../../index';
import Bottomprofile from './../bottom/bottomprofile';
import LoginAlert from '../../../components/alert/alert/LoginAlert';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {User} from '../../../../interface/InterfaceUser';
import {LocalStorage} from '../../../localStorage/LocalStorage';
import {http} from '../../../../servers/api/api';

const dataTest = [123, 333, 666];

const Profilemain = () => {
  const navigater = useNavigation();
  const [isShow, setIshow] = useState<boolean>(false);
  const [data, setData] = useState<User>({
    id: -1,
    userid: 'Tik tok',
    email: 'Chưa đăng nhập',
    password: 'Chưa đăng nhập',
    username: 'Chưa đăng nhập',
    userimage: 'null',
  });

  useEffect(() => {
    const getData = async () => {
      const data: User = await LocalStorage.getData('user');
      if (!data) return setIshow(true);
      setData(data);
      setIshow(false);
    };

    getData();
  }, []);

  useEffect(() => {
    const unsubscribe = navigater.addListener('focus', () => {
      const getData = async () => {
        const data: User = await LocalStorage.getData('user');
        if (!data) return setIshow(true);
        setData(data);
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
    <ScrollView
      style={{
        paddingTop: 20,
      }}
      onScroll={event => {
        console.log(event.nativeEvent.contentOffset.y);
      }}
      showsVerticalScrollIndicator={false}>
      <View>
        <View style={[styles.flexR, styles.justifyCenter]}>
          <View style={[styles.avt, styles.brRadiusAll]}>
            {data.userimage || data.userimage != '' ? (
              <Image
                style={[styles.img, styles.brRadiusAll]}
                source={{
                  uri: `${http}/images_Max/${data.id}/${data.userimage}`,
                }}
              />
            ) : (
              <Image
                style={[styles.img, styles.brRadiusAll]}
                source={{
                  uri: `${http}/default/tiktokmax.png`,
                }}
              />
            )}
          </View>
        </View>
        <Itemname name={data.username} />
        <View style={[{marginVertical: 20}, styles.flexR, styles.justifySp]}>
          {dataTest.map((e, Index) => (
            <Itemfeedback
              key={Index}
              number={e}
              name={Index == 0 ? 'Like' : Index === 1 ? 'Bye' : 'Sell'}
            />
          ))}
        </View>
        <Bottomprofile />
        <LoginAlert
          title="Bạn chưa có tài khoản"
          bntSkip={bntSkip}
          bntRegister={bntRegister}
          visible={isShow}
        />
      </View>
    </ScrollView>
  );
};

export default Profilemain;

const styles = StyleSheet.create({
  flexR: {
    flexDirection: 'row',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  justifySp: {
    justifyContent: 'space-around',
  },
  brRadiusAll: {
    borderRadius: 1000,
  },
  avt: {
    width: 100,
    height: 100,
    borderWidth: 5,
    borderColor: 'pink',
    padding: 3,
  },
  img: {
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

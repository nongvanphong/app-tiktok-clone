import {StyleSheet, Image, View, Text, TouchableOpacity} from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';

import HomeContext from '../../../../Context/HomeContext';
import {FetchFavourite} from '../../../../servers/Favourite/FetchFavourite';
import {LocalStorage} from '../../../localStorage/LocalStorage';
import {User} from '../../../../interface/InterfaceUser';
import LoginAlert from '../../../components/alert/alert/LoginAlert';
import {http} from '../../../../servers/api/api';
import {MyAlertContext} from '../../../../../App';
type Typer = {
  like_number?: number;
  comment_number?: number;
  videoId: number;
  your_like: number;
  myId: number;
  avatar?: string;
};
const TouchItem = React.memo((prosp: Typer) => {
  const {countId, setCountId} = useContext(MyAlertContext);
  const {setVideoID, setIsCmtShown, setMyId} = useContext(HomeContext);
  const navigater = useNavigation();
  const [showDilog, setshowDilog] = useState<InterfaceAlert[]>({
    write: false,
    fail: false,
    sussecc: false,
    login: false,
  });

  const [data, setData] = useState<Typer>({
    like_number: prosp.like_number,
    comment_number: prosp.comment_number,
    videoId: prosp.videoId,
    your_like: prosp.your_like,
  });

  useEffect(() => {
    //console.log(prosp.videoId, '===>', data.videoId);

    if (countId == -111) return;

    if (countId == 2) {
      setData({
        ...data,
        like_number: prosp.like_number,
        comment_number: prosp.comment_number,
        videoId: prosp.videoId,
        your_like: prosp.your_like,
      });
      setCountId(-111);
      return;
    }
    setData({
      ...data,
      like_number: prosp.like_number,
      comment_number: prosp.comment_number,
      videoId: prosp.videoId,
      your_like: prosp.your_like,
    });
    setCountId(-111);
    // setData({...data, your_like: 1});

    // return;
    // const user: User = await LocalStorage.getData('user');
    // const result = await FetchVideo.GetAll(1, user ? user.id : -1);
    // setCurrentPage(1);
    // setVideoList(result.data);
  }, [countId]);

  const like = async () => {
    console.log('===> ||| ', data);
    const user: User = await LocalStorage.getData('user');
    if (!user || !user.id) {
      return setshowDilog(prevState => ({
        ...prevState,
        login: true,
      }));
    }

    if (data.like_number == undefined || data.like_number < 0) return;
    if (data.your_like == 0) {
      const result = await FetchFavourite.Favourite(user.id, data.videoId);
      if (result.status != 200) {
        return console.log('-------erro favourite-----');
      }
      let a = data.like_number - 1;
      setData({...data, like_number: a, your_like: 1});
      return;
    }
    if (data.your_like == 1) {
      const result = await FetchFavourite.Favourite(user.id, data.videoId);
      if (result.status != 200) {
        return console.log('-------erro favourite-----');
      }
      let a = data.like_number + 1;
      setData({...data, like_number: a, your_like: 0});
      return;
    }
  };
  const bntRegister = () => {
    setshowDilog(prevState => ({...prevState, login: false}));
    navigater.navigate('Login');
  };
  const bntSkip = () => {
    setshowDilog(prevState => ({...prevState, login: false}));
  };
  const comment = () => {
    setVideoID(prosp.videoId);
    setMyId(prosp.myId);
    setIsCmtShown(true);
  };
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <View style={[styles.flex, styles.border]}>
          {prosp.avatar && prosp.avatar != '' ? (
            <Image
              style={styles.avt}
              source={{
                uri: `${http}/images_200/${prosp.myId}/${prosp.avatar}`,
              }}
            />
          ) : (
            <Image
              style={styles.avt}
              source={{
                uri: `${http}/default/tiktok32.png`,
              }}
            />
          )}
          <TouchableOpacity style={styles.add}>
            <Image
              style={styles.iconAdd}
              source={require('../../../../../assets/iconpng/add.png')}></Image>
          </TouchableOpacity>
        </View>
        <View style={styles.flex}>
          {data.your_like == 0 ? (
            <TouchableOpacity onPress={like}>
              <Image
                source={require('../../../../../assets/iconpng/favourite.png')}
                style={[styles.love, {tintColor: 'red'}]}></Image>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={like}>
              <Image
                source={require('../../../../../assets/iconpng/favourite1.png')}
                style={styles.love}></Image>
            </TouchableOpacity>
          )}

          <Text style={styles.textColor}>{data.like_number}</Text>
        </View>
        <View style={styles.flex}>
          <TouchableOpacity onPress={comment}>
            <Image
              source={require('../../../../../assets/iconpng/cmt.png')}
              style={styles.love}></Image>
          </TouchableOpacity>
          <Text style={styles.textColor}>{prosp.comment_number}</Text>
        </View>
      </View>
      <LoginAlert
        title="Bạn chưa có tài khoản"
        bntSkip={bntSkip}
        bntRegister={bntRegister}
        visible={showDilog.login}
      />
    </View>
  );
});

export default TouchItem;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',

    height: '35%',
    width: 60,
    right: 0,
    justifyContent: 'flex-end',
    bottom: '25%',
  },
  item: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'space-between',
  },
  avt: {
    width: 50,
    height: 50,
    backgroundColor: 'pink',
    borderRadius: 100,
  },
  love: {
    width: 40,
    height: 40,
    tintColor: '#ffff',
  },
  flex: {
    alignItems: 'center',
  },
  textColor: {
    color: '#ffff',
  },
  add: {
    width: 20,
    height: 20,
    backgroundColor: 'red',
    position: 'absolute',
    bottom: -10,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconAdd: {
    width: 15,
    height: 15,
    tintColor: '#ffff',
  },
  border: {
    borderWidth: 2,
    borderColor: '#ffff',
    borderRadius: 50,
  },
  favourite: {
    width: 230,
    height: 230,
    position: 'absolute',
    top: -48,
    zIndex: 1,
  },
});

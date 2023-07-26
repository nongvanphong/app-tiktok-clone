import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ColorLight} from '../../../../../assets/colors/colorLight';
import {User} from '../../../../interface/InterfaceUser';
import {LocalStorage} from '../../../localStorage/LocalStorage';
import SuccessFail from '../../alert/alert/SuccessFail';
type types = {
  name?: string;
  date?: string;
  msg?: string;
  userId: number;
  commentId: number;
  handleDelete: (commentId: number, myId: number) => Promise<boolean>;
};
const ItemCmt = (p: types) => {
  const [showDilog, setshowDilog] = useState<InterfaceAlert[]>({
    write: false,
    fail: false,
    sussecc: false,
    login: false,
  });
  const [myId, setMyId] = useState(-1);
  useEffect(() => {
    const getUser = async () => {
      const user: User = await LocalStorage.getData('user');
      if (!user.id) return;
      setMyId(user.id);
    };
    getUser();
  }, []);
  const hanldeUpdate = async () => {
    console.log('update');
  };
  const hanlDelete = async (commentId: number, myId: number) => {
    console.log('hanlDelete', commentId);
    if (!(await p.handleDelete(commentId, myId))) {
      setshowDilog(prevState => ({
        ...prevState,
        fail: true,
        messenger: 'Bạn không thể xóa bình luận ngay bây giờ!',
      }));
    }
  };

  const handleClikError = () => {
    setshowDilog(prevState => ({
      ...prevState,
      fail: false,
    }));
  };
  return (
    <View style={styles.container}>
      <View style={styles.avt}>
        <Image
          style={{width: '100%', height: '100%', borderRadius: 50}}
          source={require('../../../../../assets/images/a.jpg')}></Image>
      </View>
      <View style={styles.msg}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={[styles.text, styles.txtName]}>{p.name}</Text>
          {myId === p.userId ? (
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={{marginRight: 10}}
                onPress={hanldeUpdate}>
                <Image
                  source={require('../../../../../assets/iconpng/write.png')}
                  style={styles.icon}></Image>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => hanlDelete(p.commentId, myId)}>
                <Image
                  source={require('../../../../../assets/iconpng/delete.png')}
                  style={styles.icon}></Image>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
        <Text style={[styles.text]}>{p.msg}</Text>
        <Text style={[styles.text]}>{p.date}</Text>
      </View>
      <SuccessFail
        onclick={handleClikError}
        visible={showDilog.fail}
        describle={showDilog.messenger}
        title="Lỗi"
      />
    </View>
  );
};

export default ItemCmt;

const styles = StyleSheet.create({
  text: {
    color: ColorLight.textBlack,
  },
  taitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  container: {
    flexDirection: 'row',
    paddingVertical: 5,
  },
  avt: {
    width: 50,
    height: 50,
    backgroundColor: 'pink',
    borderRadius: 50,
  },
  msg: {
    paddingLeft: 10,
    paddingRight: 10,
    flex: 1,
  },
  txtName: {
    fontWeight: 'bold',
  },
  icon: {
    width: 15,
    height: 15,
  },
});

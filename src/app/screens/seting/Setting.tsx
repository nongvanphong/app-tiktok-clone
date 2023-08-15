 import {StyleSheet, Image, Text, View, TouchableOpacity} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import {ColorLight} from '../../../../assets/colors/colorLight';
import Item from './item/Item';
import * as ImagePicker from 'react-native-image-picker';
import ButtomSave from '../../components/botttom/ButtomSave';
import {User} from '../../../interface/InterfaceUser';
import {LocalStorage} from '../../localStorage/LocalStorage';
import {useNavigation} from '@react-navigation/native';
import {FetchUser} from '../../../servers/User/FetchUser';
import {MyAlertContext} from '../../../../App';
type types = {
  img1: any;
  txt1: string;
  txt2: string;
  myId: number;
};
export default function Setting() {
  const navigater = useNavigation();
  const [ids, setIds] = useState<number>(-1);
  const {showToast} = useContext(MyAlertContext);
  const [data, setData] = useState<types[]>([
    {
      img1: require('../../../../assets/iconpng/right-arrow.png'),
      txt1: 'Tên',
      txt2: 'Phong phong',
      myId: -1,
    },
    {
      img1: require('../../../../assets/iconpng/right-arrow.png'),
      txt1: 'Mật Khẩu',
      txt2: '**********',
      myId: -1,
    },
    {
      img1: require('../../../../assets/iconpng/copy.png'),
      txt1: '',
      txt2: '@user1234555',
      myId: -1,
    },
  ]);

  useEffect(() => {
    const unsubscribe = navigater.addListener('focus', () => {
      const getData = async () => {
        const getData = async () => {
          const datas: User = await LocalStorage.getData('user');
          if (!datas) return;
          const usernames = datas.username ? datas.username : '';
          const id = datas.id ? datas.id : -1;
          setData(p =>
            p.map((data, index) => ({
              ...data,
              myId: id,
              txt2:
                index == 0 ? usernames : index == 1 ? '********' : usernames,
            })),
          );
        };

        getData();
      };
      getData();
    });

    return unsubscribe;
  }, [navigater]);

  useEffect(() => {
    const getData = async () => {
      const datas: User = await LocalStorage.getData('user');
      if (!datas) return;
      const usernames = datas.username ? datas.username : '';
      const id = datas.id ? datas.id : -1;
      setIds(id);
      setData(p =>
        p.map((data, index) => ({
          ...data,
          myId: id,
          txt2: index == 0 ? usernames : index == 1 ? '********' : usernames,
        })),
      );
    };

    getData();
  }, []);
  const [file, setFile] = useState<File>();
  const [UriImge, setUriImge] = useState<string>();
  const [save, setSave] = useState<InterfaceBntSave>({
    isLoading: false,
    title: 'Lưu',
  });
  const pickImage = () => {
    let options: any = {
      title: 'Chọn ảnh',
      mediaType: 'photo', // Thay đổi thành 'video' nếu bạn muốn chọn video thay vì ảnh
      quality: 1, // Điều chỉnh mức chất lượng ảnh từ 0 đến 1 (ví dụ: 0.5)
      storageOptions: {
        skipBackup: true, // Không sao lưu ảnh vào iCloud hay Google Drive
        path: 'images', // Lưu ảnh trong thư mục 'images' của ứng dụng
      },
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        setUriImge(response.assets[0].uri);
        const files: File = {
          uri: response.assets[0].uri,
          type: response.assets[0].type,
          name: response.assets[0].fileName,
        };
        setFile(files);
      }
    });
  };
  const handleSave = async () => {
    try {
      setSave(p => ({...p, isLoading: true}));
      if (!file) return;
      const result = await FetchUser.UpdateAvatar(file, ids);

      if (result.status != 200) {
        showToast('Thất bại', 'error', 'Đổi ảnh đại diện thất bại');
        return setSave(p => ({...p, isLoading: false}));
      }
      showToast('Thành công', 'success', 'Đổi ảnh đại diện thành công');
      setFile(undefined);
      await LocalStorage.setData('user', result.data);
      return setSave(p => ({...p, isLoading: false}));
    } catch (error) {
      showToast('Thất bại', 'error', 'Mất kết nối với máy chủ!');
      return setSave(p => ({...p, isLoading: false}));
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.avtContainer}>
        <TouchableOpacity onPress={pickImage}>
          <View style={styles.avt}>
            {UriImge ? (
              <Image style={styles.avtImage} source={{uri: UriImge}}></Image>
            ) : (
              <Image
                style={{width: 30, height: 30, tintColor: 'white'}}
                source={require('../../../../assets/iconpng/camera.png')}></Image>
            )}
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={pickImage}>
          <Text style={styles.text}>Thay đổi ảnh</Text>
        </TouchableOpacity>
      </View>
      {data.map((e, index) => (
        <Item
          key={index}
          index={index}
          img1={e.img1}
          txt1={e.txt1}
          txt2={e.txt2}
          myId={e.myId}
        />
      ))}
      {file && (
        <ButtomSave
          title={save.title}
          isLoading={save.isLoading}
          handleClick={handleSave}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorLight.pkBg,
    padding: 10,
  },
  avtContainer: {
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avt: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#646464d9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avtImage: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  text: {
    color: ColorLight.textBlack,
    marginVertical: 10,
  },
});

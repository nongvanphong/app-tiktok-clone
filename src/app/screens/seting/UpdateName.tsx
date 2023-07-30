import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import {ColorLight} from '../../../../assets/colors/colorLight';
import ButtomSave from '../../components/botttom/ButtomSave';
import Toast from 'react-native-toast-message';
import {MyAlertContext} from '../../../../App';
import {FetchUser} from '../../../servers/User/FetchUser';
import {useNavigation} from '@react-navigation/native';
import {LocalStorage} from '../../localStorage/LocalStorage';

type ErrorArray = {
  msg: string;
  showErr: boolean;
  isShowBntSave: boolean;
};

export default function UpdateName({route}) {
  const navigater = useNavigation();
  const {name, id} = route.params;
  const {showToast} = useContext(MyAlertContext);
  const [text, onChangeText] = useState<string>(name);
  const [err, setErr] = useState<ErrorArray>({
    msg: '',
    showErr: false,
    isShowBntSave: false,
  });
  const [save, setSave] = useState<InterfaceBntSave>({
    isLoading: false,
    title: 'Lưu',
  });
  useEffect(() => {
    if (name === text) {
      return setErr(prevState => ({
        ...prevState,
        showErr: true,
        isShowBntSave: false,
      }));
    }
    return setErr(prevState => ({
      ...prevState,
      showErr: false,
      isShowBntSave: true,
    }));
  }, [text]);
  const handleSave = async () => {
    try {
      setSave(p => ({...p, isLoading: true}));
      const result = await FetchUser.UpdateUserName(id, text);
      if (result.status != 200) {
        showToast('Thất bại', 'error', 'Đổi tên thất bại');
        return setSave(p => ({...p, isLoading: false}));
      }
      showToast('Thành công', 'success', 'Đổi tên thành công');

      setSave(p => ({...p, isLoading: false}));
      await LocalStorage.setData('user', result.data);

      return navigater.navigate('Setting');
    } catch (error) {
      showToast('Thất bại', 'error', 'Đổi tên thất bại');
      return setSave(p => ({...p, isLoading: false}));
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.groupInput}>
        <View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder={'Nhập tên'}
              onChangeText={onChangeText}
              value={text}
              maxLength={50}
            />
          </View>
        </View>
        <Text>{text.length}/50</Text>
      </View>
      {err.isShowBntSave && (
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
  txtColor: {
    color: ColorLight.txtbl,
  },
  txtSize: {
    fontSize: 20,
  },
  textTaitle: {
    fontSize: 32,
    fontWeight: '900',
    color: ColorLight.textBlack,
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    fontWeight: '500',
  },
  inputContainer: {
    height: 60,
    borderBottomWidth: 1,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },

  groupInput: {
    marginTop: 20,
  },
  bnt: {
    backgroundColor: ColorLight.pkBg,
    borderRadius: 20,
    width: '40%',
    paddingVertical: 10,
    alignItems: 'center',
  },
  bntLogin: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 50,
    marginTop: 10,
  },
  textbnt: {
    color: '#fff',
    fontWeight: 'bold',
  },
  txtR: {
    alignSelf: 'flex-end',
  },
  brdAll: {
    borderRadius: 20,
  },
  email: {
    marginTop: 10,
    height: 50,
    flexDirection: 'row',
  },
  text: {
    margin: 5,
    justifyContent: 'center',
    borderWidth: 0.5,
    borderBlockColor: '#000',
    paddingHorizontal: 10,

    //marginLeft: 10,
  },
  textChild: {
    fontSize: 16,
    color: ColorLight.textBlack,
  },
  scroll: {
    flexDirection: 'row',
  },
  textError: {
    color: 'red',
  },
  brError: {
    borderColor: 'red',
  },
  brSuccess: {
    borderColor: 'gray',
  },
});

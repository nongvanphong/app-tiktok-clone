import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import {ColorLight} from '../../../../assets/colors/colorLight';
import {Texts} from '../../../../assets/texts/text';
import {SvgXml} from 'react-native-svg';
import {Svgs} from '../../../../assets/icons';
import {useNavigation} from '@react-navigation/native';
import {FetchUser} from '../../../servers/User/FetchUser';

const {width, height} = Dimensions.get('window');
const arrayGmail = [
  '@gmail.com',
  '@yahoo.com',
  '@hotmail.com',
  '@outlook.com',
  '@icloud.com',
  '@aol.com',
  '@msn.com',
  '@live.com',
  '@yandex.com',
  '@zoho.com',
];
type ErrorArray = {
  msg: string;
  showErr: boolean;
};
const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const Login = () => {
  const [text, onChangeText] = useState<string>('');
  const [err, setErr] = useState<ErrorArray[]>({
    msg: '',
    showErr: false,
  });
  const navigater = useNavigation();
  const handleClickEmai = (email: string) => {
    const txt = text.split('@');
    onChangeText(txt[0].concat(email));
  };
  const bntNext = async () => {
    if (!text) {
      return setErr(prevState => ({
        ...prevState,
        showErr: true,
        msg: 'Email không được để trống',
      }));
    }
    if (text.length >= 50) {
      return setErr(prevState => ({
        ...prevState,
        showErr: true,
        msg: 'Email nhập quá số kí tự cho phép',
      }));
    }
    if (!emailRegex.test(text)) {
      return setErr(prevState => ({
        ...prevState,
        showErr: true,
        msg: 'Email không đúng định dạng',
      }));
    }
    setErr(prevState => ({
      ...prevState,
      showErr: false,
      msg: '',
    }));
    const result = await FetchUser.checkEMail(text);
    if (result.status == 201) {
      return navigater.navigate('Login1', {email: text});
    }
    return navigater.navigate('Register', {email: text});
  };
  return (
    <View style={styles.container}>
      <View style={styles.groupInput}>
        <View>
          <View
            style={[
              styles.inputContainer,
              err.showErr
                ? {borderBlockColor: 'red'}
                : {borderBlockColor: 'gray'},
            ]}>
            <TextInput
              style={styles.input}
              placeholder={Texts.plEmail}
              keyboardType="email-address"
              onChangeText={onChangeText}
              value={text}
            />
          </View>
        </View>
        {err.showErr && <Text style={{color: 'red'}}>{err.msg}</Text>}
        <TouchableOpacity
          style={styles.bntLogin}
          onPress={() => {
            bntNext();
          }}>
          <Text style={[styles.textbnt, styles.txtSize]}>Tiếp</Text>
        </TouchableOpacity>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.email}>
          {arrayGmail.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.text}
              onPress={() => handleClickEmai(item)}>
              <Text style={styles.textChild}>{item}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    height: height,
    padding: 10,
    backgroundColor: ColorLight.pkBg,
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

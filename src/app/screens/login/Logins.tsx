import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {Texts} from '../../../../assets/texts/text';
import {useNavigation, useRoute} from '@react-navigation/native';
import {FetchUser} from '../../../servers/User/FetchUser';
import {LocalStorage} from '../../localStorage/LocalStorage';
import SuccessFail from '../../components/alert/alert/SuccessFail';
import {ColorLight} from '../../../../assets/colors/colorLight';
import {MyAlertContext} from '../../../../App';

const schema = yup
  .object({
    email: yup
      .string()
      .max(50, 'Email bé hơn 50 kí tự')
      .matches(
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        'Email không đúng định dạng',
      )
      .required('Email không được để trống'),
    password: yup.string().required('Mật khẩu không được để trống'),
  })
  .required();
const Logins = ({route}) => {
  const {socket} = useContext(MyAlertContext);
  const [isShowAlert, SetisShowAlert] = useState<boolean>(false);
  // Lấy giá trị email từ params
  const {email} = route.params;
  const navigater = useNavigation();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: '' + email,
      password: '',
    },
    resolver: yupResolver(schema),
  });
  const onSubmit = async data => {
    const result = await FetchUser.Login(data);
    if (result.status !== 200) {
      SetisShowAlert(true);
      console.log('màn hình đăng nhập => đăng nhập thất bại');
      return;
    }

    await LocalStorage.setData('user', result.data);
    console.log('---', socket);
    socket.emit('userLogin', {userId: result.data.id});
    return navigater.navigate('Home');
  };
  const hanldleClick = () => {
    SetisShowAlert(false);
  };
  return (
    <View style={styles.conatainer}>
      <Text style={styles.taitle}>Bạn đã đăng ký</Text>
      <Text style={styles.describle}>
        Hãy nhập mật khẩu để đăng nhập tài khoản của bạn
      </Text>
      <Controller
        control={control}
        name="email"
        render={({field: {onChange, onBlur, value}}) => (
          <View>
            <View
              style={[
                styles.inputContainer,
                errors.email ? styles.brError : styles.brSuccess,
              ]}>
              <TextInput
                style={styles.input}
                placeholder={Texts.plEmail}
                keyboardType="email-address"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            </View>
            {errors.email && (
              <Text style={styles.textError}>{errors.email.message}</Text>
            )}
          </View>
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({field: {onChange, onBlur, value}}) => (
          <View>
            <View
              style={[
                styles.inputContainer,
                errors.password ? styles.brError : styles.brSuccess,
              ]}>
              <TextInput
                style={styles.input}
                placeholder={Texts.plPasswork}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            </View>
            {errors.password && (
              <Text style={styles.textError}>{errors.password.message}</Text>
            )}
          </View>
        )}
      />

      <Text style={styles.textFogetPassword}>Quên mật khẩu</Text>
      <TouchableOpacity
        style={[
          styles.bntLogin,
          errors.email || errors.password
            ? {backgroundColor: ColorLight.bntfail}
            : {backgroundColor: ColorLight.bntOk},
        ]}
        onPress={handleSubmit(onSubmit)}>
        <Text style={[styles.textbnt]}>Tiếp</Text>
      </TouchableOpacity>
      <SuccessFail
        onclick={hanldleClick}
        visible={isShowAlert}
        describle="Email hoặc mật khẩu không chính xác!"
        title="Đăng nhập thất bại"
      />
    </View>
  );
};

export default Logins;

const styles = StyleSheet.create({
  conatainer: {flex: 1, padding: 10, backgroundColor: ColorLight.pkBg},
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
  bntLogin: {
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 50,
  },
  textbnt: {
    fontSize: 16,
    fontWeight: '500',
  },
  taitle: {
    fontSize: 16,
    fontWeight: '500',
    paddingVertical: 20,
    color: '#000',
  },
  describle: {
    color: '#000',
  },
  textFogetPassword: {
    color: '#000',
    paddingVertical: 20,
    fontWeight: '500',
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

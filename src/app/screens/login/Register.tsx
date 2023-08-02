import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
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
    password: yup
      .string()
      .min(8)
      .max(20)
      .matches(
        /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?^$!]).*$/,
      )
      .required('Mật khẩu không được để trống'),
  })
  .required();
const Register = ({route}) => {
  // Lấy giá trị email từ params
  const {socket} = useContext(MyAlertContext);
  const {email} = route.params;
  const navigator = useNavigation();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      password: '',
    },
    resolver: yupResolver(schema),
  });
  const [isShowAlert, SetisShowAlert] = useState<boolean>(false);
  const onSubmit = async data => {
    const newData = {
      ...data,
      email: email,
    };
    const result = await FetchUser.Register(newData);
    if (result.status !== 201) {
      console.log('==>', result);
      SetisShowAlert(true);
      return;
    }
    await LocalStorage.setData('user', result.data);

    socket.emit('userLogin', {userId: result.data.id});

    navigator.navigate('Home');
  };
  const hanldleClick = () => {
    SetisShowAlert(false);
  };
  return (
    <View style={styles.conatainer}>
      <Text style={styles.taitle}>Tạo mật khẩu</Text>

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
          </View>
        )}
      />

      <Text style={styles.textFogetPassword}>Mật khẩu phải bao gồm:</Text>
      <View style={styles.check}>
        <Image
          style={[
            styles.iCkFail,
            errors.password?.type == 'min' || errors.password?.type == 'max'
              ? styles.iCkFail
              : styles.iCkSussecc,
          ]}
          source={require('../../../../assets/iconpng/checked.png')}
        />
        <Text style={styles.describle}>8 đến 20 kí tự</Text>
      </View>
      <View style={styles.check}>
        <Image
          style={[
            styles.iCkFail,
            errors.password?.type == 'matches' ||
            errors.password?.type == 'min' ||
            errors.password?.type == 'max'
              ? styles.iCkFail
              : styles.iCkSussecc,
          ]}
          source={require('../../../../assets/iconpng/checked.png')}
        />
        <Text style={styles.describle}>Các chữ cái, số và kí tự đặc biệt</Text>
      </View>
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
        describle="Email đã tồn tại!"
        title="Đăng kí thất bại"
      />
    </View>
  );
};

export default Register;

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
    marginTop: 10,
  },
  textbnt: {
    fontSize: 16,
    fontWeight: '500',
  },
  taitle: {
    fontSize: 16,
    fontWeight: '500',
    paddingVertical: 20,
    color: ColorLight.textBlack,
  },
  describle: {
    color: ColorLight.textBlack,
    paddingVertical: 5,
    paddingLeft: 10,
  },
  textFogetPassword: {
    color: ColorLight.textBlack,
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
  check: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iCkSussecc: {
    tintColor: 'green',
  },
  iCkFail: {
    tintColor: '#000',
  },
});

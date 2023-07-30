import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {ColorLight} from '../../../../assets/colors/colorLight';
import ButtomSave from '../../components/botttom/ButtomSave';
import {Controller, useForm} from 'react-hook-form';
import {Texts} from '../../../../assets/texts/text';
import {useNavigation} from '@react-navigation/native';
import {MyAlertContext} from '../../../../App';
import {FetchUser} from '../../../servers/User/FetchUser';
type ErrorArray = {
  msg: string;
  showErr: boolean;
  isShowBntSave: boolean;
};
const schema = yup
  .object({
    passwordOld: yup.string().required('Mật khẩu không được để trống'),
    password: yup
      .string()
      .min(8)
      .max(20)
      .matches(
        /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?^$!]).*$/,
      )
      .required('Mật khẩu không được để trống'),
    password1: yup
      .string()
      .oneOf([yup.ref('password')], 'Mật khẩu không khớp')
      .required('Mật khẩu không được để trống'),
  })
  .required();
export default function UpdatePassword({route}) {
  const navigater = useNavigation();
  const {id} = route.params;
  const {showToast} = useContext(MyAlertContext);
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

  const [err, setErr] = useState<ErrorArray>({
    msg: '',
    showErr: false,
    isShowBntSave: false,
  });
  const [isLoading, setisLoading] = useState<boolean>(false);

  const onSubmit = async data => {
    console.log(data.password, data.passwordOld);

    try {
      setisLoading(true);
      const result = await FetchUser.UpdatePassword(
        id,
        data.passwordOld,
        data.password,
      );
      if (result.status != 200) {
        showToast('Thất bại', 'error', 'Mật khẩu cũ không chính xác');
        return setisLoading(false);
      }
      showToast('Thành công', 'success', 'Đổi  mật khẩu thành công');
      navigater.navigate('Setting');
      return setisLoading(false);
    } catch (error) {
      showToast('Thất bại', 'error', 'Đổi mật khẩu thất bại');
      return setisLoading(false);
    }
  };
  return (
    <View style={styles.conatainer}>
      <Controller
        control={control}
        name="passwordOld"
        render={({field: {onChange, onBlur, value}}) => (
          <View>
            <View
              style={[
                styles.inputContainer,
                errors.passwordOld ? styles.brError : styles.brSuccess,
              ]}>
              <TextInput
                style={styles.input}
                placeholder={'Nhập mật khẩu cũ'}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            </View>
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
                placeholder={'Nhập mật khẩu mới'}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            </View>
          </View>
        )}
      />
      <Controller
        control={control}
        name="password1"
        render={({field: {onChange, onBlur, value}}) => (
          <View>
            <View
              style={[
                styles.inputContainer,
                errors.password1 ? styles.brError : styles.brSuccess,
              ]}>
              <TextInput
                style={styles.input}
                placeholder={'Nhập lại mật khẩu'}
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
            errors.passwordOld ? styles.iCkFail : styles.iCkSussecc,
          ]}
          source={require('../../../../assets/iconpng/checked.png')}
        />
        <Text style={styles.describle}>Nhập mật khẩu cũ</Text>
      </View>
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
      <View style={styles.check}>
        <Image
          style={[
            styles.iCkFail,
            errors.password1?.type == 'oneOf'
              ? styles.iCkFail
              : styles.iCkSussecc,
          ]}
          source={require('../../../../assets/iconpng/checked.png')}
        />
        <Text style={styles.describle}>Mật khẩu không giống nhau</Text>
      </View>
      {errors.passwordOld ||
      errors.password?.type == 'matches' ||
      errors.password?.type == 'min' ||
      errors.password?.type == 'max' ||
      errors.password1?.type == 'oneOf' ? null : (
        <View style={{marginTop: 10}}>
          <TouchableOpacity
            disabled={isLoading}
            onPress={handleSubmit(onSubmit)}>
            <View style={styles.item}>
              {isLoading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text style={styles.text}>Lưu</Text>
              )}
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

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
  item: {
    backgroundColor: 'red',
    height: 50,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: ColorLight.textWhite,
  },
});

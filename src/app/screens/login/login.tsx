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
import React, {useEffect} from 'react';
import {ColorLight} from '../../../../assets/colors/colorLight';
import {Texts} from '../../../../assets/texts/text';
import {SvgXml} from 'react-native-svg';
import {Svgs} from '../../../../assets/icons';
import {useNavigation} from '@react-navigation/native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
const {width, height} = Dimensions.get('window');

const Login = () => {
  const navigater = useNavigation();
  const loginGogle = async () => {
    useEffect(() => {
      configureGoogleSignIn();
    }, []);

    const configureGoogleSignIn = async () => {
      await GoogleSignin.configure({
        scopes: ['email'],
        webClientId: 'AIzaSyC_-vAKKjTTOkYFA2SLvmIKEgwE1ULWnr0',
      });
    };
    console.log('========2');
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('User Info:', userInfo);
      // Xử lý thông tin người dùng sau khi đăng nhập thành công
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('Đăng nhập đã huỷ');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Yêu cầu đăng nhập đang tiếp diễn');
      } else {
        console.log('Đã xảy ra lỗi đăng nhập:', error);
      }
    }
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Text style={[styles.textTaitle]}>{Texts.login}</Text>
        <Image
          style={styles.image}
          source={require('../../../../assets/images/farm.png')}
          resizeMode="contain"
        />
        <View style={styles.flexRow}>
          <TouchableOpacity style={styles.bnt} onPress={() => loginGogle()}>
            <Text style={[styles.textbnt, styles.txtSize]}>Google</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.bnt}>
            <Text style={[styles.textbnt, styles.txtSize]}>Facebook</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.groupInput}>
          <View style={[styles.inputContainer, styles.brdAll]}>
            <SvgXml xml={Svgs.email} width="25" height="25" />

            <TextInput
              style={styles.input}
              placeholder={Texts.plEmail}
              keyboardType="numeric"
            />
          </View>
          <View style={[styles.inputContainer, styles.brdAll]}>
            <SvgXml xml={Svgs.key} width="25" height="25" />
            <TextInput
              style={styles.input}
              placeholder={Texts.plPasswork}
              keyboardType="numeric"
            />
          </View>
          <Text style={[styles.txtR, styles.txtSize, styles.txtColor]}>
            {Texts.fogetPassWork}
          </Text>

          <View style={styles.groupBntLogin}>
            <TouchableOpacity
              style={styles.bntLogin}
              onPress={() => {
                navigater.navigate('home');
              }}>
              <Text style={[styles.textbnt, styles.txtSize]}>
                {Texts.login}
              </Text>
            </TouchableOpacity>

            <Text style={[styles.txtSize, styles.txtColor]}>
              {Texts.register}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    height: height,
    padding: 10,
  },
  txtColor: {
    color: ColorLight.txtbl,
  },
  txtSize: {
    fontSize: 16,
  },
  textTaitle: {
    fontSize: 32,
    fontWeight: '900',
    color: ColorLight.Pktxt,
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  input: {
    flex: 1,
    height: '100%',
  },
  inputContainer: {
    height: 45,
    borderWidth: 1,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  image: {
    width: '90%',
    height: '40%',
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
    backgroundColor: ColorLight.pkBg,
    borderRadius: 20,
    width: '50%',
    paddingVertical: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  textbnt: {
    fontSize: 20,
    color: ColorLight.txtbl,
  },
  groupBntLogin: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtR: {
    alignSelf: 'flex-end',
  },
  brdAll: {
    borderRadius: 20,
  },
});

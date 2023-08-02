import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Image,
} from 'react-native';
import Lottie from 'lottie-react-native';
import {ColorLight} from '../../../../../assets/colors/colorLight';
import {useNavigation} from '@react-navigation/native';
type Type = {
  bntSkip: () => void;
  bntRegister: () => void;
  bntLogin: () => void;
  title?: string;
  describle?: string;
  visible: boolean;
};
const LoginAlert = (props: Type) => {
  const bntRegister = () => {
    props.bntRegister();
  };
  const bntSkip = () => {
    props.bntSkip();
  };
  return (
    <Modal visible={props.visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.alertContainer}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '500',
              marginVertical: 20,
              color: ColorLight.textBlack,
            }}>
            {props.title}
          </Text>

          <TouchableOpacity
            style={[styles.bnt, styles.bntRegister]}
            onPress={bntRegister}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                style={{
                  width: 30,
                  height: 30,
                }}
                source={require('../../../../../assets/iconpng/user1.png')}
              />
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flex: 1,
                }}>
                <Text style={styles.text}>Đăng kí</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.bnt, styles.bntRegister]}
            // onPress={bntRegister}
          >
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                style={{
                  width: 30,
                  height: 30,
                }}
                source={require('../../../../../assets/iconpng/google.png')}
              />
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flex: 1,
                }}>
                <Text style={styles.text}>Tiếp tục với Google</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.bnt, styles.bntRegister]}
            // onPress={bntRegister}
          >
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                style={{
                  width: 30,
                  height: 30,
                }}
                source={require('../../../../../assets/iconpng/facebook.png')}
              />
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flex: 1,
                }}>
                <Text style={styles.text}>Tiếp tục với Facebook</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.bnt, styles.bntSkip]}
            onPress={bntSkip}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                style={{
                  width: 30,
                  height: 30,
                }}
                source={require('../../../../../assets/iconpng/prohibited.png')}
              />
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flex: 1,
                }}>
                <Text style={styles.text}>Không sử dụng tài khoản</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  alertContainer: {
    backgroundColor: ColorLight.pkBg,
    borderRadius: 20,
    width: '80%',
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bnt: {
    padding: 5,
    alignSelf: 'center',
    borderRadius: 5,
    width: '100%',
    //justifyContent: 'center',
    // alignItems: 'center',
    marginVertical: 2,
  },

  bntSkip: {
    //backgroundColor: ColorLight.bntblack,
    borderColor: 'black',
    borderWidth: 1,
  },
  bntRegister: {
    // backgroundColor: ColorLight.bntOk,
    borderColor: 'black',
    borderWidth: 1,
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    marginVertical: 10,
    color: ColorLight.textBlack,
    //  marginRight: 30,
  },
});

export default LoginAlert;

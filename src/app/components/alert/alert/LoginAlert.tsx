import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Modal, StyleSheet} from 'react-native';
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
            <Text style={styles.text}>Đăng kí</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.bnt, styles.bntSkip]}
            onPress={bntSkip}>
            <Text style={styles.text}>Không sử dụng tài khoản</Text>
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
    paddingVertical: 5,
    alignSelf: 'center',
    borderRadius: 10,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },

  bntSkip: {
    backgroundColor: ColorLight.bntblack,
  },
  bntRegister: {
    backgroundColor: ColorLight.bntOk,
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    marginVertical: 10,
    color: ColorLight.textWhite,
  },
});

export default LoginAlert;

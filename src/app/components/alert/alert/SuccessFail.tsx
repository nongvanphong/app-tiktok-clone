import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Modal, StyleSheet} from 'react-native';
import Lottie from 'lottie-react-native';
import {ColorLight} from '../../../../../assets/colors/colorLight';
type Type = {
  onclick: () => void;
  title?: string;
  describle?: string;
  visible: boolean;
};
const SuccessFail = (props: Type) => {
  const handlClick = () => {
    props.onclick();
  };
  return (
    <Modal visible={props.visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.alertContainer}>
          <Lottie
            style={{height: 100}}
            autoPlay
            loop
            source={require('../../../../../assets/json/error.json')}
          />
          <Text
            style={{
              fontSize: 20,
              fontWeight: '500',
              marginVertical: 10,
              textAlign: 'center',
            }}>
            {props.title}
          </Text>
          <Text style={{fontSize: 16, marginBottom: 30, textAlign: 'center'}}>
            {props.describle}
          </Text>
          <TouchableOpacity style={styles.bnt} onPress={handlClick}>
            <Text style={{fontSize: 16, fontWeight: '500', marginVertical: 10}}>
              Đóng
            </Text>
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
    backgroundColor: '#fff',
    borderRadius: 20,
    width: '80%',
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bnt: {
    paddingHorizontal: 50,
    paddingVertical: 5,
    backgroundColor: ColorLight.bntOk,
    alignSelf: 'center',
    borderRadius: 15,
  },
});

export default SuccessFail;

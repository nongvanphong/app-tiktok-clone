import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Modal, StyleSheet} from 'react-native';
import Lottie from 'lottie-react-native';
import {ColorLight} from '../../../../../assets/colors/colorLight';
type Type = {
  onclick: () => void;
  onclickOK: () => void;
  title?: string;
  describle?: string;
  visible: boolean;
};
const QuestionAlert = (props: Type) => {
  const handlClick = () => {
    props.onclick();
  };
  const handlClickOK = () => {
    props.onclickOK();
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
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '90%',
            }}>
            <TouchableOpacity style={styles.bnt} onPress={handlClick}>
              <Text
                style={{fontSize: 16, fontWeight: '500', marginVertical: 10}}>
                Đóng
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.bnt, {backgroundColor: 'green'}]}
              onPress={handlClickOK}>
              <Text
                style={{fontSize: 16, fontWeight: '500', marginVertical: 10}}>
                Đồng ý
              </Text>
            </TouchableOpacity>
          </View>
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
    paddingHorizontal: 20,
    paddingVertical: 5,
    backgroundColor: ColorLight.bntOk,
    alignSelf: 'center',
    borderRadius: 15,
  },
});

export default QuestionAlert;

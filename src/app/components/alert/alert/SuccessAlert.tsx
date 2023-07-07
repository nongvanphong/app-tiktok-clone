import React from 'react';
import {View, Text, TouchableOpacity, Modal, StyleSheet} from 'react-native';
import Lottie from 'lottie-react-native';

const SuccessAlert = ({visible, title, message, onClose}) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.alertContainer}>
          <Lottie
            style={{height: 100}}
            autoPlay
            loop
            source={require('../../../../../assets/json/successful.json')}
          />
          <Text>title</Text>
          <Text>describe</Text>
          <TouchableOpacity style={styles.bnt}>
            <Text>Ok</Text>
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
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#007AFF',
    alignSelf: 'center',
    borderRadius: 15,
  },
});

export default SuccessAlert;

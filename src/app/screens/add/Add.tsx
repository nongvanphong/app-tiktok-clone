import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Custommodal from '../../components/alert/Custommodal';
import CustomAlert from './../../components/alert/customalert';
import SuccessAlert from '../../components/alert/alert/SuccessAlert';
import Lottie from 'lottie-react-native';
import Videosss from '../../components/alert/Video';
const Add = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {/* <Custommodal /> */}
      {/* <CustomAlert /> */}
      {/* <SuccessAlert /> */}
      <Videosss />
    </View>
  );
};

export default Add;

const styles = StyleSheet.create({});

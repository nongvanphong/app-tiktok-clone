import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Custommodal from '../../components/alert/Custommodal';
import CustomAlert from './../../components/alert/customalert';

const Add = () => {
  return (
    <View>
      <Custommodal />
      <CustomAlert />
    </View>
  );
};

export default Add;

const styles = StyleSheet.create({});

import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ColorLight} from '../../../../assets/colors/colorLight';

const Itemfeedback = () => {
  return (
    <View style={[styles.container, styles.shadowProp]}>
      <Text style={styles.txtTilte}>127</Text>
      <Text style={styles.txt}>Like</Text>
    </View>
  );
};

export default Itemfeedback;

const styles = StyleSheet.create({
  container: {
    width: 60,
    height: 60,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    padding: 10,
    alignItems: 'center',
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  txtTilte: {
    fontSize: 18,
    fontWeight: '500',
    color: ColorLight.txtbl,
  },
  txt: {
    fontSize: 12,
    fontWeight: '500',
    color: ColorLight.txtbl,
  },
});

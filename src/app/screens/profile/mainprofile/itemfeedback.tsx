import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ColorLight} from '../../../../../assets/colors/colorLight';
type item = {
  number?: number;
  name: string;
};
const Itemfeedback = (props: item) => {
  return (
    <View style={[styles.container, styles.shadowProp]}>
      <Text style={styles.txtTilte}>{props.number}</Text>
      <Text style={styles.txt}>{props.name}</Text>
    </View>
  );
};

export default Itemfeedback;

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    padding: 5,
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
    fontSize: 16,
    fontWeight: '500',
    color: ColorLight.txtbl,
  },
  txt: {
    fontSize: 10,
    fontWeight: '500',
    color: ColorLight.txtbl,
  },
});

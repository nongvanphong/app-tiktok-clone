import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ColorLight} from '../../../../../assets/colors/colorLight';
type types = {
  name?: string;
};
const Itemname = (p: types) => {
  return (
    <View
      style={[
        styles.container,
        styles.flexR,
        styles.aligeCenter,
        styles.justifyCenter,
      ]}>
      <View
        style={[
          styles.item,
          styles.aligeCenter,
          styles.flexR,
          styles.brRadius,
        ]}>
        <Image
          style={styles.icon}
          source={require('../../../../../assets/iconpng/vip.png')}
        />
        <Text style={styles.text}>{p.name}</Text>
      </View>
    </View>
  );
};

export default Itemname;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  item: {
    backgroundColor: '#ffff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  flexR: {
    flexDirection: 'row',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  aligeCenter: {
    alignItems: 'center',
  },
  justify: {
    justifyContent: 'space-around',
  },
  brRadius: {
    borderRadius: 10,
  },
  icon: {
    width: 25,
    height: 25,
    marginRight: 10,
    position: 'absolute',
    top: -15,
    left: -5,
  },
  text: {
    color: ColorLight.txtbl,
    fontSize: 16,
    fontWeight: '500',
  },
});

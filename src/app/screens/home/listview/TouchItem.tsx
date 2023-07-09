import {StyleSheet, Image, View} from 'react-native';
import React from 'react';

const TouchItem = () => {
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <View style={styles.avt}></View>
        <Image
          source={require('../../../../../assets/iconpng/heart.png')}
          style={styles.love}></Image>
        <Image
          source={require('../../../../../assets/iconpng/cmt.png')}
          style={styles.love}></Image>
      </View>
    </View>
  );
};

export default TouchItem;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',

    height: '30%',
    width: 60,
    right: 0,
    justifyContent: 'flex-end',
    bottom: '25%',
  },
  item: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'space-between',
  },
  avt: {
    width: 50,
    height: 50,
    backgroundColor: 'pink',
    borderRadius: 100,
  },
  love: {
    width: 40,
    height: 40,
    tintColor: '#ffff',
  },
});

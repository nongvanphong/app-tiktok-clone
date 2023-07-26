import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Itemlist from '../mainprofile/itemlist';
const dataItem = [
  {
    img1: require('../../../../../assets/iconpng/sun.png'),
    txt: 'Sáng tối',
    img2: require('../../../../../assets/iconpng/right-arrow.png'),
  },
  {
    img1: require('../../../../../assets/iconpng/gear.png'),
    txt: 'Cài đặt',
    img2: require('../../../../../assets/iconpng/right-arrow.png'),
  },
  {
    img1: require('../../../../../assets/iconpng/switch.png'),
    txt: 'Đăng xuất',
    img2: require('../../../../../assets/iconpng/right-arrow.png'),
  },
];

export default function Bottomprofile() {
  return (
    <View style={[styles.container]}>
      {dataItem.map((e, index) => (
        <Itemlist
          key={index}
          index={index}
          img1={e.img1}
          txt={e.txt}
          img2={e.img2}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 30,
    marginHorizontal: 10,
    backgroundColor: '#ffffff',
    marginBottom: 5,
  },

  shadowProp: {
    shadowOffset: {width: -1, height: 2},
    shadowColor: '#171717',
    shadowOpacity: 0.1,
    shadowRadius: 30,
    elevation: 5,
  },
});

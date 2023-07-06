import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ColorLight} from '../../../../../assets/colors/colorLight';
import {Svgs} from '../../../../../assets/icons';
import {SvgXml} from 'react-native-svg';

const Item = () => {
  return (
    <View style={[styles.container, styles.brAll20, styles.mgBt]}>
      <Text style={[styles.txt, styles.txtSize20]}>Tôi muốn bán!</Text>
      <View style={styles.row}>
        <View style={styles.rowItem}>
          <Text style={[styles.txt, styles.txtTitle]}>Ngô Ngô Ngô ngô </Text>
          <Text style={[styles.txt]}>Ngô sạch ngô tươi, nay mới thu Ngô</Text>
          <Text style={[styles.txt]}>khoản $300 - $400 kg</Text>
        </View>
        <View style={styles.rowItem}>
          <View style={styles.containerImage}>
            <Image
              source={require('../../../../../assets/images/abc.png')}
              style={styles.img}
            />
          </View>
        </View>
      </View>
      <View style={[styles.bottom, styles.itemCenter]}>
        <View style={styles.felxRow}>
          <View style={styles.felxRow}>
            <View style={[styles.felxRow, styles.itemCenter]}>
              <SvgXml xml={Svgs.favourite} width="25" height="25" />
              <Text style={[styles.txt]}>122</Text>
            </View>
          </View>
          <View style={[styles.felxRow, styles.mgL]}>
            <View style={[styles.felxRow, styles.itemCenter]}>
              <SvgXml xml={Svgs.comment} width="25" height="25" />
              <Text style={[styles.txt]}>122</Text>
            </View>
          </View>
        </View>
        <View>
          <Text style={[styles.txtSize10, styles.txt]}>
            21h37 ngày 08-08-2022
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Item;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 220,
    backgroundColor: ColorLight.bgItemGreen,
    padding: 10,
  },
  brAll20: {
    borderRadius: 20,
  },
  row: {
    flexDirection: 'row',
    flex: 1,
  },
  rowItem: {
    flex: 1,
  },
  containerImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  img: {
    width: 150,
    height: 150,
    borderRadius: 1000,
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  felxRow: {
    flexDirection: 'row',
  },
  itemCenter: {
    alignItems: 'center',
  },
  mgL: {
    marginLeft: 10,
  },
  txt: {
    color: ColorLight.txtbl,
  },
  txtSize10: {
    fontSize: 10,
  },
  txtSize20: {
    fontSize: 20,
  },
  txtTitle: {
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: 2,
  },
  mgBt: {
    marginBottom: 10,
  },
});

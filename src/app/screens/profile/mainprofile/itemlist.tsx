import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import CustomSwitch from '../../../components/customSwitch/customSwitch';
import {LocalStorage} from '../../../localStorage/LocalStorage';

type typerItemList = {
  index?: number;
  img1: any;
  txt: string;
  img2: any;
};

const Itemlist = (props: typerItemList) => {
  const logout = async (index: number) => {
    switch (index) {
      case 0:
        break;
      case 1:
        break;
      case 2:
        LocalStorage.removeData('user');
        break;
      default:
    }
  };
  return (
    <View>
      <TouchableOpacity
        disabled={props.index == 0 ? true : false}
        onPress={() => {
          logout(props.index);
        }}>
        <View
          style={[
            styles.container,
            styles.flexR,
            styles.justifySp,
            styles.alCenter,
          ]}>
          <View style={[styles.container, styles.flexR, styles.alCenter]}>
            <Image style={styles.icon} source={props.img1} />
            <Text style={styles.mgL}>{props.txt}</Text>
          </View>
          {props.index == 0 ? (
            <CustomSwitch />
          ) : (
            <Image style={styles.icon} source={props.img2} />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Itemlist;

const styles = StyleSheet.create({
  container: {
    height: 40,
    marginBottom: 5,
  },
  alCenter: {
    alignItems: 'center',
  },
  flexR: {
    flexDirection: 'row',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  justifySp: {
    justifyContent: 'space-between',
  },
  icon: {
    width: 20,
    height: 20,
  },
  mgL: {
    marginLeft: 10,
  },
});

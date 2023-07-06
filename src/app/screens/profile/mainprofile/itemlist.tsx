import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import CustomSwitch from '../../../components/customSwitch/customSwitch';

type typerItemList = {
  index?: number;
  img1: any;
  txt: string;
  img2: any;
};

const Itemlist = (props: typerItemList) => {
  return (
    <View>
      <TouchableOpacity disabled={props.index == 0 ? true : false}>
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

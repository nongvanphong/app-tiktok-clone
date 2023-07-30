import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import CustomSwitch from '../../../components/customSwitch/customSwitch';
import {LocalStorage} from '../../../localStorage/LocalStorage';
import {useNavigation} from '@react-navigation/native';

type typer = {
  index: number;
  img1: any;
  txt1: string;
  txt2: string;
  myId: number;
};

const ItemSetting = (props: typer) => {
  const navigater = useNavigation();
  const logout = async (index: number) => {
    switch (index) {
      case 0:
        navigater.navigate('update name', {name: props.txt2, id: props.myId});

        break;
      case 1:
        navigater.navigate('update password', {id: props.myId});
        break;
      case 2:
        break;
      default:
    }
  };
  return (
    <View>
      <TouchableOpacity
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
          <Text style={styles.mgR}>{props.txt1}</Text>

          <View style={[styles.container, styles.flexR, styles.alCenter]}>
            <Text style={styles.mgR}>{props.txt2}</Text>
            <Image style={styles.icon} source={props.img1} />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ItemSetting;

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
    width: 15,
    height: 15,
    tintColor: 'gray',
  },
  mgR: {
    marginRight: 10,
  },
});

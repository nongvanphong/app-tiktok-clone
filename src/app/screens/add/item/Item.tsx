import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Lottie from 'lottie-react-native';
import {useNavigation} from '@react-navigation/native';

type typeItem = {
  title: string;
  msg: string;
  screen: number;
  uri: any;
  color: string;
};
const Item = (props: typeItem) => {
  const navigater = useNavigation();
  const handlClick = () => {
    switch (props.screen) {
      case 1:
        navigater.navigate('selectvideo');

        break;
      case 2:
        navigater.navigate('livevideo');

        break;
      default:
        console.log('No screen');
    }
  };
  return (
    <View style={styles.container}>
      <View style={[styles.item, {backgroundColor: props.color}]}>
        <View style={styles.itemDetail}>
          <View>
            <Text style={styles.textTitle}>{props.title}</Text>
            <Text>{props.msg}</Text>
          </View>
          <TouchableOpacity style={styles.bnt} onPress={handlClick}>
            <Image
              style={styles.imgIcon}
              source={require('../../../../../assets/iconpng/play.png')}></Image>
            <Text style={{fontWeight: '500'}}>Tại đây</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.containerImage}>
          <Image style={styles.image} source={props.uri}></Image>
        </View>
      </View>
    </View>
  );
};

export default Item;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginTop: 10,
  },
  item: {
    flexDirection: 'row',

    paddingHorizontal: 10,
    height: 200,
    borderRadius: 30,
    padding: 10,
    justifyContent: 'space-between',
  },
  bnt: {
    width: 120,
    height: 50,
    backgroundColor: '#f5f4f2',
    borderRadius: 40,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  itemDetail: {
    justifyContent: 'space-between',
  },
  textTitle: {
    fontSize: 20,
    fontWeight: '900',
  },
  imgIcon: {
    width: 30,
    height: 30,
    tintColor: '#6d6d6d',
  },
  containerImage: {
    justifyContent: 'center',
  },
  image: {
    width: 120,
    height: 120,
  },
});
{
  /* <Lottie
style={{height: 60}}
autoPlay
loop
source={require('../../../../../assets/json/successful.json')}
/> */
}

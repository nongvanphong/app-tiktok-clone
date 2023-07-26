import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
type TypeShow = {
  click: () => void;
  check: Boolean;
};
export default function PreViewVideo(props: TypeShow) {
  const show = () => {
    props.click();
  };
  return (
    <View style={styles.container}>
      {props.check == true ? (
        <TouchableOpacity onPress={show}>
          <Image
            style={styles.img}
            source={require('../../../../../../assets/iconpng/eye1.png')}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={show}>
          <Image
            style={styles.img}
            source={require('../../../../../../assets/iconpng/eye.png')}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 50,
    borderRadius: 50,
    padding: 5,
  },
  img: {
    width: '100%',
    height: '100%',
    tintColor: '#21e3ad',
  },
});

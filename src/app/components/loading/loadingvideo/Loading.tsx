import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Lottie from 'lottie-react-native';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
export default function Loading() {
  return (
    <View style={styles.container}>
      <Lottie
        autoPlay
        loop
        source={require('../../../../../assets/json/a.json')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: windowHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

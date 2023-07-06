import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const HearderBarBack = () => {
  return (
    <View style={styles.container}>
      <View>
        <Image
          style={styles.icon}
          source={require('../../../../assets/iconpng/left-arrow.png')}
        />
      </View>
    </View>
  );
};

export default HearderBarBack;

const styles = StyleSheet.create({
  container: {
    height: 50,
    padding: 10,
  },
  icon: {
    width: 30,
    height: 30,
    tintColor: 'yellow',
  },
});

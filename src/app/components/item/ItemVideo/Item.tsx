import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const Item = () => {
  return (
    <View>
      <Text>Item</Text>
    </View>
  );
};

export default Item;

const styles = StyleSheet.create({});

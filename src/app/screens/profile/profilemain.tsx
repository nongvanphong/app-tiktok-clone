import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Itemfeedback from './itemfeedback';
import Bottomprofile from './bottomprofile';

const Profilemain = () => {
  return (
    <ScrollView
      onScroll={event => {
        console.log(event.nativeEvent.contentOffset.y);
      }}
      showsVerticalScrollIndicator={false}>
      <View>
        <View style={[styles.flexR, styles.justifyCenter]}>
          <View style={[styles.avt, styles.brRadiusAll]}>
            <Image
              style={[styles.img, styles.brRadiusAll]}
              source={require('../../../../assets/images/images.jpg')}
            />
          </View>
        </View>
        <View style={[{marginVertical: 20}, styles.flexR, styles.justifySp]}>
          <Itemfeedback />
          <Itemfeedback />
          <Itemfeedback />
        </View>
        <Bottomprofile />
      </View>
    </ScrollView>
  );
};

export default Profilemain;

const styles = StyleSheet.create({
  flexR: {
    flexDirection: 'row',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  justifySp: {
    justifyContent: 'space-around',
  },
  brRadiusAll: {
    borderRadius: 1000,
  },
  avt: {
    width: 100,
    height: 100,
    borderWidth: 5,
    borderColor: 'green',
    padding: 3,
  },
  img: {
    width: '100%',
    height: '100%',
  },
});

import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Itemfeedback from './itemfeedback';
import Bottomprofile from './../bottomprofile';
import Itemname from './itemname';
import {Index} from './../../../index';

const dataTest = [123, 333, 666];

const Profilemain = () => {
  return (
    <ScrollView
      style={{
        paddingTop: 20,
      }}
      onScroll={event => {
        console.log(event.nativeEvent.contentOffset.y);
      }}
      showsVerticalScrollIndicator={false}>
      <View>
        <View style={[styles.flexR, styles.justifyCenter]}>
          <View style={[styles.avt, styles.brRadiusAll]}>
            <Image
              style={[styles.img, styles.brRadiusAll]}
              source={require('../../../../../assets/images/a.jpg')}
            />
          </View>
        </View>
        <Itemname />
        <View style={[{marginVertical: 20}, styles.flexR, styles.justifySp]}>
          {dataTest.map((e, Index) => (
            <Itemfeedback
              key={Index}
              number={e}
              name={Index == 0 ? 'Like' : Index === 1 ? 'Bye' : 'Sell'}
            />
          ))}
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
    borderColor: 'pink',
    padding: 3,
  },
  img: {
    width: '100%',
    height: '100%',
  },
});

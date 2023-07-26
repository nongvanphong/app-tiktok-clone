import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Animated, Dimensions} from 'react-native';
import * as Progress from 'react-native-progress';
import Slider from '@react-native-community/slider';
const winDowWidth = Dimensions.get('window').width;

type typeProgress = {
  timeStart: number;
  timeEnd: number;
};
const ProgressBar = React.memo((props: typeProgress) => {
  return (
    <View style={styles.container}>
      <Slider
        style={styles.bar}
        value={props.timeStart}
        minimumValue={0}
        maximumValue={props.timeEnd}
        step={0.01}
        thumbTintColor="transparent"
        minimumTrackTintColor="#333333"
        maximumTrackTintColor="#777777"
        // onValueChange={handleSliderChange}
      />
      {/* <Text>
        {props.timeStart} / {props.timeEnd}
      </Text> */}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    paddingHorizontal: 5,
  },
  bar: {
    width: winDowWidth - 10,
  },
});

export default ProgressBar;

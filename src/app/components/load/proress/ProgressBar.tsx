import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Animated, Dimensions} from 'react-native';
import * as Progress from 'react-native-progress';
import Slider from '@react-native-community/slider';
const winDowWidth = Dimensions.get('window').width;

type typeProgress = {
  timeStart: number;
  timeEnd: number;
};
const ProgressBar = (props: typeProgress) => {
  // const [progress, setProgress] = useState(0.0);
  // const [time, setTime] = useState(0);
  // const [timeEnd, setTimeEnd] = useState(30);

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     if (time > 10) return clearInterval(timer);
  //     setTime(prevTime => prevTime + 1);
  //   }, 1000);

  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, []);

  // useEffect(() => {
  //   setProgress(time / 1);
  // }, [time]);

  // const handleSliderChange = value => {
  //   setTime(Math.floor(value * 10));
  // };
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
};

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

import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Animated} from 'react-native';
import * as Progress from 'react-native-progress';
const ProgressBar = () => {
  const [progress, setProgress] = useState(0.0);
  const [time, setTime] = useState<number>(10);

  useEffect(() => {
    // Hàm thời gian
    const timer = setInterval(() => {
      setTime(prevTime => prevTime + 1);
    }, 1000);

    return () => {
      clearInterval(timer); // Hủy hàm thời gian khi component bị unmount
    };
  }, []);

  useEffect(() => {
    console.log('=>', progress);
    console.log(time / 100);
    // Cập nhật giá trị tiến trình
    setProgress(time / 100); // Giả sử thời gian tối đa là 10 giây
  }, [time]);

  return (
    <View style={styles.container}>
      <Progress.Bar
        progress={progress}
        width={200}
        height={10}
        borderColor="green"
        color="red"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 20,
    backgroundColor: '#ccc',
    borderRadius: 10,
    margin: 10,
  },
  bar: {
    height: 20,
    backgroundColor: '#333',
    borderRadius: 10,
  },
});

export default ProgressBar;

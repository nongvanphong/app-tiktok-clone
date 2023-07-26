import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Lottie from 'lottie-react-native';

const LoadMore = React.memo(() => {
  return (
    <View style={styles.container}>
      <Lottie
        style={styles.load}
        speed={2}
        autoPlay
        loop
        source={require('../../../../../assets/json/loadingtiktok.json')}
      />
    </View>
  );
});

export default LoadMore;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  load: {
    width: 100,
    height: 100,
  },
});

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Button,
  Image,
} from 'react-native';
import React, {useState} from 'react';
type TypeFloatButtom = {
  bntWrite: () => void;
  bntAdd: () => void;
  bntGoback: () => void;
};
export default function FloatButtom(props: TypeFloatButtom) {
  const [icon1] = useState(new Animated.Value(40));
  const [icon2] = useState(new Animated.Value(40));
  const [icon3] = useState(new Animated.Value(40));
  const [pop, setPop] = useState<boolean>(false);
  const durations = 200;
  const popIn = () => {
    setPop(true);
    Animated.timing(icon1, {
      toValue: 120,
      duration: durations,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon2, {
      toValue: 95,
      duration: durations,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon3, {
      toValue: 120,
      duration: durations,
      useNativeDriver: false,
    }).start();
  };
  const popOut = () => {
    setPop(false);
    Animated.timing(icon1, {
      toValue: 45,
      duration: durations,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon2, {
      toValue: 45,
      duration: durations,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon3, {
      toValue: 45,
      duration: durations,
      useNativeDriver: false,
    }).start();
  };
  const handleClickAdd = () => {
    props.bntAdd();
  };
  const handleClickGoBack = () => {
    props.bntGoback();
  };
  const handleClickWrite = () => {
    props.bntWrite();
  };
  return (
    <View style={{flex: 1}}>
      <Animated.View style={[styles.circle, {bottom: icon1}]}>
        <TouchableOpacity style={[styles.circle1]} onPress={handleClickAdd}>
          <Image
            style={styles.icon}
            source={require('../../../../../../assets/iconpng/touchscreen.png')}></Image>
        </TouchableOpacity>
      </Animated.View>
      <Animated.View style={[styles.circle, {bottom: icon2, right: icon2}]}>
        <TouchableOpacity style={[styles.circle1]} onPress={handleClickWrite}>
          <Image
            style={styles.icon}
            source={require('../../../../../../assets/iconpng/text.png')}></Image>
        </TouchableOpacity>
      </Animated.View>
      <Animated.View style={[styles.circle, {right: icon3}]}>
        <TouchableOpacity style={[styles.circle1]} onPress={handleClickGoBack}>
          <Image
            style={styles.icon}
            source={require('../../../../../../assets/iconpng/back.png')}></Image>
        </TouchableOpacity>
      </Animated.View>
      <TouchableOpacity
        style={[styles.circle, {width: 60, height: 60}]}
        onPress={() => {
          pop === false ? popIn() : popOut();
        }}>
        <Image
          style={styles.icon}
          source={require('../../../../../../assets/iconpng/add.png')}></Image>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#0ae9fe',
    position: 'absolute',
    bottom: 40,
    right: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle1: {
    width: 50,
    height: 50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: '#ffff',
  },
});

import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {boolean} from 'yup';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

type typesButtonSend = {
  bntClick: () => void;
  isshow: boolean;
  txt: number;
};
const ButtonSend = (props: typesButtonSend) => {
  const handleClick = () => {
    props.bntClick();
  };
  return (
    <View style={styles.conatainer}>
      <TouchableOpacity
        disabled={props.isshow}
        style={styles.bnt}
        onPress={handleClick}>
        {props.isshow ? (
          <View style={{flexDirection: 'row'}}>
            <ActivityIndicator size="small" color="white" />
            <Text style={styles.text}>{`${props.txt}%`}</Text>
          </View>
        ) : (
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.text}>Lưu</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ButtonSend;

const styles = StyleSheet.create({
  bnt: {
    width: windowWidth * 0.4,
    height: 50,
    backgroundColor: '#0ae9fe',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
  },
  text: {
    color: '#ffff',
    fontWeight: '600',
    fontSize: 20,
  },
  conatainer: {
    position: 'absolute',
    bottom: 40,
    left: 10,
  },
});

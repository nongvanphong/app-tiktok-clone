import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  ViewStyle,
} from 'react-native';
import React, {useState} from 'react';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
type Type = {
  userName?: string;
  tag?: string;
  msg?: string;
  date?: string;
};
const ButtomVideo = React.memo((props: Type) => {
  const [showMore, setshowMore] = useState<Boolean>(false);
  const showMoreText: ViewStyle = {
    overflow: 'hidden',
    height: showMore == true ? null : 20,
  };
  const show = () => {
    setshowMore(true);
  };
  return (
    <View style={styles.container}>
      <Text style={[styles.name, styles.colorText]}>{props.userName}</Text>
      <Text style={[styles.tag, styles.colorText]}>{props.tag}</Text>
      <TouchableHighlight
        activeOpacity={1}
        underlayColor="transparent"
        style={[showMoreText]}
        onPress={show}>
        <Text style={styles.colorText}>{props.msg}</Text>
      </TouchableHighlight>
      <Text style={styles.colorText}>{props.date}</Text>
    </View>
  );
});

export default ButtomVideo;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    width: windowWidth,
    paddingHorizontal: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  tag: {
    fontSize: 14,
    fontWeight: '500',
  },
  colorText: {
    color: 'white',
  },
});

import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {ColorLight} from '../../../../../assets/colors/colorLight';

const Item = () => {
  return (
    <View>
      <TouchableOpacity style={styles.container}>
        <View style={{height: '100%'}}>
          <Image
            source={require('../../../../../assets/images/a.jpg')}
            style={styles.avatar}
          />
        </View>
        <View style={styles.content}>
          <Text style={styles.username}>username</Text>
          {/* <Text style={styles.message}>@Đã bình luận video:</Text> */}
          <Text style={styles.message}>
            <Text style={{fontWeight: '500', color: ColorLight.textBlack}}>
              @Đã bình luận video:
            </Text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
            unde, qui eaque soluta delectus quisquam velit dicta sapiente
            reprehenderit repellendus placeat voluptates repellat ullam quia
            error, provident veniam impedit cumque.
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Item;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  content: {
    flex: 1,
    marginLeft: 10,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    color: ColorLight.textBlack,
  },
  message: {
    fontSize: 14,
    color: ColorLight.textBlack,
  },
});

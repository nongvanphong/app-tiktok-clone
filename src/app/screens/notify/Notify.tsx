import {StyleSheet, Text, FlatList, View} from 'react-native';
import React from 'react';
import Item from './Item/Item';
import {ColorLight} from '../../../../assets/colors/colorLight';
const data = [
  {id: 1, title: 'Item 1'},
  {id: 2, title: 'Item 2'},
  {id: 3, title: 'Item 3'},
  // Add more data items as needed
];

const Notify = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => <Item />}
      />
    </View>
  );
};

export default Notify;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorLight.pkBg,
    padding: 10,
  },
});

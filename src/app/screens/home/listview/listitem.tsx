import {StyleSheet, Text, View, FlatList} from 'react-native';
import React from 'react';
import Item from './item';

const ListItem = () => {
  return (
    <View>
      <FlatList
        style={styles.list}
        data={[
          {key: 'Devin'},
          {key: 'Dan'},
          {key: 'Dominic'},
          {key: 'Jackson'},
          {key: 'James'},
          {key: 'Joel'},
          {key: 'John'},
          {key: 'Jillian'},
          {key: 'Jimmy'},
          {key: 'Julie'},
        ]}
        renderItem={({item}) => <Item />}
      />
    </View>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 10,
  },
});

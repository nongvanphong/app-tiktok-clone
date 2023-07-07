import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Animated,
  Dimensions,
} from 'react-native';
import React, {MutableRefObject, useRef} from 'react';

import Item from './item';
import {Index} from './../../../index';
const windowHeight = Dimensions.get('window').height;
const data = [
  {key: 'Devin'},
  {key: 'Dan'},
  {key: 'Dominic'},
  // {key: 'Jackson'},
  // {key: 'James'},
  // {key: 'Joel'},
  // {key: '1John'},
  // {key: 'J3illian'},
  // {key: 'Ji4mmy'},
  // {key: 'Jul3ie'},
  // {key: 'Jack3son'},
  // {key: 'Jame2s'},
  // {key: 'Joel1'},
  // {key: 'John1'},
  // {key: 'Jill1ian'},
  // {key: 'Jimm1y'},
  // {key: 'Juliel'},
];

const ListItem = () => {
  const flatListRef: MutableRefObject<FlatList | null> = useRef(null);
  // const scrollToNextVideo = () => {
  //   flatListRef.current.scrollToIndex({index: 1, animated: true});
  // };

  return (
    <View>
      <FlatList
        style={styles.list}
        data={data}
        renderItem={({item, index}) => <Item index={index} />}
        // horizontal
        pagingEnabled
        onScrollToIndexFailed={() => {}}
        //onScrollEndDrag={scrollToNextVideo}
      />
    </View>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  list: {
    // marginBottom: 60,
    height: windowHeight,
  },
});

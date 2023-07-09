import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Animated,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import React, {MutableRefObject, useEffect, useRef, useState} from 'react';

import Item from './item';
import {Index} from './../../../index';
import LoadMore from '../../../components/load/loadMore/LoadMore';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
interface videos {
  id: number;
  uri: string;
  pause: boolean;
}

const ListItem = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0); // hàm lưu vị trí video đnag phát
  const [isLoading, setIsLoading] = useState(false);
  const [videoList, setVideoList] = useState<videos[]>([
    {
      id: 1,
      uri: 'http://192.168.1.104:1234/videos/single?video=videos_temp/b.mp4',
      pause: true,
    },
    {
      id: 2,
      uri: 'http://192.168.1.104:1234/videos/single?video=videos_temp/a.mp4',
      pause: true,
    },
    {
      id: 3,
      uri: 'http://192.168.1.104:1234/videos/single?video=videos_temp/d.mp4',
      pause: true,
    },
    {
      id: 4,
      uri: 'http://192.168.1.104:1234/videos/single?video=videos_temp/c.mp4',
      pause: true,
    },

    // Thêm các video khác vào đây
  ]);

  useEffect(() => {
    setVideoList(prevVideoList =>
      prevVideoList.map((video, index) => ({
        ...video,
        pause: index === currentVideoIndex,
      })),
    );
  }, [currentVideoIndex]);

  const loadMoreItems = () => {
    console.log('=> laod');
    if (isLoading) return;
    setIsLoading(true);
    // Simulate API request
    setTimeout(() => {
      console.log('here');
    }, 3000);
  };

  return (
    <View>
      <FlatList
        style={styles.list}
        data={videoList}
        renderItem={({item, index}) => (
          <Item id={item.id} uri={item.uri} pause={item.pause} />
        )}
        // horizontal
        pagingEnabled
        onScrollToIndexFailed={() => {}}
        showsVerticalScrollIndicator={false}
        // viewabilityConfig={{viewAreaCoveragePercentThreshold: 100}}
        // lấy vị trí scroll
        onScroll={event => {
          const offsetY = event.nativeEvent.contentOffset.y;
          const index = Math.round(offsetY / styles.list.height);
          setCurrentVideoIndex(index);
        }}
        ListFooterComponent={LoadMore}
        onEndReached={loadMoreItems}
        onEndReachedThreshold={0.2} // Tùy chỉnh ngưỡng tại đây (vd: 0.8 là 80% còn lại của danh sách)
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

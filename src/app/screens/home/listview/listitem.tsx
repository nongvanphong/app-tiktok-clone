import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Animated,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import React, {
  MutableRefObject,
  useEffect,
  useRef,
  useState,
  useContext,
} from 'react';

import Item from './item';
import {Index} from './../../../index';
import LoadMore from '../../../components/load/loadMore/LoadMore';
import {FetchVideo} from '../../../../servers/video/FetchVideo';
import RNFS from 'react-native-fs';

import {InterfaceVideo} from '../../../../interface/InterfaceVideo';
import {api, http} from '../../../../servers/api/api';
import Comment from '../../../components/Comment/Comment';
import HomeContext from '../../../../Context/HomeContext';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
interface videos {
  id: number;
  uri: string;
  pause: boolean;
}

const ListItem = React.memo(() => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState<number>(0); // hàm lưu vị trí video đnag phát
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingScreen, setIsLoadingScreen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [videoList, setVideoList] = useState<InterfaceVideo[]>([
    // Thêm các video khác vào đây
  ]);

  useEffect(() => {
    setVideoList(prevVideoList =>
      prevVideoList.map((video, index) => ({
        ...video,
        pause: index === currentVideoIndex,
      })),
    );
  }, [currentVideoIndex, isLoadingScreen]);

  const handlClickPause = (pause: boolean, i: number) => {
    setVideoList(prevVideoList => {
      const updatedVideoList = [...prevVideoList]; // Tạo bản sao của mảng
      if (updatedVideoList.length > 1) {
        // Kiểm tra mảng có ít nhất 2 phần tử
        updatedVideoList[i].pause = pause; // Cập nhật giá trị tại vị trí số 1 thành false
      }
      return updatedVideoList; // Trả về mảng đã được cập nhật
    });
  };

  const loadMoreItems = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      console.log('--số trang load->', currentVideoIndex);
      const nextPage = currentPage + 1;
      const result = await FetchVideo.GetAll(nextPage);
      setVideoList(prevList => [...prevList, ...result.data]);

      setCurrentPage(nextPage);
    } catch (error) {
      console.error('Error loading more items:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const getVideo = async () => {
      try {
        const result = await FetchVideo.GetAll(currentPage);

        setVideoList(result.data);

        setIsLoadingScreen(true);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    getVideo();
  }, []);
  const {ishowcmt, setIsCmtShown} = useContext(HomeContext);

  return (
    <View style={{backgroundColor: '#000'}}>
      {isLoadingScreen ? (
        <FlatList
          style={styles.list}
          data={videoList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => (
            <Item
              id={item.id}
              namevideo={item.videouri}
              iduser={item.User?.id}
              index={index}
              pause={item.pause}
              tag={item.videotag}
              userName={item.User?.username}
              videoDescrible={item.videodescrible}
              createdAt={item.createdAt}
              handlClick={handlClickPause}
              uriVideo={http + '/' + item.userid + '/' + item.videouri}
              comment_number={item.cmt_number}
              like_number={item.like_number}
            />
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
          onEndReachedThreshold={2}
        />
      ) : (
        <View
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <LoadMore></LoadMore>
        </View>
      )}
      {ishowcmt && <Comment />}
    </View>
  );
});

export default ListItem;

const styles = StyleSheet.create({
  list: {
    // marginBottom: 60,
    height: windowHeight - 60,
    //flex: 1,
  },
});

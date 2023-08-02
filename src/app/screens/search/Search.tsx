import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  RefreshControl,
} from 'react-native';
import {ColorLight} from '../../../../assets/colors/colorLight';
import {User} from '../../../interface/InterfaceUser';
import {FetchUser} from '../../../servers/User/FetchUser';
import LoadMore from '../../components/load/loadMore/LoadMore';
import {http} from '../../../servers/api/api';

export default function Search() {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [refreshing, setRefreshing] = useState(false);
  const [total, setTotal] = useState<number>(-1);
  const [isLoadMore, setIsLoadMore] = useState(true);
  useEffect(() => {
    const getSearch = async () => {
      try {
        setIsLoadMore(true);
        const result = await FetchUser.Search(currentPage, searchText);
        setTotal(result.total);
        setSearchResults(result.data);

        //  setIsLoadingScreen(true);
      } catch (error) {
        console.error('Error fetching video:', error);
      }
    };
    getSearch();
  }, []);

  const handleSearch = async text => {
    setSearchText(text);
    setIsLoadMore(true);
    try {
      const result = await FetchUser.Search(1, text);
      setCurrentPage(1);
      setTotal(result.total);
      setSearchResults(result.data);

      //  setIsLoadingScreen(true);
    } catch (error) {
      console.error('Error fetching video:', error);
    }
  };

  const loadMoreItems = async () => {
    try {
      const nextPage = currentPage + 1;

      if (total / 10 + 1 < nextPage) {
        setIsLoadMore(false);
        return console.log('không laod nữa', nextPage, total / 10 + 1);
      }
      const result = await FetchUser.Search(nextPage, searchText);
      // console.log(result.data.userimage);
      setSearchResults(prevList => [...prevList, ...result.data]);

      setCurrentPage(nextPage);
    } catch (error) {
      console.error('Error loading more items:', error);
    }
  };
  // Hàm tải dữ liệu mới khi refresh
  const onRefresh = async () => {
    setRefreshing(true);
    setIsLoadMore(true);
    const result = await FetchUser.Search(1, searchText);
    setCurrentPage(1);
    setTotal(result.total);
    setSearchResults(result.data);
    setRefreshing(false);
  };
  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <TouchableOpacity style={styles.goBack}>
          <Image
            style={{width: '100%', height: '100%'}}
            source={require('../../../../assets/iconpng/back.png')}
          />
        </TouchableOpacity>
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm video"
          onChangeText={handleSearch}
          value={searchText}
        />
        <TouchableOpacity
          style={{
            height: 40,
            justifyContent: 'center',
            paddingLeft: 10,
          }}>
          <Text style={{color: 'red'}}>Tìm kiếm</Text>
        </TouchableOpacity>
      </View>
      {searchResults ? (
        <FlatList
          data={searchResults}
          renderItem={item => (
            <TouchableOpacity style={styles.item}>
              <View style={{flexDirection: 'row'}}>
                <Image
                  source={require('../../../../assets/iconpng/search.png')}
                  style={{width: 20, height: 20}}
                />
                <View style={styles.itemContent}>
                  <Text style={styles.title}>{item.item.username}</Text>
                  {/* Thêm các thông tin khác về video, như người đăng, lượt xem, thời gian, v.v. */}
                </View>
              </View>
              <View style={{flexDirection: 'row'}}>
                {item.item.userimage && item.item.userimage != '' ? (
                  <Image
                    source={{
                      uri: `${http}/images_200/${item.item.id}/${item.item.userimage}`,
                    }}
                    style={{width: 40, height: 40, borderRadius: 50}}
                  />
                ) : (
                  <Image
                    source={{uri: `${http}/default/tiktok32.png`}}
                    style={{width: 40, height: 40, borderRadius: 50}}
                  />
                )}
                <Image
                  source={require('../../../../assets/iconpng/arrow.png')}
                  style={{
                    width: 30,
                    height: 30,
                    transform: [{rotate: '-180deg'}],
                    tintColor: '#000',
                  }}
                />
              </View>
            </TouchableOpacity>
          )}
          ListFooterComponent={
            isLoadMore ? LoadMore : <View style={{height: 100}}></View>
          }
          onEndReached={loadMoreItems}
          // onEndReachedThreshold={2}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      ) : (
        <View style={{justifyContent: 'center', alignContent: 'center'}}>
          <LoadMore></LoadMore>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: ColorLight.pkBg,
  },
  searchInput: {
    height: 35,
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    paddingHorizontal: 10,
    flex: 1,
    fontSize: 12,
  },

  search: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  goBack: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 5,
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  itemContent: {
    marginLeft: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: ColorLight.textBlack,
  },
});

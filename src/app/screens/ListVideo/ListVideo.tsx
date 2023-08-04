import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Dimensions,
  Animated,
  TouchableOpacity,
  TextInput,
  RefreshControl,
} from 'react-native';
import React, {useRef, useEffect, useState, useContext} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {FlatGrid} from 'react-native-super-grid';
import {ColorLight} from '../../../../assets/colors/colorLight';
import {http} from './../../../servers/api/api';
import Items from './Item/Items';
import SuccessFail from '../../components/alert/alert/SuccessFail';
import QuestionAlert from '../../components/alert/alert/QuestionAlert';
import {InterfaceVideo} from './../../../interface/InterfaceVideo';
import {User} from '../../../interface/InterfaceUser';
import {LocalStorage} from '../../localStorage/LocalStorage';
import {FetchVideo} from '../../../servers/video/FetchVideo';
import {MyAlertContext} from '../../../../App';
import LoadMore from '../../components/load/loadMore/LoadMore';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const schema = yup
  .object({
    videotag: yup.string().max(20, 'Tag bé hơn 20 kí tự'),
    videotitle: yup.string().max(20, 'Tiêu đề bé hơn 20 kí tự'),
    videodescrible: yup.string().max(250, 'Nội dung bé hơn 250 kí tự'),
  })
  .required();

type updateVideo = {
  id: number;
  videoid: number;
};

const ListVideo = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [total, setTotal] = useState<number>(-1);
  const [isLoadMore, setIsLoadMore] = useState(true);
  const {showToast} = useContext(MyAlertContext);
  const [h1, setH1] = useState(0);
  const [showupDate, setShowupDate] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showDilog, setshowDilog] = useState<InterfaceAlert>({
    fail: false,
    question: false,
  });
  const [txt, setTxt] = useState<updateVideo>({
    id: -1,
    videoid: -1,
  });
  const [bnt] = useState(new Animated.Value(-windowHeight));
  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm({
    defaultValues: {
      videotag: '',
      videotitle: '',
      videodescrible: '',
    },
    resolver: yupResolver(schema),
  });
  //`${http}/1/filek1689033397104g103606965.mp4`
  const [items, setItems] = useState<InterfaceVideo[]>([]);
  useEffect(() => {
    const getVideo = async () => {
      try {
        const user: User = await LocalStorage.getData('user');
        const result = await FetchVideo.GetAllUser(
          currentPage,
          user ? user.id : -1,
        );
        setCurrentPage(1);
        setTotal(result.total);
        setItems(result.data);
      } catch (error) {
        console.error('Error fetching video:', error);
      }
    };

    getVideo();
  }, []);
  const showBottomSheet = (
    title?: string,
    msg?: string,
    tag?: string,
    id: number,
    video_id: number,
  ) => {
    Animated.timing(bnt, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
    setH1(windowHeight * 0.3);
    setTxt({
      id: id,
      videoid: video_id,
    });
    setValue('videotag', tag);
    setValue('videotitle', title);
    setValue('videodescrible', msg);
  };
  const closedBottomSheet = () => {
    Animated.timing(bnt, {
      toValue: -windowHeight,
      duration: 500,
      useNativeDriver: false,
    }).start();
    setShowupDate(true);
    // setH1(0);
  };
  const handleUpdate = () => {
    setH1(windowHeight * 0.6);
    Animated.timing(bnt, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
    setShowupDate(false);
  };
  const onSubmit = async data => {
    const result = await FetchVideo.Update(
      txt.id,
      txt.videoid,
      data.videodescrible,
      data.videotitle,
      data.videotag,
    );
    if (result.status == 404) {
      return setshowDilog(prevState => ({
        ...prevState,
        fail: true,
        messenger: 'Bạn không thể cập nhật video ngay bây giờ!',
        title: 'Thông báo!',
      }));
    }
    if (result.status == 400) {
      return setshowDilog(prevState => ({
        ...prevState,
        fail: true,
        messenger: 'Bạn không thể cập nhật video ngay bây giờ!',
        title: 'Thông báo!',
      }));
    }

    const dataUpdate = {
      id: txt.videoid,
      userid: txt.id,
      videotag: data.videotag,
      videotitle: data.videotitle,
      videodescrible: data.videodescrible,
    };

    const index = items.findIndex(item => item.id === dataUpdate.id);
    if (index !== -1) {
      // Nếu tìm thấy, cập nhật giá trị của phần tử tại index đó
      setItems(prevList => {
        const updatedItems = [...prevList];
        // Sao chép các giá trị cũ từ phần tử tìm thấy
        const oldItem = updatedItems[index];
        // Cập nhật chỉ các thuộc tính cần thay đổi từ dataUpdate
        updatedItems[index] = {
          ...oldItem,
          videotag: dataUpdate.videotag,
          videotitle: dataUpdate.videotitle,
          videodescrible: dataUpdate.videodescrible,
        };
        return updatedItems;
      });
    } else {
      // Nếu không tìm thấy, thêm phần tử mới vào mảng
      setItems(prevList => [...prevList, dataUpdate]);
    }

    showToast('Thông báo', 'success', 'Cập nhật thành công');
    setShowupDate(true);
    Animated.timing(bnt, {
      toValue: -windowHeight,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };
  const hanldleClickQuestion = () => {
    setshowDilog(prevState => ({
      ...prevState,
      question: false,
    }));

    // setshowDilog(prevState => ({
    //   ...prevState,
    //   question: false,
    // }));
  };
  const hanldleClick = () => {
    setshowDilog(prevState => ({
      ...prevState,
      fail: false,
    }));
  };
  const hanldleOk = async () => {
    setshowDilog(prevState => ({
      ...prevState,
      question: false,
    }));
    const result = await FetchVideo.Delete(txt.id, txt.videoid);
    if (result.status == 404) {
      return setshowDilog(prevState => ({
        ...prevState,
        fail: true,
        messenger: 'Không tìm thấy video cần xóa!',
        title: 'Thông báo!',
      }));
    }
    if (result.status == 400) {
      return setshowDilog(prevState => ({
        ...prevState,
        fail: true,
        messenger: 'Bạn không thể xóa video ngay bây giờ!',
        title: 'Thông báo!',
      }));
    }
    setItems(prevItems => prevItems.filter(item => item.id !== txt.videoid));

    showToast('Thông báo', 'success', 'Xóa thành công');
    setShowupDate(true);
    Animated.timing(bnt, {
      toValue: -windowHeight,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };
  const handleDelete = () => {
    setshowDilog(prevState => ({
      ...prevState,
      question: true,
      messenger: 'Bạn muốn xóa video này không!',
      title: 'Thông báo!',
    }));
  };
  const loadMoreItems = async () => {
    try {
      const nextPage = currentPage + 1;

      if (total / 10 + 1 < nextPage) {
        setIsLoadMore(false);
        return console.log('không laod nữa', nextPage, total / 10 + 1);
      }
      const user: User = await LocalStorage.getData('user');
      const result = await FetchVideo.GetAllUser(nextPage, user ? user.id : -1);
      console.log(result.data);
      setItems(prevList => [...prevList, ...result.data]);

      setCurrentPage(nextPage);
    } catch (error) {
      console.error('Error loading more items:', error);
    }
  };
  // Hàm tải dữ liệu mới khi refresh
  const onRefresh = async () => {
    setRefreshing(true);
    setIsLoadMore(true);
    const user: User = await LocalStorage.getData('user');
    const result = await FetchVideo.GetAllUser(
      currentPage,
      user ? user.id : -1,
    );

    setCurrentPage(1);
    setTotal(result.total);
    setItems(result.data);
    setRefreshing(false);
  };
  return (
    <View style={styles.container}>
      {items ? (
        <FlatGrid
          itemDimension={100}
          data={items}
          style={styles.gridView}
          spacing={2}
          onEndReached={loadMoreItems}
          // onEndReachedThreshold={2}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={({item, index}) => (
            <Items
              taile={item.videotitle}
              msg={item.videodescrible}
              uri={item.videouri ? item.videouri : ''}
              id={item.userid ? item.userid : -1}
              video_id={item.id ? item.id : -1}
              key={index}
              showBottomSheet={showBottomSheet}
              tag={item.videotag}
            />
          )}
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
      <Animated.View style={[styles.bntSheet, {bottom: bnt}]}>
        <TouchableOpacity onPress={closedBottomSheet}>
          <View style={{height: windowHeight - h1}}></View>
        </TouchableOpacity>
        <View style={[styles.bntBottom, {height: h1}]}>
          {showupDate ? (
            <View>
              <TouchableOpacity style={styles.item} onPress={handleUpdate}>
                <Image
                  style={{width: 20, height: 20}}
                  source={require('../../../../assets/iconpng/update.png')}></Image>
                <Text style={styles.txt1}>Sửa</Text>
              </TouchableOpacity>
              <View style={styles.line} />
              <TouchableOpacity style={styles.item} onPress={handleDelete}>
                <Image
                  style={{width: 20, height: 20}}
                  source={require('../../../../assets/iconpng/delete1.png')}></Image>
                <Text style={styles.txt1}>Xóa</Text>
              </TouchableOpacity>
              <View style={styles.line} />
            </View>
          ) : (
            <View style={{padding: 10}}>
              <View>
                <Text
                  style={{
                    alignSelf: 'center',
                    fontSize: 20,
                    color: ColorLight.textBlack,
                    fontWeight: 'bold',
                  }}>
                  Update
                </Text>
              </View>
              <Controller
                control={control}
                name="videotag"
                render={({field: {onChange, onBlur, value}}) => (
                  <View>
                    <View
                      style={[
                        styles.inputContainer,
                        errors.videotag ? styles.brError : styles.brSuccess,
                      ]}>
                      <TextInput
                        style={styles.input}
                        placeholder={'Nhập tag'}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    </View>
                    {errors.videotag && (
                      <Text style={styles.textError}>
                        {errors.videotag.message}
                      </Text>
                    )}
                  </View>
                )}
              />
              <Controller
                control={control}
                name="videotitle"
                render={({field: {onChange, onBlur, value}}) => (
                  <View>
                    <View
                      style={[
                        styles.inputContainer,
                        errors.videotitle ? styles.brError : styles.brSuccess,
                      ]}>
                      <TextInput
                        style={styles.input}
                        placeholder={'Nhập tiêu đề video'}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    </View>
                    {errors.videotitle && (
                      <Text style={styles.textError}>
                        {errors.videotitle.message}
                      </Text>
                    )}
                  </View>
                )}
              />
              <Controller
                control={control}
                name="videodescrible"
                render={({field: {onChange, onBlur, value}}) => (
                  <View>
                    <View
                      style={[
                        styles.inputContainer,
                        errors.videodescrible
                          ? styles.brError
                          : styles.brSuccess,
                      ]}>
                      <TextInput
                        style={styles.input}
                        placeholder={'Nhập tiêu nội dung video'}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    </View>
                    {errors.videodescrible && (
                      <Text style={styles.textError}>
                        {errors.videodescrible.message}
                      </Text>
                    )}
                  </View>
                )}
              />
              <View>
                <TouchableOpacity
                  style={[
                    styles.bntLogin,
                    errors.videotag ||
                    errors.videotitle ||
                    errors.videodescrible
                      ? {backgroundColor: ColorLight.bntfail}
                      : {backgroundColor: ColorLight.bntOk},
                  ]}
                  onPress={handleSubmit(onSubmit)}>
                  <Text style={[styles.textbnt]}>Tiếp</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </Animated.View>
      <SuccessFail
        onclick={hanldleClick}
        visible={showDilog.fail}
        describle={showDilog.messenger}
        title={showDilog.title}
      />
      <QuestionAlert
        onclick={hanldleClickQuestion}
        visible={showDilog.question}
        describle={showDilog.messenger}
        title={showDilog.title}
        onclickOK={hanldleOk}
      />
    </View>
  );
};

export default ListVideo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorLight.pkBg,
    padding: 10,
  },
  gridView: {
    marginTop: 10,
    flex: 1,
  },
  bntSheet: {
    // backgroundColor: 'rgba(0,0,0, 0.3)',
    height: windowHeight,
    width: windowWidth,
    position: 'absolute',
  },
  bntBottom: {
    backgroundColor: ColorLight.pkBg,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderWidth: 1,
  },
  item: {
    height: 60,
    //justifyContent: 'center',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  line: {
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    marginHorizontal: 10,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    fontWeight: '500',
  },
  inputContainer: {
    height: 60,
    borderBottomWidth: 1,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bntLogin: {
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 50,
  },
  textbnt: {
    fontSize: 16,
    fontWeight: '500',
  },
  taitle: {
    fontSize: 16,
    fontWeight: '500',
    paddingVertical: 20,
    color: '#000',
  },
  describle: {
    color: '#000',
  },
  textFogetPassword: {
    color: '#000',
    paddingVertical: 20,
    fontWeight: '500',
  },
  textError: {
    color: 'red',
  },
  brError: {
    borderColor: 'red',
  },
  brSuccess: {
    borderColor: 'gray',
  },
  txt1: {
    marginLeft: 20,
    color: ColorLight.textBlack,
    fontWeight: '600',
  },
});

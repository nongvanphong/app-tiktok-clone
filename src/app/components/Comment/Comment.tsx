import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  FlatList,
} from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import {ColorLight} from '../../../../assets/colors/colorLight';

import ItemCmt from './item/ItemCmt';
import HomeContext from '../../../Context/HomeContext';
import {FetchComment} from '../../../servers/Comment/FetchComment';
import {Comments} from '../../../interface/interfaceComment';
import LoadMore from '../load/loadMore/LoadMore';
import {LocalStorage} from '../../localStorage/LocalStorage';
import {User} from '../../../interface/InterfaceUser';
import {MyAlertContext} from '../../../../App';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Comment = () => {
  const {VideoID, setIsCmtShown, myId} = useContext(HomeContext);

  const {showToast1, socket} = useContext(MyAlertContext);
  const [data, setData] = useState<Comments[]>([]);
  const [comment, setComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [isUser, setIsUser] = useState(false);
  useEffect(() => {
    const getComment = async () => {
      try {
        if (!VideoID) return;
        const result = await FetchComment.GetAll(VideoID);
        setData(result.data);
        setTotal(result.total);
        setIsLoading(true);
        const user: User = await LocalStorage.getData('user');

        if (!user) {
          return setIsUser(false);
        }
        setIsUser(true);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    getComment();
  }, [VideoID]);

  const handleCommentChange = text => {
    setComment(text);
  };

  const handleSendComment = async () => {
    if (!VideoID) return;
    const user: User = await LocalStorage.getData('user');
    if (!user.id) return;

    const result = await FetchComment.Create(user.id, comment, VideoID);

    if (result.status != 200)
      return console.log('comment thất bại===============================');
    const dataUpdate = {
      id: result.data.id,
      userid: user.id,
      videoid: result.data.videoId,
      messenger: result.data.messenger,
      createdAt: result.data.createdAt,
      updatedAt: result.data.updatedAt,
      User: {
        id: user.id,
        userid: user.userid,
        username: user.username,
        userimage: user.userimage,
      },
    };
    socket.emit('notify', {
      userId: myId,
      mesenger: result.data.messenger,
      username: user.username,
    });
    setData(prevList => [dataUpdate, ...prevList]);
    setComment('');
  };
  const handlClose = () => {
    setIsCmtShown(false);
  };
  const handlDelete = async (commentId: number, myId: number) => {
    if (!VideoID) return;
    const result = await FetchComment.Delete(commentId, myId, VideoID);
    console.log(result.status);
    if (result.status != 200) {
      console.log('comment thất bại===============================');
      return false;
    }

    setData(prevList => prevList.filter(item => item.id !== commentId));
    return true;
  };

  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        <TouchableOpacity
          onPress={handlClose}
          style={styles.top}></TouchableOpacity>
        {isLoading ? (
          <View style={styles.bnt}>
            <Text style={[styles.text, styles.taitle]}>{total} commnet</Text>
            <FlatList
              style={{flex: 1}}
              data={data}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) => (
                <ItemCmt
                  name={item.User.username}
                  msg={item.messenger}
                  date={item.createdAt}
                  userId={item.User.id ? item.User.id : 0}
                  commentId={item.id ? item.id : -1}
                  avatar={item.User.userimage}
                  handleDelete={handlDelete}
                />
              )}
              showsVerticalScrollIndicator={false}

              // ListFooterComponent={LoadMore}
              // onEndReached={loadMoreItems}
              // onEndReachedThreshold={2}
            />
            {isUser && (
              <View style={styles.containerInput}>
                <TextInput
                  style={styles.input}
                  placeholder="Add a comment..."
                  placeholderTextColor={'gray'}
                  value={comment}
                  onChangeText={handleCommentChange}
                />
                <TouchableOpacity
                  style={styles.sendButton}
                  onPress={handleSendComment}>
                  <Image
                    style={styles.iconSend}
                    source={require('../../../../assets/iconpng/send.png')}></Image>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              backgroundColor: ColorLight.pkBg,
            }}>
            <LoadMore></LoadMore>
          </View>
        )}
      </View>
    </View>
  );
};

export default Comment;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    width: windowWidth,
    height: windowHeight,
    paddingBottom: 60,
  },
  top: {
    flex: 1,
  },
  bnt: {
    flex: 2,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  text: {
    color: ColorLight.textBlack,
  },
  taitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },

  icon: {
    width: 30,
    height: 30,
    backgroundColor: 'green',
  },
  iconSend: {
    width: 20,
    height: 30,
  },
  containerInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  input: {
    flex: 1,
    height: 40,
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    color: ColorLight.textBlack,
  },
  sendButton: {
    marginLeft: 10,
    padding: 10,
    borderRadius: 20,

    alignItems: 'center',
    justifyContent: 'center',
  },
});

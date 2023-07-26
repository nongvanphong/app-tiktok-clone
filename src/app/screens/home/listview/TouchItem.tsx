import {StyleSheet, Image, View, Text, TouchableOpacity} from 'react-native';
import React, {useState, useContext} from 'react';
import Lottie from 'lottie-react-native';
import HomeContext from '../../../../Context/HomeContext';
type Typer = {
  like_number?: number;
  comment_number?: number;

  videoId: number;
};
const TouchItem = React.memo((prosp: Typer) => {
  const {setVideoID, setIsCmtShown} = useContext(HomeContext);
  const [isLike, setIsLike] = useState(false);

  const [data, setData] = useState<Typer>({
    like_number: prosp.like_number,
    comment_number: prosp.comment_number,
    videoId: prosp.videoId,
  });
  const like = () => {
    if (data.like_number == undefined || data.like_number < 0) return;
    if (isLike) {
      let a = data.like_number - 1;
      setData({...data, like_number: a});
      return setIsLike(false);
    }
    if (!isLike) {
      let a = data.like_number + 1;
      setData({...data, like_number: a});
      return setIsLike(true);
    }
  };

  const comment = () => {
    setVideoID(prosp.videoId);
    setIsCmtShown(true);
  };
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <View style={[styles.flex, styles.border]}>
          <Image
            style={styles.avt}
            source={require('../../../../../assets/images/a.jpg')}></Image>
          <TouchableOpacity style={styles.add}>
            <Image
              style={styles.iconAdd}
              source={require('../../../../../assets/iconpng/add.png')}></Image>
          </TouchableOpacity>
        </View>
        <View style={styles.flex}>
          {isLike ? (
            <TouchableOpacity onPress={like}>
              <Image
                source={require('../../../../../assets/iconpng/favourite.png')}
                style={[styles.love, {tintColor: 'red'}]}></Image>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={like}>
              <Image
                source={require('../../../../../assets/iconpng/favourite1.png')}
                style={styles.love}></Image>
            </TouchableOpacity>
          )}

          <Text style={styles.textColor}>{data.like_number}</Text>
        </View>
        <View style={styles.flex}>
          <TouchableOpacity onPress={comment}>
            <Image
              source={require('../../../../../assets/iconpng/cmt.png')}
              style={styles.love}></Image>
          </TouchableOpacity>
          <Text style={styles.textColor}>{prosp.comment_number}</Text>
        </View>
      </View>
    </View>
  );
});

export default TouchItem;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',

    height: '35%',
    width: 60,
    right: 0,
    justifyContent: 'flex-end',
    bottom: '25%',
  },
  item: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'space-between',
  },
  avt: {
    width: 50,
    height: 50,
    backgroundColor: 'pink',
    borderRadius: 100,
  },
  love: {
    width: 40,
    height: 40,
    tintColor: '#ffff',
  },
  flex: {
    alignItems: 'center',
  },
  textColor: {
    color: '#ffff',
  },
  add: {
    width: 20,
    height: 20,
    backgroundColor: 'red',
    position: 'absolute',
    bottom: -10,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconAdd: {
    width: 15,
    height: 15,
    tintColor: '#ffff',
  },
  border: {
    borderWidth: 2,
    borderColor: '#ffff',
    borderRadius: 50,
  },
  favourite: {
    width: 230,
    height: 230,
    position: 'absolute',
    top: -48,
    zIndex: 1,
  },
});

import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import React, {useRef, useEffect, useState} from 'react';
import Video from 'react-native-video';
import {ColorLight} from '../../../../../assets/colors/colorLight';

import Lottie from 'lottie-react-native';
import TouchItem from './TouchItem';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import * as Progress from 'react-native-progress';
import ProgressBar from '../../../components/load/proress/ProgressBar';
type types = {
  id: number;
  uri: string;
  pause: boolean;
};
const Item = (props: types) => {
  const playerRef = useRef(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [videoDuration, setVideoDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isLottieVisible, setIsLottieVisible] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    // Đặt một khoảng thời gian (vd: 3 giây) trước khi biến mất phần tử Lottie
    const timeout = setTimeout(() => {
      setIsLottieVisible(false);
    }, 500);

    // Xóa timeout khi component bị unmount
    return () => {
      clearTimeout(timeout);
    };
  }, [isLottieVisible]);
  const puseVideo = () => {
    console.log('=>', isVideoPlaying);
    setClickCount(prevCount => prevCount + 1);

    if (clickCount === 0) {
      setTimeout(() => {
        setClickCount(0);
      }, 200); // Đặt thời gian giới hạn giữa hai lần nhấp chuột là 300ms
    } else if (clickCount >= 1) {
      // Người dùng đã nhấp chuột hai lần liên tiếp
      console.log('Người dùng đã nhấp chuột hai lần liên tiếp');
      // Thực hiện các hành động khác tại đây
      setIsVideoPlaying(true);
      return setIsLottieVisible(true);
    }

    if (isVideoPlaying == true) {
      setIsVideoPlaying(false);
    }
    if (isVideoPlaying == false) {
      setIsVideoPlaying(true);
    }
  };

  const handleOnLoad = data => {
    setVideoDuration(data.duration);
  };

  const handleOnProgress = data => {
    setCurrentTime(data.currentTime);
  };

  const onBuffer = () => {
    console.log('---1');
    // Xử lý khi video đang buffer
  };

  const videoError = () => {
    // Xử lý khi xảy ra lỗi video
    console.log('---2');
  };
  const videoEnd = () => {
    console.log('endooo');
  };
  const handlePlaybackRateChange = rate => {
    console.log(rate);
    if (rate === 1) {
      // Xác định video hiện tại đang được xem
      setCurrentVideoIndex(Math.floor(currentTime / videoDuration));
    }
  };

  return (
    <View style={[styles.container]}>
      <TouchableHighlight
        style={styles.backgroundVideo}
        activeOpacity={1}
        underlayColor="transparent"
        onPress={() => puseVideo()}>
        <View style={styles.backgroundVideo}>
          <Video
            source={{
              uri: props.uri,
            }}
            ref={playerRef}
            onBuffer={onBuffer}
            onError={videoError}
            style={styles.backgroundVideo}
            resizeMode="cover"
            // paused={!isVideoPlaying} // dùng vidoe
            paused={!props.pause || !isVideoPlaying}
            repeat={true}
            onend={videoEnd}
            onProgress={handleOnProgress}
            onLoad={handleOnLoad}
            onPlaybackRateChange={handlePlaybackRateChange} // Xử lý sự kiện khi tốc độ phát video thay đổi
            playWhenInactive={false} // tạm dừng video vẫn hiển thị
            preLoad="none" // Không tải dữ liệu cho video
          />
          <View style={styles.favourite}>
            {isLottieVisible && (
              <Lottie
                style={styles.dropIcon}
                autoPlay
                loop
                source={require('../../../../../assets/json/dropfavourite.json')}
              />
            )}
          </View>
        </View>
      </TouchableHighlight>
      <ProgressBar timeStart={currentTime} timeEnd={videoDuration} />
      <TouchItem />

      {/* <Text>{`Duration: ${videoDuration.toFixed(2)}`}</Text>
      <Text>{`Current Time: ${currentTime.toFixed(2)}`}</Text> */}
    </View>
  );
};

export default Item;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: windowHeight,
  },
  backgroundVideo: {
    flex: 1,
  },
  pauVideo: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  brAll20: {
    borderRadius: 20,
  },
  row: {
    flexDirection: 'row',
    flex: 1,
  },
  rowItem: {
    flex: 1,
  },
  containerImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  img: {
    width: 150,
    height: 150,
    borderRadius: 1000,
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  felxRow: {
    flexDirection: 'row',
  },
  itemCenter: {
    alignItems: 'center',
  },
  mgL: {
    marginLeft: 10,
  },
  txt: {
    color: ColorLight.txtbl,
  },
  txtSize10: {
    fontSize: 10,
  },
  txtSize20: {
    fontSize: 20,
  },
  txtTitle: {
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: 2,
  },
  mgBt: {
    marginBottom: 10,
  },
  favourite: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropIcon: {
    width: 200,
    height: 200,
  },
});

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

import ProgressBar from '../../../components/load/proress/ProgressBar';
import ButtomVideo from '../../../components/item/ItemVideo/ButtomVideo';

type types = {
  id?: number;

  pause?: boolean;
  createdAt?: string;
  videoDescrible?: string;
  userName?: string;
  tag?: string;
  handlClick: (pause: boolean, i: number) => void;
  index: number;
  iduser?: number;
  namevideo?: string;
  uriVideo?: string;
  like_number?: number;
  comment_number?: number;
  your_like?: number;
  myId?: number;
  image?: string;
};
const Item = React.memo((props: types) => {
  const playerRef = useRef(null);
  const [videoDuration, setVideoDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isLottieVisible, setIsLottieVisible] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [isplay, setIsPlay] = useState<boolean>(true);
  const [showPause, setShowPause] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  
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

  const puseVideo = event => {
    const {locationX, locationY} = event.nativeEvent;
    setX(locationX - 100);
    setY(locationY - 100);
    setClickCount(prevCount => prevCount + 1);
    if (clickCount === 0) {
      setTimeout(() => {
        setClickCount(0);
      }, 200); // Đặt thời gian giới hạn giữa hai lần nhấp chuột là 300ms
    } else if (clickCount >= 1) {
      // Người dùng đã nhấp chuột hai lần liên tiếp
      //console.log('Người dùng đã nhấp chuột hai lần liên tiếp');
      // Thực hiện các hành động khác tại đây
      props.handlClick(true, props.index);

      return setIsLottieVisible(true);
    }
    if (props.pause == true) {
      props.handlClick(false, props.index);
      setShowPause(true);
      // Thiết lập thời gian ẩn sau 3 giây
      setTimeout(() => {
        setShowPause(false);
      }, 1000);
    }
    if (props.pause == false) {
      props.handlClick(true, props.index);
      setShowPause(true);
      // Thiết lập thời gian ẩn sau 3 giây
      setTimeout(() => {
        setShowPause(false);
      }, 1000);
    }
  };

  const handleOnLoad = data => {
    //  console.log('=======>', data.duration);
    setVideoDuration(data.duration);
  };

  const handleOnProgress = data => {
    setCurrentTime(data.currentTime);
  };

  const onBuffer = ({isBuffering}) => {
    console.log(isBuffering, 'Video is buffering...'); // Thêm thông báo log bên trong hàm
    if (isBuffering) {
      // Video đang bị lắc, có thể hiển thị màn hình đệm
      console.log('Video is buffering...');
    } else {
      // Video đã đủ dữ liệu để phát tiếp, có thể tiếp tục phát
      console.log('Buffering complete. Continue playback.');
    }
  };

  const videoError = error => {
    // Xử lý khi xảy ra lỗi video

    console.log('Video playback error:', error);
  };
  const videoEnd = () => {
    console.log('endooo');
  };
  const handlePlaybackRateChange = rate => {
    console.log('======>', rate);
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
        onPress={puseVideo}>
        <View style={styles.backgroundVideos}>
          <Video
            source={{
              uri: props.uriVideo,
            }}
            ref={playerRef}
            onBuffer={onBuffer}
            onError={videoError}
            style={styles.backgroundVideo}
            resizeMode="contain"
            // paused={!isVideoPlaying} // dùng vidoe
            paused={!props.pause}
            // paused={isplay}
            repeat={true}
            onend={videoEnd}
            onProgress={handleOnProgress}
            onLoad={handleOnLoad}
            onPlaybackRateChange={handlePlaybackRateChange} // Xử lý sự kiện khi tốc độ phát video thay đổi
            playWhenInactive={false} // tạm dừng video vẫn hiển thị
            // preLoad="none" // Không tải dữ liệu cho video
            preLoad="auto" // Tải một phần dữ liệu video trước khi phát
            bufferConfig={{
              minBufferMs: 5000,
              maxBufferMs: 15000,
              bufferForPlaybackMs: 1000,
              bufferForPlaybackAfterRebufferMs: 1000,
            }}
          />
          <View style={{position: 'absolute', top: y, left: x}}>
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
      <TouchItem
        like_number={props.like_number}
        comment_number={props.comment_number}
        videoId={props.id ? props.id : 0}
        your_like={props.your_like ? props.your_like : 1}
        myId={props.myId ? props.myId : -1}
        avatar={props.image}
      />
      <ButtomVideo
        msg={props.videoDescrible ? props.videoDescrible : ''}
        tag={props.tag ? props.tag : ''}
        userName={props.userName ? props.userName : ''}
        date={props.createdAt ? props.createdAt : ''}
      />
      {showPause && (
        <Image
          source={
            !props.pause
              ? require('../../../../../assets/iconpng/play.png')
              : require('../../../../../assets/iconpng/pause.png')
          }
          style={styles.pause}
        />
      )}
    </View>
  );
});

export default Item;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: windowHeight - 60,
  },
  backgroundVideo: {
    width: windowWidth,
    height: windowHeight - 60,
    backgroundColor: '#000',
  },
  backgroundVideos: {
    justifyContent: 'center',
    alignItems: 'center',

    //marginBottom: 100,
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
  pause: {
    tintColor: 'rgba(49, 49, 49, .5)',
    width: 50,
    height: 50,
    position: 'absolute',
    top: '50%', // Căn giữa theo chiều dọc
    left: '50%', // Căn giữa theo chiều ngang
    marginLeft: -25, // Điều chỉnh vị trí ngang để căn giữa chính xác
    marginTop: -25, // Điều chỉnh vị trí dọc để căn giữa chính xác
  },
});

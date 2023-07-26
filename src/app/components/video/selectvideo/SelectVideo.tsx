import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import Video from 'react-native-video';
import Lottie from 'lottie-react-native';
import ProgressBar from '../../load/proress/ProgressBar';
import {ColorLight} from '../../../../../assets/colors/colorLight';
import PreViewVideo from '../../../screens/videocreen/components/preViewVideo/PreViewVideo';
import TouchItem from '../../../screens/home/listview/TouchItem';
import ButtomVideo from '../../item/ItemVideo/ButtomVideo';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
type Type = {
  uri?: string;
  isShow: boolean;
  handleShow: () => void;
  dataText: object;
};
const SelectVideo = (props: Type) => {
  const playerRef = useRef(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [videoDuration, setVideoDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isLottieVisible, setIsLottieVisible] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const puseVideo = () => {
    console.log('=>', isVideoPlaying);

    if (isVideoPlaying == true) {
      setIsVideoPlaying(false);
    }
    if (isVideoPlaying == false) {
      setIsVideoPlaying(true);
    }
  };

  const handleOnLoad = data => {
    // lấy ra khích thước của video
    const {naturalSize} = data;
    const {width, height} = naturalSize;
    console.log('Width:', width);
    console.log('Height:', height);
    // set thời gian của video
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
    <View style={styles.container}>
      <TouchableHighlight
        style={styles.backgroundVideo}
        activeOpacity={1}
        underlayColor="transparent"
        onPress={() => puseVideo()}>
        <View style={styles.backgroundVideos}>
          <Video
            source={{uri: props.uri}}
            ref={playerRef}
            onBuffer={onBuffer}
            onError={videoError}
            style={styles.backgroundVideo}
            resizeMode="contain"
            paused={!isVideoPlaying} // dùng vidoe
            repeat={true}
            onend={videoEnd}
            onProgress={handleOnProgress}
            onLoad={handleOnLoad}
            // onLoad={videoInfo => {
            //   const {naturalSize} = videoInfo;
            //   const {width, height} = naturalSize;
            //   console.log('Width:', width);
            //   console.log('Height:', height);
            // }}
            onPlaybackRateChange={handlePlaybackRateChange} // Xử lý sự kiện khi tốc độ phát video thay đổi
            playWhenInactive={false} // tạm dừng video vẫn hiển thị
            preLoad="none" // Không tải dữ liệu cho video
          />
        </View>
      </TouchableHighlight>
      <ProgressBar timeStart={currentTime} timeEnd={videoDuration} />
      <View
        style={{
          width: windowWidth,
          height: windowHeight,
          position: 'absolute',
          left: 10,
        }}>
        <PreViewVideo click={props.handleShow} check={props.isShow} />
      </View>
      {!props.isShow && <TouchItem />}
      {!props.isShow && (
        <ButtomVideo
          msg={props.dataText ? props.dataText.msg : ''}
          tag={props.dataText ? props.dataText.tag : ''}
          userName="phong 1"
          date={'2023-03-07'}
        />
      )}
    </View>
  );
};

export default SelectVideo;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: windowHeight,
  },
  backgroundVideo: {
    width: windowWidth,
    height: windowHeight,
    backgroundColor: 'black',
  },
  backgroundVideos: {
    width: windowWidth,
    height: windowHeight,
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

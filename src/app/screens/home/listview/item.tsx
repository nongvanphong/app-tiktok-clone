import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useRef, useEffect, useState} from 'react';
import Video from 'react-native-video';
import {ColorLight} from '../../../../../assets/colors/colorLight';
import {Svgs} from '../../../../../assets/icons';
import {SvgXml} from 'react-native-svg';
import TouchItem from './TouchItem';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
type types = {
  index: number;
};
const Item = (a: types) => {
  const playerRef = useRef(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [videoDuration, setVideoDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  // useEffect(() => {
  //   console.log('=>', isVideoPlaying);
  //   if (!isVideoPlaying) {
  //     setIsVideoPlaying(true);
  //   }
  // }, [isVideoPlaying]);
  const puseVideo = () => {
    console.log('=> 1', isVideoPlaying);

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
    console.log('ooo');
  };
  const handlePlaybackRateChange = rate => {
    console.log(rate);
    if (rate === 1) {
      // Xác định video hiện tại đang được xem
      setCurrentVideoIndex(Math.floor(currentTime / videoDuration));
    }
  };
  return (
    <View
      style={[
        styles.container,
        // a.index % 2 === 0 ? styles.blackBackground : styles.redBackground,
      ]}>
      <Video
        source={
          a.index % 2 === 0
            ? require('../../../../../assets/videos/b.mp4')
            : require('../../../../../assets/videos/c.mp4')
        }
        ref={playerRef}
        onBuffer={onBuffer}
        onError={videoError}
        style={styles.backgroundVideo}
        resizeMode="cover"
        paused={!isVideoPlaying}
        repeat={true}
        onend={videoEnd}
        onProgress={handleOnProgress}
        onLoad={handleOnLoad}
        onPlaybackRateChange={handlePlaybackRateChange} // Xử lý sự kiện khi tốc độ phát video thay đổi
      />
      <TouchableOpacity style={styles.pauVideo} onPress={() => puseVideo()} />
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
    // backgroundColor: 'rgba(255, 0, 255, 0.2)',
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
});

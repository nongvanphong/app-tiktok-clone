import React, {useRef} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import Video from 'react-native-video';

const Videosss = () => {
  const playerRef = useRef(null);

  const onBuffer = () => {
    // Xử lý khi video đang buffer
  };

  const videoError = () => {
    // Xử lý khi xảy ra lỗi video
  };

  return (
    <View>
      <Image
        style={{width: 100, height: 100, backgroundColor: 'red'}}
        source={{
          uri: 'http://192.168.10.19:1234/videos/single?video=videos_temp/a.jpg',
        }}
      />
      <Video
        source={{
          uri: 'http://192.168.10.19:1234/videos/single?video=videos_temp/file-1688696999118-884499731Download.mp4',
        }}
        ref={playerRef}
        onBuffer={onBuffer}
        onError={videoError}
        style={styles.backgroundVideo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundVideo: {
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // bottom: 0,
    // right: 0,
    backgroundColor: 'green',
    height: 400,
    width: 200,
  },
});

export default Videosss;

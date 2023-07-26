import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import * as ImagePicker from 'react-native-image-picker';
import SelectVideo from '../../components/video/selectvideo/SelectVideo';
import FloatButtom from './components/floatbuttom/FloatButtom';
import ButtonSend from './components/buttom/ButtonSend';
import Loading from '../../components/loading/loadingvideo/Loading';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const LiveVideoScreen = ({navigation: {goBack}}) => {
  const [uriVideo, setUriVideo] = useState<string | undefined>(undefined);
  const pickVideo = () => {
    let options = {
      title: 'Select video',
      mediaType: 'video',
      path: 'video',
      quality: 1,
    };
    ImagePicker.launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = {uri: response.uri};
        console.log('response', JSON.stringify(response));
        console.log('uri => ', response.assets[0].uri);
        console.log('width => ', response.assets[0].width);
        console.log('height => ', response.assets[0].height);
        console.log('fileSize => ', response.assets[0].fileSize);
        console.log('type => ', response.assets[0].type);
        console.log('fileName => ', response.assets[0].fileName);
        setUriVideo(response.assets[0].uri);
      }
    });
  };

  const bntSave = () => {
    alert('send');
  };
  const bntGoback = () => {
    goBack();
  };
  const bntAdd = () => {
    pickVideo();
  };
  const bntWrite = () => {
    alert('wirite');
  };

  return (
    <View style={{flex: 1}}>
      {uriVideo == undefined ? <Loading /> : <SelectVideo uri={uriVideo} />}
      <ButtonSend bntClick={bntSave} />
      <View
        style={{
          width: windowWidth,
          height: windowHeight,
          position: 'absolute',
        }}>
        <FloatButtom
          bntAdd={bntAdd}
          bntGoback={bntGoback}
          bntWrite={bntWrite}
        />
      </View>
    </View>
  );
};

export default LiveVideoScreen;

const styles = StyleSheet.create({});

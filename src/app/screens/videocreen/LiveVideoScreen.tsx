import {StyleSheet, View, Dimensions, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import * as ImagePicker from 'react-native-image-picker';
import SelectVideo from '../../components/video/selectvideo/SelectVideo';
import FloatButtom from './components/floatbuttom/FloatButtom';
import ButtonSend from './components/buttom/ButtonSend';
import Loading from '../../components/loading/loadingvideo/Loading';
import {FetchVideo} from '../../../servers/video/FetchVideo';
import SuccessAlert from './../../components/alert/alert/SuccessAlert';
import WriteText from './components/writeText/WriteText';
import InterfaceAlert from '../../../interface/interfaceAlert';
import PreViewVideo from './components/preViewVideo/PreViewVideo';
import {ColorLight} from '../../../../assets/colors/colorLight';
import Login from './../login/login';
import {boolean} from 'yup';
import LoginAlert from '../../components/alert/alert/LoginAlert';
import {useNavigation} from '@react-navigation/native';
import {User} from '../../../interface/InterfaceUser';
import {LocalStorage} from '../../localStorage/LocalStorage';
import SuccessFail from '../../components/alert/alert/SuccessFail';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const LiveVideoScreen = ({navigation: {goBack}}) => {
  const navigater = useNavigation();
  const [isL, setisL] = useState<boolean>(false);
  const [uriVideo, setUriVideo] = useState<string | undefined>(undefined);
  const [file, setFile] = useState<File>();
  const [showDilog, setshowDilog] = useState<InterfaceAlert[]>({
    write: false,
    fail: false,
    sussecc: false,
    login: false,
  });
  const [isShow, setIsShow] = useState<boolean>(true);
  const [dataText, setDataText] = useState<object | undefined>();
  const [progress, setProgress] = useState(0);
  const handleShow = () => {
    if (isShow) {
      setIsShow(false);
      console.log('1');
    } else {
      setIsShow(true);
      console.log('2');
    }
  };
  useEffect(() => {
    pickVideo();
  }, []);

  const pickVideo = () => {
    let options: any = {
      title: 'Quay video',
      mediaType: 'video',
      path: 'video',
      videoQuality: 'high',
      durationLimit: 30,
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
        setUriVideo(response.assets[0].uri);
        const files: File = {
          uri: response.assets[0].uri,
          type: response.assets[0].type,
          name: response.assets[0].fileName,
        };

        setFile(files);
      }
    });
  };

  const bntSave = async () => {
    try {
      setisL(true);
      if (!file)
        return setshowDilog(prevState => ({
          ...prevState,
          fail: true,
          title: 'Cảnh báo!',
          messenger: 'Vui lòng chọn video',
        }));
      const data: User = await LocalStorage.getData('user');
      if (!data)
        return setshowDilog(prevState => ({...prevState, login: true}));
      setshowDilog(prevState => ({...prevState, login: false}));
      let msg = '';
      let name = '';
      let tag = '';

      if (dataText) {
        msg = dataText.msg;
        name = dataText.name;
        tag = dataText.tag;
      }
      console.log('========>', msg, name, tag);
      const result = await FetchVideo.Create(
        file,
        data.id,
        msg,
        name,
        tag,
        progress => setProgress(progress),
      );
      if (result.status === 201) {
        setisL(false);
        setshowDilog(prevState => ({...prevState, sussecc: true}));
        console.log('sussecc');
      } else {
        setisL(false);
        return setshowDilog(prevState => ({
          ...prevState,
          fail: true,
          messenger: 'Đăng video thất bại, vui lòng thử lại sau!',
        }));
      }
    } catch (error) {
      setisL(false);
      console.error('Error fetching users:', error);
    }
  };
  const bntGoback = () => {
    goBack();
  };
  const bntAdd = () => {
    pickVideo();
  };
  const bntWrite = () => {
    console.log(showDilog.write);
    setshowDilog(prevState => ({...prevState, write: true}));
  };
  const bntWriteOk = (data: object) => {
    if (data) setDataText(data);
    setshowDilog(prevState => ({...prevState, write: false}));
  };
  const bntCloseWrite = () => {
    setshowDilog(prevState => ({...prevState, write: false}));
  };

  const oclickAlertSuccess = () => {
    navigater.navigate('Settings');
    setshowDilog(prevState => ({...prevState, sussecc: false}));
  };
  const bntRegister = () => {
    setshowDilog(prevState => ({...prevState, login: false}));
    navigater.navigate('Login');
  };
  const bntSkip = () => {
    setshowDilog(prevState => ({...prevState, login: false}));
  };
  const handleClikError = () => {
    setshowDilog(prevState => ({
      ...prevState,
      fail: false,
    }));
  };
  return (
    <View style={{flex: 1, backgroundColor: ColorLight.pkBg}}>
      {uriVideo == undefined ? (
        <Loading />
      ) : (
        <SelectVideo
          uri={uriVideo}
          isShow={isShow}
          handleShow={handleShow}
          dataText={dataText}
        />
      )}
      <View style={{position: 'absolute'}}>
        {/* <Text style={{color: 'white'}}>{progress}%</Text> */}
      </View>
      {isShow && <ButtonSend txt={progress} isshow={isL} bntClick={bntSave} />}
      {isShow && (
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
      )}

      <SuccessAlert
        onclick={oclickAlertSuccess}
        title="Success"
        describle="Video đã được đăng"
        visible={showDilog.sussecc}
      />
      <WriteText
        onclick={bntWriteOk}
        onclose={bntCloseWrite}
        title="Nhập nội dụng video!"
        describle="Video đã được đăng"
        visible={showDilog.write}
      />
      <LoginAlert
        title="Bạn chưa có tài khoản"
        bntSkip={bntSkip}
        bntRegister={bntRegister}
        visible={showDilog.login}
      />
      <SuccessFail
        onclick={handleClikError}
        visible={showDilog.fail}
        describle={showDilog.messenger}
        title={showDilog.title}
      />
    </View>
  );
};

export default LiveVideoScreen;

const styles = StyleSheet.create({});

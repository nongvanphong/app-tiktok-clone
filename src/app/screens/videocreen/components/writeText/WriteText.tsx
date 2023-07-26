import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  TextInput,
} from 'react-native';
import Lottie from 'lottie-react-native';
type Type = {
  onclick: (data: object) => void;
  onclose: () => void;
  title?: string;
  describle?: string;
  visible: boolean;
};
type TextWrite = {
  tag?: string;
  name?: string;
  msg?: string;
};
const SuccessFail = (props: Type) => {
  const [textInput, setTextInput] = useState<TextWrite[]>([]);
  const handlClick = () => {
    props.onclick(textInput);
  };
  const handlClickClose = () => {
    props.onclose();
  };
  return (
    <Modal visible={props.visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.alertContainer}>
          <View style={styles.header}>
            <Text style={{fontSize: 20, fontWeight: '500'}}>
              header{props.title}
            </Text>
          </View>
          <View style={{width: '100%'}}>
            <TextInput
              style={styles.text}
              onChangeText={valun =>
                setTextInput(prevState => ({...prevState, tag: valun}))
              }
              value={textInput.tag}
              placeholder="Nhập Tag"
            />
            <View style={styles.line}></View>
            <TextInput
              style={styles.text}
              onChangeText={valun =>
                setTextInput(prevState => ({...prevState, name: valun}))
              }
              value={textInput.name}
              placeholder="Nhập nội dung video"
            />
            <View style={styles.line}></View>
            <TextInput
              style={styles.text}
              onChangeText={valun =>
                setTextInput(prevState => ({...prevState, msg: valun}))
              }
              value={textInput.msg}
              placeholder="Nhập nội dung video"
            />
          </View>
          <View style={styles.line}></View>
          <View style={styles.containerBnt}>
            <TouchableOpacity style={styles.bnt} onPress={handlClickClose}>
              <Text
                style={{fontSize: 16, fontWeight: '500', marginVertical: 10}}>
                Đóng
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bnt} onPress={handlClick}>
              <Text
                style={{fontSize: 16, fontWeight: '500', marginVertical: 10}}>
                Ok
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  header: {
    height: 50,
    width: '100%',
    backgroundColor: '#0ae9fe',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },

  alertContainer: {
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,1)',
    borderRadius: 20,
    width: '80%',

    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerBnt: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 20,
  },
  bnt: {
    paddingHorizontal: 30,

    backgroundColor: '#0ae9fe',
    alignSelf: 'center',
    borderRadius: 15,
  },
  line: {
    width: '100%',
    height: 2,
    backgroundColor: 'gray',
  },
  text: {
    width: '100%',

    paddingHorizontal: 10,
  },
});

export default SuccessFail;

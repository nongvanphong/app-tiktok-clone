import {StyleSheet, Text, FlatList, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Item from './Item/Item';
import {ColorLight} from '../../../../assets/colors/colorLight';
import SuccessAlert from '../../components/alert/alert/SuccessAlert';
import {useNavigation} from '@react-navigation/native';
const data = [
  {id: 1, title: 'Item 1'},
  {id: 2, title: 'Item 2'},
  {id: 3, title: 'Item 3'},
  // Add more data items as needed
];

const Notify = () => {
  const navigater = useNavigation();
  const [showDilog, setshowDilog] = useState<boolean>(true);
  useEffect(() => {
    const unsubscribe = navigater.addListener('focus', () => {
      setshowDilog(true);
    });

    return unsubscribe;
  }, [navigater]);
  const ok = () => {
    setshowDilog(false);
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => <Item />}
      />
      <SuccessAlert
        onclick={ok}
        title="Thông báo"
        describle="Chức năng đang phát triển!"
        visible={showDilog}
      />
    </View>
  );
};

export default Notify;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorLight.pkBg,
    padding: 10,
  },
});

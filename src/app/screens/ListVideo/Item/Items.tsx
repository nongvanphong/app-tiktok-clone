import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {createThumbnail} from 'react-native-create-thumbnail';
import {http} from '../../../../servers/api/api';

type p = {
  taile?: string;
  msg?: string;
  uri: string;
  id: number;
  video_id: number;
  tag?: string;
  showBottomSheet: (
    title?: string,
    msg?: string,
    tag?: string,
    id: number,
    video_id: number,
  ) => void;
};

const Items = (p: p) => {
  // console.log(`${http}/${p.id}/${p.uri}`);
  const [uri, setUri] = useState('');

  const [load, setLoad] = useState(false);
  useEffect(() => {
    // Hàm async IIFE để gọi hàm createThumbnail
    (async () => {
      try {
        setLoad(true);

        const thumbnail = await createThumbnail({
          url: `${http}/${p.id}/${p.uri}`,
          timeStamp: 1000,
        });
        setUri(thumbnail.path);
        setLoad(false);
      } catch (error) {
        console.log('Error getting thumbnail:', error);
      }
    })();
  }, [p.uri]);
  const longHandleClick = () => {
    p.showBottomSheet(p.taile, p.msg, p.tag, p.id, p.video_id);
  };
  return (
    <View>
      <TouchableOpacity onLongPress={longHandleClick}>
        <View style={[styles.itemContainer]}>
          {uri ? (
            <Image
              style={[styles.video, {backgroundColor: '#000'}]}
              source={{
                uri: uri,
              }}></Image>
          ) : (
            <View style={[styles.video, {backgroundColor: '#000'}]} />
          )}
          <View style={styles.content}>
            <Text style={styles.itemName}>
              {p.taile?.length > 10
                ? `${p.taile.slice(0, 40)}...`
                : `${p.taile}`}
            </Text>
            <Text style={styles.itemCode}>
              {p.msg?.length > 20 ? `${p.msg.slice(0, 40)}...` : `${p.msg}`}
            </Text>
          </View>
        </View>
        {load && (
          <ActivityIndicator
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginLeft: -10, // Điều chỉnh vị trí ngang để căn giữa chính xác
              marginTop: -10, // Điều chỉnh vị trí dọc để căn giữa chính xác
            }}
            size="small"
            color="#fff"
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Items;

const styles = StyleSheet.create({
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,

    height: 200,
  },
  itemName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 10,
    color: '#fff',
  },
  video: {
    flex: 1,
  },
  content: {
    position: 'absolute',
  },
});

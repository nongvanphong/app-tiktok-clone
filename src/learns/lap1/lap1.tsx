import {Button, FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import request from 'superagent';

interface product {
  createdAt?: string;
  describe?: string;
  id?: number;
  nameProduct?: string;
  piceProduct?: number;
  typeProduct?: string;
  updatedAt?: string;
}

interface dataSuccess<data = undefined> {
  count?: number;
  data?: data;
}

type dataProduct = {
  data: product;
};

const Lap1 = () => {
  const [data, setData] = useState<product[]>();
  const [count, setCount] = useState<number>(0);
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [page, setPage] = useState<object>({offset: 1, limit: 10});

  useEffect(() => {
    request
      .get('http://172.16.28.144:1234/product/all')
      .query({_page: page.offset, _perPage: 10}) // Thêm các tham số truy vấn nếu cần thiết
      .set('Authorization', 'Bearer your_token') // Thêm header nếu cần thiết
      .end((err, res) => {
        if (err) {
          setIsLoad(false);
          return;
        }
        setCount(res.body.count);
        setData(res.body.data);
        setIsLoad(true); // Xử lý phản hồi từ API
        return;
      });
  }, [page]);
  // useEffect(() => {
  //   console.log(page.offset);
  // }, [page]);

  return (
    <View style={{flex: 1}}>
      <View style={styles.header}>
        <Button
          title="<<-"
          onPress={() => {
            setPage(prevPage => {
              return {
                ...prevPage, // Giữ nguyên các thuộc tính cũ
                offset: 1, // Cập nhật giá trị mới cho thuộc tính offset
              };
            });
          }}
        />
        <Button
          title="<-"
          onPress={() => {
            setPage(prevPage => {
              return {
                ...prevPage, // Giữ nguyên các thuộc tính cũ
                offset: page.offset - 1, // Cập nhật giá trị mới cho thuộc tính offset
              };
            });
          }}
        />
        <View>
          <Text>tổng dòng dữ liệu {count}</Text>
          <Text>trang hiện tại {page.offset}</Text>
        </View>
        <Button
          title="->"
          onPress={() => {
            setPage(prevPage => {
              return {
                ...prevPage, // Giữ nguyên các thuộc tính cũ
                offset: page.offset + 1, // Cập nhật giá trị mới cho thuộc tính offset
              };
            });
          }}
        />
        <Button
          title="->>"
          onPress={() => {
            let a = Math.ceil(Number(count / 10));

            setPage(prevPage => {
              return {
                ...prevPage, // Giữ nguyên các thuộc tính cũ
                offset: a, // Cập nhật giá trị mới cho thuộc tính offset
              };
            });
          }}
        />
      </View>
      <View style={styles.styleList}>
        {!isLoad ? (
          <Text>Loading...</Text>
        ) : (
          <FlatList
            data={data}
            renderItem={({item}) => <ListItem data={item} />}
          />
        )}
      </View>
    </View>
  );
};

export default Lap1;

export const ListItem = (data: dataProduct) => {
  return (
    <View style={styles.containerItem}>
      <Text style={styles.text}>id : {data.data.id}</Text>
      <Text>Name : {data.data.nameProduct}</Text>
      <Text>discrible : {data.data.describe}</Text>
      <Text>price : {data.data.piceProduct}</Text>
      <Text>typer : {data.data.typeProduct}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  styleList: {
    height: 500,
    width: '100%',
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
  },
  containerItem: {
    marginBottom: 10,
    backgroundColor: 'green',
  },
});

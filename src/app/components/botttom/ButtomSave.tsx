import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {ColorLight} from '../../../../assets/colors/colorLight';
type types = {
  title: string;
  isLoading: boolean;
  handleClick: () => void;
};

export default function ButtomSave(p: types) {
  const handlClick = () => {
    p.handleClick();
  };
  return (
    <View style={{marginTop: 10}}>
      <TouchableOpacity disabled={p.isLoading} onPress={handlClick}>
        <View style={styles.item}>
          {p.isLoading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={styles.text}>{p.title}</Text>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'red',
    height: 50,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: ColorLight.textWhite,
  },
});

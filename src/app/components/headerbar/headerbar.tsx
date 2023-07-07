import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {ColorLight} from '../../../../assets/colors/colorLight';

const Headerbar = () => {
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.flexR,
          styles.justifySB,
          styles.alignCenter,
          styles.item,
        ]}>
        <Text style={styles.txtLogo}>ARi</Text>
        <View style={styles.flexR}>
          <TouchableOpacity style={[styles.mgR, styles.fillter]}>
            <Image
              style={styles.icon}
              source={require('../../../../assets/iconpng/filter.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.fillter}>
            <Image
              style={styles.icon}
              source={require('../../../../assets/iconpng/search.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Headerbar;

const styles = StyleSheet.create({
  container: {
    height: 60,
    position: 'absolute',
    zIndex: 1,
    width: '100%',
  },
  paddingall: {
    padding: 20,
  },
  flexR: {
    flexDirection: 'row',
  },
  alignCenter: {
    alignItems: 'center',
  },
  justifySB: {
    justifyContent: 'space-between',
  },
  item: {
    backgroundColor: '#ffffff',
    flex: 1,
    paddingHorizontal: 10,
  },
  txtLogo: {
    color: ColorLight.Pktxt,
    fontSize: 28,
    fontWeight: 'bold',
  },
  mgR: {
    marginRight: 10,
  },
  fillter: {
    width: 35,
    height: 35,
    padding: 7,
    backgroundColor: '#C2EF94',
    borderRadius: 40,
  },
  icon: {
    width: '100%',
    height: '100%',
    tintColor: 'green',
  },
});

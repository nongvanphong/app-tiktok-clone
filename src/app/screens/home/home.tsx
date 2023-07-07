import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Item from './listview/item';
import ListItem from './listview/listitem';
import Buttombar from '../../components/buttombar/buttombar';
import {NavigationContainer} from '@react-navigation/native';

import Headerbar from './../../components/headerbar/headerbar';

const Home = () => {
  return (
    <View style={{flex: 1}}>
      {/* <Headerbar /> */}

      <ListItem />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});

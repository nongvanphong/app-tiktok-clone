import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Item from './listview/item';
import ListItem from './listview/listitem';
import Buttombar from '../../components/buttombar/buttombar';
import {NavigationContainer} from '@react-navigation/native';

import Headerbar from './../../components/headerbar/headerbar';
import HomeContext from '../../../Context/HomeContext';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const Home = () => {
  const [isCmtShown, setIsCmtShown] = useState(false);
  const [VideoID, setVideoID] = useState(0);
  return (
    <HomeContext.Provider
      value={{
        ishowcmt: isCmtShown,
        setIsCmtShown,
        VideoID: VideoID,
        setVideoID,
      }}>
      <View style={{width: windowWidth, height: windowHeight}}>
        {/* <Headerbar /> */}

        <ListItem />
      </View>
    </HomeContext.Provider>
  );
};

export default Home;

const styles = StyleSheet.create({});

import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import HearderBarBack from '../../components/headerbar/hearderBarBack';
import Profilemain from './mainprofile/profilemain';
import Itemfeedback from './mainprofile/itemfeedback';
import Bottomprofile from './bottomprofile';
import CustomSwitch from '../../components/customSwitch/customSwitch';

const Profile = () => {
  return (
    <View>
      {/* <HearderBarBack /> */}
      <Profilemain />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});

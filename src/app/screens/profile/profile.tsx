import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import HearderBarBack from '../../components/headerbar/hearderBarBack';
import Profilemain from './profilemain';
import Itemfeedback from './itemfeedback';
import Bottomprofile from './bottomprofile';

const Profile = () => {
  return (
    <View>
      <HearderBarBack />

      <Profilemain />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});

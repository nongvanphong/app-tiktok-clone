import {Image, StyleSheet, Switch, Text, View} from 'react-native';
import React, {useState} from 'react';

const CustomSwitch = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  return (
    <View>
      <View style={{width: 50}}>
        <Switch
          trackColor={{false: 'gray', true: '#000'}}
          thumbColor={isEnabled ? '#CC33FF' : '#f5dd4b'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
          style={{transform: [{scaleX: 1.2}, {scaleY: 1.2}]}}
        />
      </View>
    </View>
  );
};

export default CustomSwitch;

const styles = StyleSheet.create({});

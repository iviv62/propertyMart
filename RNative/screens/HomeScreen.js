import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import HomeNavigation from '../navigation/HomeNavigation';

const HomeScreen = () => {
  return <HomeNavigation />;
};

const styles = StyleSheet.create({
  textContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;

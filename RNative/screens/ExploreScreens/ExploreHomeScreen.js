import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ExploreNavigation from '../../navigation/ExploreNavigation';

const ExploreHomeScreen = () => {
  return <ExploreNavigation />;
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ExploreHomeScreen;

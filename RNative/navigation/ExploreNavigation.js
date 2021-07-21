import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import ExploreHeader from '../components/ExploreScreen/ExploreHeader';
import Carousel from '../components/DetailsScreen/FullScreenCarousel';
import FilterScreen from '../screens/FilterScreen';
import Details from '../screens/ExploreScreens/Details';
import EditProfile from '../screens/ProfileScreens/EditProfile'
import  ListProperty  from '../screens/ProfileScreens/ListProperty';

const Stack = createStackNavigator();

const ExploreNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="ExploreHome" component={ExploreHeader} />
      <Stack.Screen name="Filter" component={FilterScreen} />
      <Stack.Screen name="Carousel" component={Carousel} />
      <Stack.Screen name="ExploreDetail" component={Details} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="ListProperty" component={ListProperty} />
    </Stack.Navigator>
  );
};



export default ExploreNavigation;

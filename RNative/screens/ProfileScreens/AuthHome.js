import React, {useEffect} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import LoginScreen from './AuthScreens/LoginScreen';
import RegistrationScreen from './AuthScreens/RegistrationScreen';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

const AuthHome = (props) => {
  useEffect(() => {
    const parent = props.navigation.dangerouslyGetParent();
    parent.setOptions({
      tabBarVisible: false,
    });
    return () =>
      parent.setOptions({
        tabBarVisible: true,
      });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.imageContainer}>
          <Image source={require('../../images/logo.png')} />
        </View>
        
      </View>
      <View style={styles.tabContainer}>
        <Tab.Navigator
          tabBarOptions={{
            indicatorStyle: {backgroundColor: '#ffa500',position:"relative"},
           
            labelStyle: { fontSize: 16, fontWeight:"bold"},
            
            style: {
              borderBottomLeftRadius: 30,
              borderBottomRightRadius: 30,
              
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 4,
              },
              shadowOpacity: 0.32,
              shadowRadius: 5.46,
              elevation: 9,
              
            },
          }}>
          <Tab.Screen name="Login" component={LoginScreen} />
          <Tab.Screen
            name="Registration"
            component={RegistrationScreen}
            options={{
              title: 'Sign-Up',
            }}
          />
        </Tab.Navigator>
        
      </View>
     
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f1f1f1',
    flex: 1,
  },

  header: {
    backgroundColor: 'white',
    height: '30%',

  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabContainer: {
    flex: 1,

  },
});

export default AuthHome;

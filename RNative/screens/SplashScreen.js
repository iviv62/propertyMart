import React  from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {user} from '../constants/storage';
import {useReactiveVar} from '@apollo/client';

const SplashScreen = (props) => {
  let userInfo = useReactiveVar(user)
  console.log(userInfo)
  return (
    <View style={styles.textContainer}>
    {
      userInfo.username ?<Text style={styles.greeting}>Hello, {userInfo.username}</Text>:<Text></Text>
    }
      {<Image style={styles.img} source={require('../images/logo2.png')} />}
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    flex: 1,
    backgroundColor:"white",
    alignItems: 'center',
    justifyContent: 'center',
  },
  img:{
    width:200,
    height:200
  },
  greeting:{
    fontSize:25,
    fontWeight:"bold"
  }
});

export default SplashScreen;

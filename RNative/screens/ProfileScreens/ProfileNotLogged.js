/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

const ProfileNotLogged = (props) => {
  const goToLogin = () => {
    props.navigation.navigate('AuthHome');
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
        <Text style={styles.text}>
          Login now and list your property for sale!
        </Text>

        <TouchableOpacity onPress={goToLogin} style={styles.button}>
          <Text style={styles.buttonText}>Login or register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileNotLogged;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f1f1f1',
    flex: 1,
  },

  header: {
    backgroundColor: 'white',
    height: '30%',
    borderBottomLeftRadius: 80,
    borderBottomRightRadius: 80,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
  },
  title: {
    color: 'orange',
    marginTop: 20,
    marginLeft: 20,
    fontWeight: 'bold',
    fontSize: 25,
  },
  text: {
    color: '#c4c4c4',
    fontWeight: 'bold',
    fontSize: 20,
    alignSelf: 'center',
    marginHorizontal: 50,
    marginTop: 20,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'orange',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const OwnerDetails = ({postedBy}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Owner Details</Text>

      <View style={styles.profileContainer}>
        <Icon name="person-circle-outline" color={'#ffa500'} size={60} />
        <Text style={styles.name}>{postedBy.firstName} {postedBy.lastName}</Text>
        <Text styles={styles.phone}>{postedBy.phone}</Text>
        <Text styles={styles.email}>{postedBy.email}</Text>
      </View>
    </View>
  );
};

export default OwnerDetails;

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  profileContainer: {
    alignItems: 'center',
  },
});

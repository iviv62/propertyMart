/* eslint-disable prettier/prettier */
import React,{useEffect} from 'react';
import {StyleSheet, Text, View, ScrollView,FlatList} from 'react-native';
import SavedCard from '../../components/SavedScreen/SavedCard';
import CardNotUsed from '../../components/SavedScreen/CardNotUsed'

import { useQuery, gql,NetworkStatus  } from '@apollo/client';
import {SAVED_HOUSES_OF_USER} from '../../constants/query'
import LoadingComponent from "../../components/LoadingComponent"

import {user,favouriteHouses,allHouses} from '../../constants/storage';
import {useReactiveVar} from '@apollo/client';

const Saved = (props) => {

  /*const { loading, error, data ,refetch,networkStatus} = useQuery(SAVED_HOUSES_OF_USER,
    {notifyOnNetworkStatusChange: true,});

   
  if (loading) return <LoadingComponent/>;
  if (error) return <Text>Error :(</Text>;*/
    //dont delete very importatnt
  let data = useReactiveVar(favouriteHouses)
  return (
    <View style={styles.container}>
    <Text style={styles.title}>Saved</Text>
  
    <FlatList
    keyExtractor={(item) => item.house.id.toString()}
    data={favouriteHouses().savedHousesOfUser}
    extraData={favouriteHouses()}
    renderItem={({item}) => (
      <SavedCard
        data={item}
        onPress={() => props.navigation.navigate('ExploreDetail',item)}
      />
      )}
      />
    
    </View>
  );
};

export default Saved;

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    color: 'orange',
    marginLeft: 20,
    marginTop: 20,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
  },
});

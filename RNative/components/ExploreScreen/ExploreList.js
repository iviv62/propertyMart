import React,{useState,useEffect} from 'react';
import {StyleSheet, Text, View, ScrollView, FlatList,Image} from 'react-native';
import ExploreCard from './ExploreCard';
import { useQuery, } from '@apollo/client';
import {ALL_HOUSES,SAVED_HOUSES_OF_USER} from '../../constants/query'
import LoadingComponent from "../../components/LoadingComponent"
import {user,favouriteHouses,allHouses,searchedData,filteredData} from '../../constants/storage';
import {useReactiveVar} from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import defaultIMG from '../../images/default.jpg'



const ExploreList = (props) => {
  const img = Image.resolveAssetSource(defaultIMG).uri


  const navigation = useNavigation();
  let userInfo =  useReactiveVar(user);
  let filterData = useReactiveVar(filteredData)
  let favs = useReactiveVar(favouriteHouses)
  let houses = useReactiveVar(allHouses)
  let search = useReactiveVar(searchedData)
  let mounted = true



  useEffect(() => {
    let mounted = false

    if(mounted){
      console.log("hi")
    }
    
    
  }, [search,favs]);
  
 const { loading, error, data ,refetch,networkStatus,client} = useQuery(ALL_HOUSES);
 
  if (loading) return <LoadingComponent/>;
  if (error) return <Text>Error :(</Text>;
  
  const getSavedStatus = (item) =>{
      //every house has an array with the users that saved it
      //check the array and see if the user id is present
      let output=item.savedhousesSet.some((item) =>{
        return item.user.id===userInfo.id          
      });
      item.savedStatus=output
      return item.savedStatus
    }
    
    
  return (
    <View style={{backgroundColor:"#f1f1f1",flex:1}}>
    {
      filteredData().length>0 && <Text style={styles.result}>result from filter {filteredData().length}</Text>
    }
    {mounted &&
    <FlatList
      keyExtractor={(item) => item.id.toString()}
      data={ search}
      extraData={favouriteHouses()}
      renderItem={({item}) => (
        <ExploreCard
          id = {item.id}
          title={item.title}
          price={item.price}
          address={item.address}
          bedrooms={item.bedrooms}
          bathrooms={item.bathrooms}
          savedStatus={getSavedStatus(item)}
          address={item.address}
          image={typeof item.otherImages[0] != "undefined"? item.otherImages[0].image:img}
          city={item.city}
          location={item.location}
          onPress={() => navigation.navigate('ExploreDetail',item)}
        />
      )}
    />
      }
   </View>
    
  );
  
};

export default ExploreList;

const styles = StyleSheet.create({

  result:{
    marginLeft:20,
    fontWeight:"bold",
    fontSize:16,
    marginTop:10,
  }

});

/* eslint-disable prettier/prettier */
import React,{useState,useEffect} from 'react';
import {StyleSheet, Text, View, Image, TouchableHighlight} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import AnimatedIconButton from "../AnimatedIconButton";
import {user,favouriteHouses,allHouses} from '../../constants/storage';
import {useReactiveVar} from '@apollo/client';
import {SAVE_HOUSE,SAVED_HOUSES_OF_USER,DELETE_SAVED_HOUSE,GET_HOUSE} from '../../constants/query';
import {useMutation,useQuery} from '@apollo/client';
import IconButton from '../IconButton'



export default function DetailsNav({title,item,id, images }) {
  const navigation = useNavigation();
  let userInfo =  useReactiveVar(user);
  const [savedState, setSavedState] = useState(false)
  const { loading, error, data,client} = useQuery(GET_HOUSE, 
    {variables:{id},
    onCompleted: data => {  
    
    setSavedState(getSavedStatus(data.house))
    
    },
  });
 
  useEffect(() => {
    console.log(savedState)
  }, [savedState])

  

  const getSavedStatus = (item) =>{
    //every house has an array with the users that saved it
    //check the array and see if the user id is present
    let output=item.savedhousesSet.some((item) =>{
      return item.user.id===userInfo.id          
    });
    //item.savedStatus=output
    return output
  }
  


 
  const [updateSavedHouse, ] = useMutation(SAVE_HOUSE);
  const [deleteSavedHouse, ] = useMutation(DELETE_SAVED_HOUSE);
  let savedHouses = useReactiveVar(favouriteHouses)
  

 
 
  const deleteFromCache = (item) =>{
    let newData =[...savedHouses.savedHousesOfUser]
    newData=newData.filter((i)=>{
       if(i.id!=item.data.deleteSavedHouse.savedId)return i
     })
    let obj = {
      savedHousesOfUser:newData
    }
    favouriteHouses(obj) 
  }
  
  const addToCache = (item) => {
    let newData = [...savedHouses.savedHousesOfUser, item.savedHouse]
    let obj = {
      savedHousesOfUser:newData
    }

    favouriteHouses(obj)
  
  }


  const updateSaved = async(id) =>{
    if(savedState===true){
      console.log("delete")
      setSavedState(!savedState)
      let response = await deleteSavedHouse({
        variables: {houseId: id},
      }) .then((data) => {
        
        deleteFromCache(data)
  
      }).catch((error)=>{
         console.log(error);
      });

    }else{
      
      setSavedState(!savedState)
      let response = await updateSavedHouse({
        variables: {houseId: id},
      }) .then((data) => {
        addToCache(data.data.saveHouse)
  
      }).catch((error)=>{
         console.log(error);
      });

    }
   

  }




  return (

    <View style={styles.nav} elevation={5}>
      <TouchableHighlight
        activeOpacity={0.5}
        underlayColor="#DDDDDD"
        onPress={() => {
          navigation.goBack();
        }}
        style={styles.arrowLeftContainer}>
        <Icon name="arrow-back" color={'#ffa500'} size={30} />
        
      </TouchableHighlight>
      <Text style={styles.title}>{title}</Text>
      
      <View style={styles.zoomIcon}>
        <IconButton
          name={"zoom-out-map"}
          size={25}
          color={"black"}
          onSelect={()=>{navigation.navigate("Carousel", images)}}/>
          </View>
    </View>
  );
}

const styles = StyleSheet.create({
  nav: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'white',
    borderBottomColor: 'black',
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 2,
    },
  },
  zoomIcon:{
    height: 40,
    width: 40,
    marginHorizontal: 20,
    marginVertical: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowLeftContainer: {
    height: 40,
    width: 40,
    borderRadius: 60,
    marginHorizontal: 20,
    marginVertical: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightIconsContainer: {
    height: 40,
    width: 40,
    borderRadius: 60,
    marginHorizontal: 5,
    alignSelf: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    flex: 2,
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: 'orange',
  },
});

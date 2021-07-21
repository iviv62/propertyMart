import React,{useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import IconMCS from 'react-native-vector-icons/MaterialCommunityIcons';
import AnimatedIconButton from "../AnimatedIconButton";
import {SAVE_HOUSE,SAVED_HOUSES_OF_USER,DELETE_SAVED_HOUSE} from '../../constants/query';
import {useMutation} from '@apollo/client';
import {user,favouriteHouses,allHouses} from '../../constants/storage';
import {useReactiveVar} from '@apollo/client';

const ExploreCard = ({
  id,
  title,
  price,
  address,
  image,
  bedrooms,
  city,
  bathrooms,
  onPress,
  savedStatus,
}) => {
  const [updateSavedHouse, {loading, error,client}] = useMutation(SAVE_HOUSE);
  const [deleteSavedHouse, ] = useMutation(DELETE_SAVED_HOUSE);
  let savedHouses = useReactiveVar(favouriteHouses)
  const [savedState, setSavedState] = useState(savedStatus)
  
 
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
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image
        source={{
          uri:image}}
        style={styles.image}
      />

      <View style={styles.top_heart}>
      <AnimatedIconButton 
      id={id}
      namePrimary={"heart-outline"} 
      nameSecondary={"heart"} 
      colorPrimary={"orange"} 
      Active={savedState}
      colorSecondary={"orange"}
      func={()=>updateSaved(id)}
      size={35}/>
      </View>
      <View style={styles.content}>
        <View>
          <Text style={styles.description}>{title}</Text>
          <Text style={styles.price}>{price}</Text>
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <View style={styles.icon_location}>
              <Icon name="location" color={'#ffa500'} size={20} />
            </View>

            <Text style={styles.street}>{city}, {address}</Text>
          </View>

          <View style={styles.line} />

          <View style={styles.roomContainer}>
            <View style={styles.roomInfo}>
              <View style={styles.roomIcon}>
                <Icon name="bed" color={'#ffa500'} size={20} />
              </View>

            
              <Text style={styles.num}>{bedrooms}</Text>
              <Text style={styles.room}>Bedrooms</Text>
            </View>

            <View style={styles.roomInfo}>
              <View style={styles.roomIcon}>
                <IconMCS name="shower" color={'#ffa500'} size={20} />
              </View>
              
              <Text style={styles.num}>{bathrooms}</Text>
              <Text style={styles.room}>Bathrooms</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ExploreCard;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    marginVertical: 15,
    flexDirection: 'column',
    backgroundColor: '#f1f1f1',
    borderRadius: 12,
  },

  content: {
    backgroundColor: 'white',
    paddingBottom: 10,
  },
  image: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    resizeMode: 'cover',
    height: 200,
  },
  description: {
    fontSize: 13,
    fontWeight: 'bold',
    color: 'orange',
    margin: 10,
  },
  roomContainer: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-evenly',
    marginVertical: 10,
  },
  roomInfo: {
    flexDirection: 'row',
    display: 'flex',
    
  },
  roomIcon: {
    justifyContent: 'center', //Centered vertically
    alignItems: 'center', // Centered horizontally
    display:"flex",
    marginRight:5
  },
  num: {
    fontWeight: 'bold',
    fontSize: 18,
    marginRight: 5,
  },
  room: {
    fontWeight: 'normal',
    fontSize: 18,
  },

  price: {
    fontSize: 19,
    fontWeight: 'bold',
    paddingLeft: 10,
  },
  street: {
    color: 'gray',
    paddingLeft: 10,
  },
  icon_heart: {
    width: 20,
    height: 20,
    marginLeft: 10,
    marginTop: 10,
  },
  icon_location: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
  top_heart: {
    position: 'absolute',

    top: 10,
    right: 10,
  },
  line: {
    borderBottomColor: '#c4c4c4',
    marginHorizontal: 10,
    padding: 2,
    borderBottomWidth: 1,
    marginTop: 5,
  },
});

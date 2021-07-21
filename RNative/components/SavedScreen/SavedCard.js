/* eslint-disable prettier/prettier */
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AnimatedIconButton from "../AnimatedIconButton"
import {SAVE_HOUSE,SAVED_HOUSES_OF_USER,DELETE_SAVED_HOUSE} from '../../constants/query';
import {user,favouriteHouses,allHouses,searchedData,filteredData} from '../../constants/storage';
import {useReactiveVar} from '@apollo/client';
import {useMutation} from '@apollo/client';
import * as utils from  '../../constants/utils';
import IconMCS from 'react-native-vector-icons/MaterialCommunityIcons';
import defaultIMG from '../../images/default.jpg'
let reloadData = utils.reloadExploreScreenData


const SavedCard = (data) => {
  const img = Image.resolveAssetSource(defaultIMG).uri
  let savedHouses = useReactiveVar(favouriteHouses)
  const [deleteSavedHouse, {loading, error,client}] = useMutation(DELETE_SAVED_HOUSE);

  if (loading) return<Text>loading</Text>
  const dateFormat = (date) =>{
    let d = new Date(date);
    let datestring = d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear();
    return datestring
  }
  

  const deleteFromCache = (item) =>{
    let newData =[...savedHouses.savedHousesOfUser]
    newData=newData.filter((i)=>{
       if(i.id!=item.data.deleteSavedHouse.savedId)return i
     
     })
   
   
    let obj = {
      savedHousesOfUser:newData
    }

    favouriteHouses(obj)
    console.log("sds")
    console.log(favouriteHouses())
    
  }

  const deleteFromDB=async(id)=>{
    let response = await deleteSavedHouse({
      variables: {houseId: id},
    }) .then((data) => {
      
      deleteFromCache(data)
      reloadData()  
    }).catch((error)=>{
       console.log(error);
    });
  }



  return (
    <TouchableOpacity style={styles.container}
    onPress={data.onPress}>
      <Image
        source={{
          uri:
          typeof data.data.house.otherImages[0] != "undefined" ?data.data.house.otherImages[0].image:img
        }}
        style={styles.image}
      />

      <View style={styles.top_heart}>
      <AnimatedIconButton 
      namePrimary={"trash"} 
      nameSecondary={"trash"} 
      colorPrimary={"black"}
      Active={true} 
      func={()=>deleteFromDB(data.data.house.id)}
      colorSecondary={"black"}
      size={25}/>
      </View>
      
      <View style={styles.content}>
        <View>
          <Text style={styles.description}>{data.data.house.title}</Text>
          <Text style={styles.price}>{data.data.house.price}</Text>
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <View style={styles.icon_location}>
              <Icon name="location" color={'#ffa500'} size={20} />
            </View>
            <Text style={styles.street}>{data.data.house.city} , {data.data.house.address}</Text>
          </View>
          <View style={styles.line} />

          <View style={styles.roomContainer}>
            <View style={styles.roomInfo}>
              <View style={styles.roomIcon}>
                <Icon name="bed" color={'#ffa500'} size={20} />
              </View>
              <Text style={styles.num}>{data.data.house.bedrooms}</Text>
              <Text style={styles.room}>Bedrooms</Text>
            </View>

            <View style={styles.roomInfo}>
              <View style={styles.roomIcon}>
              <IconMCS name="shower" color={'#ffa500'} size={20} />
              </View>

              <Text style={styles.num}>{data.data.house.bathrooms}</Text>
              <Text style={styles.room}>Bathrooms</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SavedCard;

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
    width: 30,
    height: 30,
    top: 15,
    right: 15,
  },
  line: {
    borderBottomColor: '#c4c4c4',
    marginHorizontal: 10,
    padding: 2,
    borderBottomWidth: 1,
    marginTop: 5,
  },
  savedText: {
    marginLeft: 10,
    color: 'gray',
    marginHorizontal: 10,
    marginTop: 10,
  },
  saved: {
    flexDirection: 'row',
  },
});

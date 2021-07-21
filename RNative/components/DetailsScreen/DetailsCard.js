/* eslint-disable prettier/prettier */
import React,{useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import DetailsAdditionalInfo from './DetailsAdditionalInfo';
import OwnerDetails from './OwnerDetails';
import Swiper from './Swiper';
import Icon from 'react-native-vector-icons/Ionicons';
import AboutDetails from '../../components/DetailsScreen/AboutDetails';
import Map from "./Map"
import defaultIMG from '../../images/default.jpg'
import IconMCS from 'react-native-vector-icons/MaterialCommunityIcons';

const DetailsCard = ({
  price,bedrooms,bathrooms,floors,title,builtOn,area,
  scrollRef,description,postedBy,images,city,address, location}) => {

  const url = Image.resolveAssetSource(defaultIMG).uri
  if(images.length===0){
      let obj={};
      obj.image=url
      images.push(obj);
      console.log(images)
    }


  return (
    <View>
      <Swiper images={images} />
      <View style={styles.card}>
        <Text style={styles.title}>
        {title}, {bedrooms} Bedrooms, {bathrooms} Bathrooms, {floors} floors
        </Text>
        <View style={styles.line} />
        <Text style={styles.price}>Price ${price}</Text>
        <View style={styles.line} />

        <View style={styles.roomContainer}>
          <View style={styles.roomInfo}>
            <View style={styles.roomIcon}>
              <Icon name="bed" color={'#ffa500'} size={25} />
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

        <View style={styles.line} />
        <DetailsAdditionalInfo
        builtOn={builtOn}
        area={area} 
        floors={floors}
        />
        <Map city={city} address={address} location={location}/>
        <OwnerDetails postedBy={postedBy} />
        <AboutDetails
        scrollRef={scrollRef}
        description={description}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  img: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: -15,
  },
  title: {
    fontSize: 18,
    marginHorizontal: 30,
    marginVertical: 10,
    color: 'black',
    fontWeight: 'bold',
  },
  price: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
    marginVertical: 20,
    alignSelf: 'center',
  },
  line: {
    borderBottomColor: '#c4c4c4',
    borderBottomWidth: 0.5,
    marginHorizontal: 10,
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
    width: 25,
    height: 25,

    marginRight: 15,
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
});
export default DetailsCard;

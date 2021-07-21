/* eslint-disable prettier/prettier */
import React,{useEffect,useRef} from 'react';
import {View, ScrollView} from 'react-native';
import DetailsCard from '../../components/DetailsScreen/DetailsCard';
import DetailsNav from '../../components/DetailsScreen/DetailsNav';
import {useReactiveVar} from '@apollo/client';
import {user} from '../../constants/storage';


const Details = ({navigation, route}) => {
  let item;
  if(route.params.house){
    item=route.params.house;
  }else{
    item=route.params;
  }

  let userInfo =  useReactiveVar(user);
  const getSavedStatus = (item) =>{
    //every house has an array with the users that saved it
    //check the array and see if the user id is present
    let output=item.savedhousesSet.some((item) =>{
      return item.user.id===userInfo.id          
    });
    //item.savedStatus=output
    return output
  }
  
  



const scrollRef=useRef()
  
  return (
    <View style={{flex: 1}}>
      <DetailsNav title={item.title} item={item} id={item.id}  images={item.otherImages} />
      <ScrollView
      ref={scrollRef}
      >
      
        <DetailsCard 
        price={item.price} 
        bathrooms={item.bathrooms}
        bedrooms={item.bedrooms}
        floors={item.floors}
        title={item.title}
        builtOn={item.builtOn}
        area={item.area}
        description={item.description}
        postedBy={item.postedBy}
        scrollRef={scrollRef}
        images={item.otherImages}
        city={item.city}
        location={item.location}
        address={item.address}
        
        />
      </ScrollView>
    </View>
  );
};

export default Details;

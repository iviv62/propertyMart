import React,{useState, useRef,useEffect} from 'react'
import { StyleSheet, Text, View,TouchableOpacity,ToastAndroid } from 'react-native'
import * as Animatable from 'react-native-animatable'
import Icon from 'react-native-vector-icons/Ionicons'
import {user,favouriteHouses,allHouses,searchedData,filteredData} from '../constants/storage';
import {useReactiveVar} from '@apollo/client';


const AnimatedIcon = Animatable.createAnimatableComponent(Icon)


const AnimatedIconButton = ({namePrimary,nameSecondary, colorPrimary,colorSecondary,size,id,Active,func}) => {

    const [active,setActive]= useState(Active);
    const iconRef = useRef(null);
    let userInfo = useReactiveVar(user);
    let search = useReactiveVar(searchedData)

    useEffect(() => {
      if(typeof userInfo.id==="undefined"){
        setActive(false)
      }else{
        setActive(Active)
      }
    }, [userInfo]);

    useEffect(() => {
      setActive(Active)
    }, [allHouses()]);
    

    const handleOnPress = () => {

      if(userInfo.id){
      iconRef.current.bounceIn()
      setActive(!active)
      func()
      }else{
        ToastAndroid.showWithGravityAndOffset(
          "Log in to be able to use this option",
          ToastAndroid.LONG,
          ToastAndroid.CENTER,
          25,
          50
        );
      }

    }

    return (
        <TouchableOpacity
            style = {styles.container}
            activeOpacity={1}
            onPress={()=>handleOnPress()}
          >
          <AnimatedIcon
              ref={iconRef}
              name={active ? nameSecondary : namePrimary}
              color={active ? colorSecondary : colorPrimary}
              size={size}
              style={styles.icon}
            />
          
          </TouchableOpacity>
    );


    
}

export default AnimatedIconButton

const styles = StyleSheet.create({
  container:{
    alignItems:"center",
    justifyContent:"center",
  },

})

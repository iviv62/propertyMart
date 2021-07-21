/* eslint-disable prettier/prettier */
import React, {useEffect} from 'react';
import {StyleSheet, Text, View, Image, TouchableHighlight} from 'react-native';
import { Button, Paragraph, Dialog, Portal,Badge } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import FA5Icon from 'react-native-vector-icons/FontAwesome5';
import * as myConstClass from '../../constants/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {user,favouriteHouses, allHouses,searchedData,filteredData} from '../../constants/storage';
import {useReactiveVar} from '@apollo/client';
import * as utils from  '../../constants/utils';
import * as clientClass from '../../constants/client-cache';
import {DELETE_USER} from '../../constants/query';
import {useMutation} from '@apollo/client';

let reloadData = utils.getDataOnLoadingScreen

let client=clientClass.client
const profile = myConstClass.profilePicture;

const Profile = ({ navigation }) => {
  
  let userInfo = useReactiveVar(user);
  
  const [visible, setVisible] = React.useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const clearAll = async () => {
    try {
      await AsyncStorage.clear();
      //clear cache
      user([])
      
      await client.clearStore();
      await client.cache.gc();
      //and reload data
      reloadData()

    } catch (e) {
      // clear error
    }
  };

  const [deleteProfile,{data,error} ] = useMutation(DELETE_USER);
  const deleteUser=()=>{
    console.log(userInfo);
    deleteProfile({ variables: {  userId: parseInt(userInfo.id) } });
    clearAll();
    hideDialog();
  }



 
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <View style={styles.profile_container}>
        <Image source={profile} style={styles.profile_pic} />
      </View>
      <View style={styles.options}>
        <TouchableHighlight
          activeOpacity={0.6}
          underlayColor="#DDDDDD"
          onPress={() => navigation.navigate("EditProfile")}>
          <View style={styles.option}>
            <Icon name="pencil-sharp" color={'#ffa500'} size={26} />
            <Text style={styles.optionText}>Edit profile</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          activeOpacity={0.6}
          underlayColor="#DDDDDD"
          onPress={() => navigation.navigate("ListProperty")}>
          <View style={styles.option}>
            <Icon name="add-circle-outline" color={'#ffa500'} size={26} />
            <Text style={styles.optionText}>List property</Text>
            <Badge style={styles.badge}>Beta</Badge>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          activeOpacity={0.6}
          underlayColor="#DDDDDD"
          onPress={() => alert("Under development")}>
          <View style={styles.option}>
            <FA5Icon name="house-user" color={'#ffa500'} size={26} />
            <Text style={styles.optionText}>My listed properties</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          activeOpacity={0.6}
          underlayColor="#DDDDDD"
          onPress={() => alert('Under development!')}>
          <View style={styles.option}>
            <Icon name="star-half-sharp" color={'#ffa500'} size={26} />
            <Text style={styles.optionText}>Rate the app</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          activeOpacity={0.6}
          underlayColor="#DDDDDD"
          onPress={showDialog}>
          <View style={styles.option}>
            <Icon name="trash-outline" color={'#ffa500'} size={26} />
            <Text style={styles.optionText}>Delete Profile</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          activeOpacity={0.6}
          underlayColor="#DDDDDD"
          onPress={() => clearAll()}>
          <View style={styles.option}>
            <Icon name="log-out-outline" color={'#ffa500'} size={26} />
            <Text style={styles.optionText}>Log out</Text>
          </View>
        </TouchableHighlight>
        
      </View>


      {/*modal*/}
      <View>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title></Dialog.Title>
          <Dialog.Content>
            <Paragraph>All of your account data will be deleted! Are you sure? </Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Cancel</Button>
            <Button onPress={deleteUser}>Delete</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>

    </View>
  );
};

export default Profile;

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
  profile_container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'center',

    padding: 5,
  },
  badge:{
    alignSelf: 'flex-start',
    marginLeft:5
  },
  profile_pic: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  options: {
    marginTop: 50,
    flex: 1,
  },
  optionText: {
    marginLeft: 15,
    fontSize: 20,
    fontWeight: 'bold',
  },
  option: {
    marginLeft: 25,
    marginTop: 20,
    flexDirection: 'row',
  },
});

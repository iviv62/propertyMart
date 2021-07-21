import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Sae} from 'react-native-textinput-effects';
import {CREATE_USER,TOKEN_AUTHENTICATION} from '../../../constants/query';
import {useMutation} from '@apollo/client';
import {user} from '../../../constants/storage';
import * as utils from  '../../../constants/utils';
import * as clientClass from '../../../constants/client-cache';

let reloadData = utils.getDataOnLoadingScreen
let client=clientClass.client
let authLink=clientClass.authLink
let httpLink = clientClass.httpLink


const RegistrationScreen = () => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userConfirmPassword, setUserConfirmPassword] = useState('');

  const usernameInput = useRef(null);
  const emailInput = useRef(null);
  const passwordInput = useRef(null);
  const confirmPasswordInput = useRef(null);

  const [Registration, {loading, error}] = useMutation(CREATE_USER);
  const [Login] = useMutation(TOKEN_AUTHENTICATION);

  const Submit = async () => {

    let response = await Registration({
      variables: {email: userEmail, password: userPassword, username: userName},
    }).then(async(data)=>{
      

      let userData = await Login({
        variables: {username: userName, password: userPassword},
      })

      userData.data.tokenAuth.user.token = userData.data.tokenAuth.token;

      await AsyncStorage.setItem(
        'user',
        JSON.stringify(userData.data.tokenAuth.user),
      );
  
      userData = userData.data.tokenAuth.user;
      await client.clearStore();
      await client.cache.gc();
      user(userData);


      client.setLink(
        authLink.concat(httpLink)
      )  
      reloadData()


    }).catch((error)=>{
      console.log(error)
    })

    
  };

  const handleRegistrationPress = () => {
    if (!userName) {
      alert('Please fill Username');
      return;
    } else if (!userEmail) {
      alert('Please fill Email');
      return;
    } else if (!userPassword) {
      alert('Please fill Pasword');
      return;
    } else if (!userConfirmPassword) {
      alert('Please fill Confirm Pasword');
      return;
    } else if (userPassword != userConfirmPassword) {
      alert('Password and confirm password is not same!');
      return;
    } else {
      Submit();
    }
  };

  return (
    <View style={styles.screen}>
     
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.textInputsContainer}>
          <Sae
            label={'User Name'}
            iconClass={MaterialIcons}
            iconName={'email'}
            iconColor={'orange'}
            inputPadding={16}
            labelHeight={24}
            labelStyle={{color: '#000000'}}
            borderHeight={2}
            autoCapitalize={'none'}
            autoCorrect={false}
            inputStyle={{color: '#A9A9A9'}}
            returnKeyType="next"
            blurOnSubmit={false}
            ref={usernameInput}
            onSubmitEditing={() => {
              emailInput.current.focus();
            }}
            onChangeText={(UserName) => setUserName(UserName)}
          />

          <Sae
            label={'Email Address'}
            iconClass={MaterialIcons}
            iconName={'email'}
            iconColor={'orange'}
            inputPadding={16}
            labelHeight={24}
            labelStyle={{color: '#000000'}}
            borderHeight={2}
            autoCapitalize={'none'}
            autoCorrect={false}
            keyboardType="email-address"
            inputStyle={{color: '#A9A9A9'}}
            returnKeyType="next"
            blurOnSubmit={false}
            ref={emailInput}
            onSubmitEditing={() => {
              passwordInput.current.focus();
            }}
            onChangeText={(UserEmail) => setUserEmail(UserEmail)}
          />
          <Sae
            label={'Password'}
            iconClass={MaterialIcons}
            iconName={'enhanced-encryption'}
            iconColor={'orange'}
            inputPadding={16}
            labelHeight={24}
            labelStyle={{color: '#000000'}}
            borderHeight={2}
            autoCapitalize={'none'}
            autoCorrect={false}
            keyboardType="default"
            secureTextEntry={true}
            inputStyle={{color: '#A9A9A9'}}
            returnKeyType="next"
            blurOnSubmit={false}
            ref={passwordInput}
            onSubmitEditing={() => {
              confirmPasswordInput.current.focus();
            }}
            onChangeText={(UserPassword) => setUserPassword(UserPassword)}
          />

          <Sae
            label={'Confirm Password'}
            iconClass={MaterialIcons}
            iconName={'enhanced-encryption'}
            iconColor={'orange'}
            inputPadding={16}
            labelHeight={24}
            labelStyle={{color: '#000000'}}
            borderHeight={2}
            autoCapitalize={'none'}
            autoCorrect={false}
            keyboardType="default"
            secureTextEntry={true}
            inputStyle={{color: '#A9A9A9'}}
            ref={confirmPasswordInput}
            onChangeText={(UserConfirmPassword) =>
              setUserConfirmPassword(UserConfirmPassword)
            }
          />
        </View>

        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={handleRegistrationPress}>
          {loading ? (
            <ActivityIndicator
              size="small"
              color="#ffffff"
              style={styles.loader}
            />
          ) : (
            <Text style={styles.buttonTextStyle}>Sign-Up</Text>
          )}
        </TouchableOpacity>
        {error && <Text>User with same email or username already exists</Text>}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  textInputsContainer: {
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: '#ffa500',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RegistrationScreen;

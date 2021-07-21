import React, {useState, useRef, useEffect} from 'react';
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
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Sae} from 'react-native-textinput-effects';
import {TOKEN_AUTHENTICATION, GET_LOGGED_USER} from '../../../constants/query';
import {useMutation} from '@apollo/client';
import LoadingComponent from '../../../components/LoadingComponent';
import * as utils from  '../../../constants/utils';
import * as clientClass from '../../../constants/client-cache';

let reloadData = utils.getDataOnLoadingScreen
let reloadExploreData = utils.reloadExploreScreenData
let client=clientClass.client
let authLink=clientClass.authLink
let httpLink = clientClass.httpLink

import {user} from '../../../constants/storage';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const passwordInput = useRef(null);
  const usernameInput = useRef(null);

  const [Login, {loading, error}] = useMutation(TOKEN_AUTHENTICATION);

  const Submit = async () => {
    let response = await Login({
      variables: {username: username, password: password},
    });

    response.data.tokenAuth.user.token = response.data.tokenAuth.token;

    

    await AsyncStorage.setItem(
      'user',
      JSON.stringify(response.data.tokenAuth.user),
    );

    let userDate = response.data.tokenAuth.user;
    await client.clearStore();
    await client.cache.gc();
    user(userDate);

    client.setLink(
      authLink.concat(httpLink)
    )  
    reloadData();
    reloadExploreData();

  };

  return (
    <View style={styles.screen}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.textInputsContainer}>
          <Sae
            label={'Username'}
            iconClass={FontAwesome5}
            iconName={'user'}
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
            ref={usernameInput}
            onChangeText={(username) => setUsername(username)}
            onSubmitEditing={() => passwordInput.current.focus()}
            blurOnSubmit={false}
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
            onChangeText={(password) => setPassword(password)}
            ref={passwordInput}
            inputStyle={{color: '#A9A9A9'}}
          />
          {error && <Text>Please enter valid credentials</Text>}
        </View>

        <TouchableOpacity
          onPress={() => Submit()}
          style={styles.buttonStyle}
          activeOpacity={0.5}>
          {loading ? (
            <ActivityIndicator
              size="small"
              color="#ffffff"
              style={styles.loader}
            />
          ) : (
            <Text style={styles.buttonTextStyle}>Login</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: 'row',
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

export default LoginScreen;

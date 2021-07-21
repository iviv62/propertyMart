import {ApolloClient, InMemoryCache, ApolloProvider,createHttpLink} from '@apollo/client';
import React from 'react';
import {user,favouriteHouses, allHouses,searchedData,filteredData,mapCoords} from './storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setContext } from '@apollo/client/link/context';

const cache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
  
          user: {
            read() {
              return user();
            },
          },

          mapCoords: {
            read() {
              return mapCoords();
            },
          },
  
          favouriteHouses:{
            read() {
              return favouriteHouses();
            }
            },
  
          allHouses:{
            read() {
              return allHouses();
            }
          },
  
          searchedData:{
            read() {
              return searchedData();
            }
            },
  
            filteredData:{
              read() {
                return filteredData();
              }
             },
  
          },
  
          },
        },
  });


export const httpLink = createHttpLink({
    uri: 'http://api.ivelin.info/graphql/',
    
  });
  
export const authLink =setContext(async(_, { headers }) =>{
    
    let userInfo =  await AsyncStorage.getItem('user');
    if(userInfo){
  
      userInfo = JSON.parse(userInfo);
      user(userInfo)
      const token = userInfo.token;
       // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        Authorization: token ? `JWT ${token}` : "",
      }
    }
    }
   
  });

export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: cache,
    onError: ({ networkError, graphQLErrors }) => {
      console.log('graphQLErrors', graphQLErrors)
      console.log('networkError', networkError)
    }
  });
  
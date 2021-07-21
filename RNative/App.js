import React from 'react';
import MainNavigation from './navigation/MainNavigation';
import {ApolloClient, InMemoryCache, ApolloProvider,createHttpLink} from '@apollo/client';
import {DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import * as clientClass from './constants/client-cache';
import * as utils from  './constants/utils';
import 'react-native-gesture-handler';

let client=clientClass.client
let loadData = utils.getDataOnLoadingScreen
loadData()

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: 'orange',
    accent: '#f1c40f',
  },
};

const App = (props) => {
  return (
    <ApolloProvider client={client}>
    <PaperProvider theme={theme}>
      <MainNavigation />
      </PaperProvider>
    </ApolloProvider>
  );
};

export default App;

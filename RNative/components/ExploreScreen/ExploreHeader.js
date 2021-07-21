import React from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';

import IconButton from '../IconButton';
import {Searchbar} from 'react-native-paper';
import ExploreList from './ExploreList';
import MapScreen from '../../screens/ExploreScreens/MapScreen';
import {user,favouriteHouses,allHouses,searchedData,filteredData} from '../../constants/storage';





const ExploreHeader = (props) => {


  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = (query) =>{ 
    setSearchQuery(query)

    if( filteredData().length>0 ){
      //with filter and search
      let data = filteredData()
      
      data=data.filter((item)=>{
        return item.address.toLowerCase().includes(query.toLowerCase())||
         item.city.toLowerCase().includes(query.toLowerCase())||
         item.title.toLowerCase().includes(query.toLowerCase())
       })
      
       searchedData(data)
      

    
    }else if(query!=="" && filteredData().length===0){
     //without filter
     console.log("without")
      let data = allHouses().allHouses

      data=data.filter((item)=>{
       return item.address.toLowerCase().includes(query.toLowerCase())||
        item.city.toLowerCase().includes(query.toLowerCase())||
        item.title.toLowerCase().includes(query.toLowerCase())
      })
      searchedData(data)
    }else{
      searchedData(allHouses().allHouses)
    }

  }




  return (
    <View style={styles.header}>
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Search"
          onChangeText={(value)=>onChangeSearch(value)}
          value={searchQuery}
          style={{fontSize: 12, elevation: 0, flex: 1}}
        />
        <IconButton
          name="filter-alt"
          size={25}
          color="#000000"
          onSelect={() => props.navigation.navigate('Filter')}
        />
      </View>
      <ExploreList  />

      {/* <Tab.Navigator
        tabBarOptions={{
          indicatorStyle: {backgroundColor: '#ffa500'},

          labelStyle: {fontSize: 16, fontWeight: 'bold'},
        }}>
        <Tab.Screen name="List" component={ExploreList} />
        <Tab.Screen name="Map" component={MapScreen} />
      </Tab.Navigator> */}
    </View>
  );
};

export default ExploreHeader;

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'white',
    flex: 1,
    color:"black"
  },
  searchContainer: {
    flexDirection: 'row',
  },
});

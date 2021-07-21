import * as clientClass from './client-cache';
import {ALL_HOUSES,SAVED_HOUSES_OF_USER} from './query';
import {user,favouriteHouses, allHouses,searchedData,filteredData} from './storage';

let client=clientClass.client

export const getDataOnLoadingScreen= async()=>{
    let responseSaved = await client.query({query:SAVED_HOUSES_OF_USER}) 
      .then((data) => {
      //save in reactive variable
      favouriteHouses(data.data)
   
    }).catch((error)=>{
       console.log(error);
    });
    
    let responseAll =await client.query({query:ALL_HOUSES,fetchPolicy: 'network-only'}).then((data) => {
      //save in reactive variable

      
     console.log(data.data)
      allHouses(data.data)
      searchedData(data.data.allHouses);
    
    }).catch((error)=>{
     console.log(error);
    });

    }

export const reloadExploreScreenData= async()=>{
  searchedData([])
  let responseAll =await client.query({query:ALL_HOUSES,fetchPolicy: 'network-only'}).then((data) => {
    
    //save in reactive variable

    allHouses(data.data)
    searchedData(data.data.allHouses);
  
  }).catch((error)=>{
   console.log(error);
  });

}
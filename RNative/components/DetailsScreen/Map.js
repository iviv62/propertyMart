import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MapboxGL from '@react-native-mapbox-gl/maps';

import Icon from 'react-native-vector-icons/Ionicons';



const Map = ({city,address,location}) => {
    const converLocation = (location) =>{
        let loc=location.replace("(","").replace(")","").split(",")
        let result= loc.map(cord=>parseFloat(cord))
        return result
    }

    return (
        <View>
        <View style={{flexDirection: 'row', marginTop:20}}>
            <View style={styles.icon_location}>
              <Icon name="location" color={'#ffa500'} size={20} />
              
            </View>
            <Text style={styles.street}>{city}, {address}</Text>
           
          </View>
        <View style={styles.containerMap}>
            <MapboxGL.MapView
                style={{ flex: 1 }}
                attributionEnabled={false}
                logoEnabled={false}
                showUserLocation={true}
            >
                <MapboxGL.Camera
                    zoomLevel={15}
                    centerCoordinate={converLocation(location)}
                />
                <MapboxGL.PointAnnotation
                selected={true}
                onSelected={() => console.log('selected')}
                key="key"
                id="id"
                title="End Location"
                coordinate={converLocation(location)}>
                <Icon name="location" color={'orange'} size={30} />
                
              </MapboxGL.PointAnnotation>
            </MapboxGL.MapView>
        </View>
        </View>
    )
}

export default Map

const styles = StyleSheet.create({
    containerMap: {
        width: "100%",
        height: 200,
        backgroundColor: "tomato"
    },
    map: {
        flex: 1
    },
    icon_location: {
        width: 20,
        height: 20,
      },
      street:{
          fontSize:18,
          color:"orange",
      }
})

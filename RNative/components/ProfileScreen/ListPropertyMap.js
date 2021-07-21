import React,{useRef,useState} from 'react'
import { StyleSheet, Text, View,Pressable } from 'react-native'
import MapboxGL from '@react-native-mapbox-gl/maps';
import { TouchableHighlight } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import {mapCoords} from '../../constants/storage';
import {useReactiveVar} from '@apollo/client';



const ListPropertyMap = () => {
    const map = useRef(null);
    const [markerCoords, setMarkerCoords] = useState([0,0]);
    mapCoords(markerCoords);

    const handleMapClick = async(event)=>{
        let x = event.nativeEvent.locationX;
        let y = event.nativeEvent.locationY;
        let geoCords = await map.current.getCoordinateFromView([x, y]);
        mapCoords(geoCords);
        setMarkerCoords(geoCords);
        console.log(geoCords, markerCoords);

    }

    return (
        <View>
        <Pressable style={styles.containerMap} onLongPress={(evt) => handleMapClick(evt)} >
            <MapboxGL.MapView
                ref={map}
                style={{ flex: 1 }}
                attributionEnabled={false}
                logoEnabled={false}
                showUserLocation={true}
            >{(
                <View>
                <MapboxGL.PointAnnotation
                key="key"
                id="id"
                title="End Location"
                coordinate={markerCoords}>

                    <Icon name="location" color={'orange'} size={30} />

                </MapboxGL.PointAnnotation>
                </View>)
            } 
            </MapboxGL.MapView>
            </Pressable>
        
        
        </View>
    )
}

const styles = StyleSheet.create({
    containerMap: {
        width: "100%",
        height: 200,
        backgroundColor: "tomato"
    },
})

export default ListPropertyMap

import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import AnimatedIconButton from "../AnimatedIconButton"

const MapCard = ({
    title,
    price,
    address,
    image,
    city,
    onSelect,

}) => {
;   
    return (
        <TouchableOpacity style={styles.container} onPress={onSelect}>
            <Image
                source={{
                    uri: image
                }}
                style={styles.image}
            />

            <View style={styles.content}>
                <View>
                    <Text style={styles.description}>{title}</Text>
                    <Text style={styles.price}>{price}</Text>
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <View style={styles.icon_location}>
                            <Icon name="location" color={'#ffa500'} size={20} />
                        </View>

                        <Text style={styles.street}>{city}, {address}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default MapCard

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 15,
        marginVertical: 15,
        flexDirection: 'column',
        backgroundColor: '#f1f1f1',
        borderRadius: 12,
    },

    content: {
        backgroundColor: 'white',
        paddingBottom: 10,
    },
    image: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        resizeMode: 'cover',
        height: 150,
    },
    description: {
        fontSize: 13,
        fontWeight: 'bold',
        color: 'orange',
        margin: 10,
    },
    roomContainer: {
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'space-evenly',
        marginVertical: 10,
    },
    roomInfo: {
        flexDirection: 'row',
        display: 'flex',
    },
    roomIcon: {
        width: 25,
        height: 25,

        marginRight: 15,
    },
    num: {
        fontWeight: 'bold',
        fontSize: 18,
        marginRight: 5,
    },
    room: {
        fontWeight: 'normal',
        fontSize: 18,
    },

    price: {
        fontSize: 19,
        fontWeight: 'bold',
        paddingLeft: 10,
    },
    street: {
        color: 'gray',
        paddingLeft: 10,
    },
    icon_heart: {
        width: 20,
        height: 20,
        marginLeft: 10,
        marginTop: 10,
    },
    icon_location: {
        width: 20,
        height: 20,
        marginLeft: 10,
    },
    top_heart: {
        position: 'absolute',

        top: 10,
        right: 10,
    },
    line: {
        borderBottomColor: '#c4c4c4',
        marginHorizontal: 10,
        padding: 2,
        borderBottomWidth: 1,
        marginTop: 5,
    },
})

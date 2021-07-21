/* eslint-disable prettier/prettier */
import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';

const CardNotUsed = () => {
    return (
        <View style={styles.container}>
            <TouchableOpacity>

                <View style={styles.innerContainer}>

                    <View style={styles.imageContainer}>
                        <Image source={{ uri: 'https://reactjs.org/logo-og.png' }}
                            style={styles.image} />
                    </View>

                    <View style={styles.info}>
                        <Text style={styles.name}>Д-р Стефчо Любомиров </Text>
                        <View>
                            <Text style={styles.specialty}>Поливалентна дентална медицина</Text>
                            <Text style={styles.specialty}>София</Text>
                        </View>
                        <View style={styles.badgeWrapper}>
                            <Text style={styles.badge}>Работи с НЗОК</Text>
                            <Text style={styles.badge}>Работа с микроскоп</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={{}}>
                        <View style={styles.heartIcon}>
                            <Icon name="heart-outline" color={'#ffa500'} size={25} />
                        </View>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>

        </View>


    )
}

export default CardNotUsed

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 15,
        marginVertical: 5,
        backgroundColor: 'white',
        borderRadius: 12,
    },
    innerContainer: {
        borderRadius: 12,
        flexDirection: 'row',
        flexWrap: 'wrap',

    },
    image: {
        borderTopLeftRadius:12,
        borderBottomLeftRadius:12,
        flex: 1,
    },
    badge: {
        marginHorizontal: 5,
        borderRadius: 10,
        backgroundColor: "cyan",
        marginTop: 10,
        marginBottom: 5,
        fontSize: 10,
        padding: 5,
    },
    imageContainer: {
        width: "30%"
    },
    heartIcon:{
        marginTop: 5,
        marginRight: 5
    },

    badgeWrapper: {
        flexDirection: "row",
        flexShrink: 1,
        flexWrap: 'wrap',
    },

    info: {
        flexDirection: "row",
        flex: 1,
        flexWrap: 'wrap',

    },
    specialty: {
        fontSize: 16,
        marginLeft: 10,
    },
    name: {
        flexDirection: "row",
        flexShrink: 1,
        flexWrap: 'wrap',
        marginLeft: 10,
        fontSize: 16,
        fontWeight: 'bold',

    },
})


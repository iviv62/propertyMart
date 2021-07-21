/* eslint-disable prettier/prettier */
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'


const DetailsAdditionalInfo = ({floors,builtOn,area}) => {
    return (
        <View>
            <Text style={styles.title}>Additional Details</Text>

            <View style={styles.infoRow}>
                <View style={styles.infoColumn} >
                    <Text style={styles.detailTitle}>Build on</Text>
                    <Text style={styles.detailText} >{builtOn}</Text>
                </View>
                <View style={styles.infoColumn} >
                    <Text style={styles.detailTitle}>Built up Area</Text>
                    <Text style={styles.detailText} >{area}</Text>
                </View>
            </View>

            <View style={styles.infoRow}>
                <View style={styles.infoColumn} >
                    <Text style={styles.detailTitle}>Floors</Text>
                    <Text style={styles.detailText} >{floors}</Text>
                </View>
                
            </View>
            <View style={styles.line} />
        </View>
        
    )
}

export default DetailsAdditionalInfo

const styles = StyleSheet.create({

    title:{
        fontSize:20,
        fontWeight:"bold",
        marginLeft:10,
    },
    line:{
        borderBottomColor: '#c4c4c4',
        borderBottomWidth: 0.5,
        marginHorizontal:10,  
    },
    infoRow:{
        marginLeft:10,
        marginVertical:15,
        flexDirection:"row",
    },
    infoColumn:{
        flex:1,
    },
    detailTitle:{
        color:"orange",
        fontSize:16,
        fontWeight:"bold",
    },
    detailText:{
        color:"black",
        fontSize:14,
    },

})

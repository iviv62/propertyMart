import React from 'react'
import { StyleSheet, Text, View,ActivityIndicator } from 'react-native'


const LoadingComponent = () => {
    return (
        <View style = {styles.container}>
        <ActivityIndicator size="large" color="orange" />
        </View>
    )
}

export default LoadingComponent

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center"
      },
})

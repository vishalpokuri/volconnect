// App.js
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { View, StyleSheet, FlatList, Image, Text } from 'react-native'
import Navigator from './src/navigation'
export default function App() {
    return (
        <View style={styles.container}>
            <Navigator />

            <StatusBar style="auto" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})

// notificationbubble.js
import React from 'react'
import { View, StyleSheet, FlatList, Image, Text } from 'react-native'

const Notificationbubble = ({ notif }) => {
    return (
        <View style={styles.finalwrapper}>
            <View style={styles.main}>
                <Image source={{ uri: notif.icon }} style={styles.icon} />
                <View style={styles.title}>
                    <Text style={styles.titleText}>{notif.topic}</Text>
                </View>
            </View>
            <Text style={styles.description}>{notif.message}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    titleText: {
        fontWeight: '500',
        color: 'white',
        marginLeft: 10,
        fontSize: 18,
    },
    finalwrapper: {
        backgroundColor: '#404040',
        borderRadius: 5,
        paddingVertical: 5,
        marginVertical: 10,
    },
    main: {
        width: '100%',
        padding: 10,
        flexDirection: 'row',
    },
    icon: {
        width: 24,
        height: 24,
    },
    description: {
        lineHeight: 20,
        letterSpacing: 0.3,
        marginHorizontal: 10,
        marginLeft: 12,
        color: 'white',
        marginBottom: 5,
    },
})

export default Notificationbubble

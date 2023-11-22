import React from 'react'
import { View, StyleSheet, FlatList, Image, Text } from 'react-native'
import notifications from '../../assets/data/notifications.json'
import Notificationbubble from '../../src/components/notificaitionbubble'
const Notificationscreen = () => {
    return (
        <FlatList
            data={notifications}
            renderItem={({ item }) => <Notificationbubble notif={item} />}
        />
    )
}
export default Notificationscreen

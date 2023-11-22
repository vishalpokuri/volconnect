import React, { useState } from 'react'
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    Alert,
    TouchableOpacity,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'

const RegistrationPage = () => {
    const navigation = useNavigation()

    const [businessDetails, setBusinessDetails] = useState({
        name: '',
        proprietor: '',
        address: '',
        phoneNumber: '',
        description: '',
        // Add more fields as needed
    })

    const handleChange = (name, value) => {
        setBusinessDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }))
    }

    const handleSubmit = () => {
        // Add logic to handle the form submission (e.g., send data to a server)
        console.log('Submitted Data:', businessDetails)
        // Show an alert on successful submission
        Alert.alert(
            'Success',
            'Business details submitted successfully, a volunteer will be assigned to your location for the further formalities.',
        )
        // Navigate back to the map view (you need to replace 'MapView' with your map component name)
        navigation.pop()
    }

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.heading}>Register Your Business</Text>
            </View>

            <TextInput
                style={styles.input}
                placeholder="Business Name"
                value={businessDetails.name}
                onChangeText={(text) => handleChange('name', text)}
                required
            />
            <TextInput
                style={styles.input}
                placeholder="Proprietor"
                value={businessDetails.proprietor}
                onChangeText={(text) => handleChange('proprietor', text)}
                required
            />
            <TextInput
                style={styles.input}
                placeholder="Address"
                value={businessDetails.address}
                onChangeText={(text) => handleChange('address', text)}
                required
            />
            <TextInput
                style={styles.input}
                placeholder="Phone Number"
                value={businessDetails.phoneNumber}
                onChangeText={(text) => handleChange('phoneNumber', text)}
                required
            />
            <TextInput
                style={styles.input}
                placeholder="Description"
                value={businessDetails.description}
                onChangeText={(text) => handleChange('description', text)}
                required
            />
            {/* Add more TextInput components for additional fields as needed */}
            <Button title="Submit" onPress={handleSubmit} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: 'white',
        justifyContent: 'center',
        width: '100%',
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        padding: 8,
    },
})

export default RegistrationPage

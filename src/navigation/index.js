import { Button } from 'react-native'
import MapviewScreen from '../screens/MapviewScreen'
import Notificationscreen from '../../src/screens/notificationScreen'
import RegistrationPage from '../screens/RegistrationScreen'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Ionicons } from '@expo/vector-icons'

const Stack = createNativeStackNavigator()

const Navigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Map"
                    component={MapviewScreen}
                    options={({ navigation }) => ({
                        title: 'Maps',
                        headerRight: () => (
                            <Ionicons
                                name="notifications"
                                size={24}
                                color="black"
                                style={{ marginRight: 5 }}
                                onPress={() =>
                                    navigation.navigate('Your Notifications')
                                }
                            />
                        ),
                    })}
                />
                <Stack.Screen
                    name="Your Notifications"
                    component={Notificationscreen}
                />
                <Stack.Screen
                    name="RegistrationPage"
                    component={RegistrationPage}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigator

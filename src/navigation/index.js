import { Button } from 'react-native'
import MapviewScreen from '../screens/MapviewScreen'
import Notificationscreen from '../screens/notificationScreen'
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
                        title: 'Maps', // Replace with your desired title
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
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigator

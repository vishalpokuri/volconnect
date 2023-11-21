import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Amplify } from "aws-amplify";
import awsconfig from "./src/aws-exports";
import { withAuthenticator } from "aws-amplify-react-native";
import { Amplify } from "aws-amplify";
import amplifyconfig from "./amplifyconfiguration.json";

Amplify.configure({
  ...awsconfig,
  amplifyconfig,
  Analytics: { disabled: true },
});
function App() {
  return (
    <View style={styles.container}>
      <View id="map" style={styles.map}></View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "gray",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: 50,
    height: 50,
  },
});
export default withAuthenticator(App);

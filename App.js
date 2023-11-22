import React, { useState, useEffect } from "react";

import { View, Dimensions, StyleSheet } from "react-native";

import MapviewScreen from "./src/screens/MapviewScreen";
export default function App() {
  return (
    <View style={styles.container}>
      <MapviewScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

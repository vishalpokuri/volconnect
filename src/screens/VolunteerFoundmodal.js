import React from "react";
import {
  Text,
  Image,
  View,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getNearbyVolunteers } from "../components/VolunteerLogic"; 
import { Entypo } from "@expo/vector-icons";
const VolunteerFoundModal = ({ userLocation, maxDistance, onClose }) => {
  // Call the function to get nearby volunteers
  const nearbyVolunteers = getNearbyVolunteers(userLocation, maxDistance);

  if (nearbyVolunteers.length === 0) {
    // If no nearby volunteers, render a message
    return (
      <View style={styles.modalofvolunteer}>
        <Text style={styles.volunteerFound}>No Volunteers Nearby</Text>
        <Button title="Close" onPress={onClose} />
      </View>
    );
  }

  // If there are nearby volunteers, display the first one
  const volunteer = nearbyVolunteers[0];

  return (
    <View style={styles.modalofvolunteer}>
      <View style={styles.crossheader}>
        <Text style={styles.volunteerFound}>Volunteer Found!</Text>
        <TouchableOpacity style={styles.cross} onPress={onClose}>
          <Entypo name="circle-with-cross" size={30} color="black" />
        </TouchableOpacity>
      </View>
      {/* Header */}
      <View style={styles.header}>
        <Image source={{ uri: volunteer.image }} style={styles.profileImage} />
        <View>
          <Text style={styles.name}>{volunteer.name}</Text>
        </View>
        {/* Star rating */}
        <View style={styles.rating}>
          <Ionicons name="md-star" size={20} color="#b7dd29" />
          <Text style={styles.ratingtext}>{volunteer.rating} </Text>
        </View>
      </View>
      <Text style={styles.descriptionVolunteer}>{volunteer.description}</Text>
      <View style={styles.connectButton}>
        <Button title="Connect" onPress={() => alert("Connecting...")} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  modalofvolunteer: {
    backgroundColor: "white",
    width: "60%",
    height: "40%",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 50,
  },
  cross: {
    color: "gray",
    paddingTop: 40,
  },
  volunteerFound: {
    borderRadius: 25,

    fontWeight: "500",
    padding: 20,
    fontSize: 18,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  crossheader: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  //header
  header: {
    backgroundColor: "white",
    marginVertical: 10,
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    paddingLeft: 10,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 10000,
    marginRight: 10,
  },
  name: {
    fontWeight: "500",
    fontSize: 25,
  },
  descriptionVolunteer: {
    padding: 10,
    lineHeight: 20,
    letterSpacing: 0.3,
  },
  //Star rating
  rating: {
    flexDirection: "row",
    alignItems: "center",
  },
  connectButton: {
    marginTop: "auto",
    marginBottom: 20,
  },
});

export default VolunteerFoundModal;

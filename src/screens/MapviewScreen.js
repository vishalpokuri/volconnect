import React, { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import { getNearbyVolunteers } from "../components/VolunteerLogic";
import VolunteerFoundModal from "../screens/VolunteerFoundmodal";
import {
  Dimensions,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import * as Location from "expo-location";
import { MaterialIcons } from "@expo/vector-icons";

const MapviewScreen = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [showOffices, setShowOffices] = useState(false);
  const [selectedOfficeType, setSelectedOfficeType] = useState(null);
  const [filteredOffices, setFilteredOffices] = useState([]);
  const [selectedOffice, setSelectedOffice] = useState(null);
  const [showVolunteerModal, setShowVolunteerModal] = useState(false);

  const [nearbyVolunteers, setNearbyVolunteers] = useState([]);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let userLocation = await Location.getCurrentPositionAsync({});
      setLocation(userLocation); // Correctly update the location state
      setShowOffices(true);
    })();
  }, []);
  const handleConnectWithVolunteer = async () => {
    if (!location) {
      alert("Location not available.");
      return;
    }
    const maxDistance = 10; // Example: 10 km
    // Check for nearby volunteers
    const volunteers = getNearbyVolunteers(location, maxDistance);
    // If a volunteer is found, show the modal
    if (volunteers.length > 0) {
      setShowVolunteerModal(true);
      setNearbyVolunteers(volunteers);
    } else {
      alert("No volunteers found nearby.");
    }
  };

  const handleCenterMap = async () => {
    if (location) {
      // Center the map on the user's location
      mapViewRef.current.animateToRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  };

  const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1);
    var dLon = deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var distance = R * c; // Distance in km
    return distance;
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  const handleOfficeType = (type) => {
    setSelectedOfficeType(type);
    setShowOffices(true);

    const maxDistance = 10; // Example: 10 km

    if (location) {
      const nearbyOffices = officeData.filter((office) => {
        const distance = getDistanceFromLatLonInKm(
          location.coords.latitude,
          location.coords.longitude,
          office.latitude,
          office.longitude
        );
        console.log(`Distance to ${office.name}: ${distance} km`);
        return office.type === type && distance <= maxDistance;
      });

      console.log(`Filtered Offices: ${JSON.stringify(nearbyOffices)}`);
      setFilteredOffices(nearbyOffices);
    }
  };

  const handleMarkerPress = (office) => {
    setSelectedOffice(office);
  };

  const handleOverlayClose = () => {
    setSelectedOffice(null);
  };

  let text = "Waiting...";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  const mapViewRef = React.createRef();

  // Dummy data for different types of offices
  const officeData = [
    {
      id: 1,
      type: "Meeseva",
      latitude: 12.975219,
      longitude: 79.163462,
      name: "Meeseva Office 1",
    },
    {
      id: 2,
      type: "Meeseva",
      latitude: 12.973319,
      longitude: 79.165462,
      name: "Meeseva Office 2",
    },
    {
      id: 3,
      type: "Municipality",
      latitude: 12.976019,
      longitude: 79.164362,
      name: "Municipality Office 1",
    },
    {
      id: 4,
      type: "Municipality",
      latitude: 12.974319,
      longitude: 79.166462,
      name: "Municipality Office 2",
    },
    {
      id: 5,
      type: "Sachivalay",
      latitude: 12.975319,
      longitude: 79.165462,
      name: "Sachivalay Office 1",
    },
    {
      id: 6,
      type: "Sachivalay",
      latitude: 12.973419,
      longitude: 79.163562,
      name: "Sachivalay Office 2",
    },
    {
      id: 7,
      type: "Meeseva",
      latitude: 12.974519,
      longitude: 79.163679,
      name: "Meeseva Office 3",
    },
    {
      id: 8,
      type: "Municipality",
      latitude: 12.974719,
      longitude: 79.164879,
      name: "Municipality Office 3",
    },
    {
      id: 9,
      type: "Sachivalay",
      latitude: 12.973619,
      longitude: 79.164662,
      name: "Sachivalay Office 3",
    },
    {
      id: 10,
      type: "Meeseva",
      latitude: 12.974919,
      longitude: 79.164279,
      name: "Meeseva Office 4",
    },
  ];

  return (
    <View style={styles.container}>
      <MapView ref={mapViewRef} showsUserLocation={true} style={styles.map}>
        {showOffices &&
          filteredOffices.map((office) => (
            <Marker
              key={office.id}
              coordinate={{
                latitude: office.latitude,
                longitude: office.longitude,
              }}
              title={office.name}
              description={office.type}
              pinColor={getPinColor(office.type)}
              onPress={() => handleMarkerPress(office)}
            />
          ))}
      </MapView>
      {showVolunteerModal && (
        <VolunteerFoundModal
          userLocation={location}
          volunteers={nearbyVolunteers}
          onClose={() => setShowVolunteerModal(false)}
          maxDistance={10}
        />
      )}
      <TouchableOpacity
        style={styles.myLocationButton}
        onPress={handleCenterMap}
      >
        <MaterialIcons name="my-location" size={48} color="black" />
      </TouchableOpacity>

      <View style={styles.buttonContainer}>
        {["Meeseva", "Municipality", "Sachivalay"].map((officeType) => (
          <TouchableOpacity
            key={officeType}
            style={[
              styles.officeTypeButton,
              selectedOfficeType === officeType && styles.selectedButton,
            ]}
            onPress={() => handleOfficeType(officeType)}
          >
            <Text>{officeType}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={styles.officeTypeButtonconnect}
          onPress={handleConnectWithVolunteer}
        >
          <Text style={styles.connectWithVolunteerText}>
            Connect with Volunteer
          </Text>
        </TouchableOpacity>
      </View>

      {selectedOffice && (
        <View style={styles.overlay}>
          <Text style={styles.overlayTextTitle}>{selectedOffice.name}</Text>
          <Text style={styles.overlayTextDescription}>
            {selectedOffice.type} at{" "}
            {getDistanceFromLatLonInKm(
              location.coords.latitude,
              location.coords.longitude,
              selectedOffice.latitude,
              selectedOffice.longitude
            ).toFixed(2)}{" "}
            km
          </Text>
          <View style={styles.overlayButtonBg}></View>
          <TouchableOpacity onPress={handleOverlayClose}>
            <Text style={styles.overlayCloseButton}> Close</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end", // Align map at the bottom of the container
    alignItems: "center", // Center map horizontally
  },
  map: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    ...StyleSheet.absoluteFillObject,
  },
  myLocationButton: {
    position: "absolute",
    bottom: 30,
    right: 16,
    backgroundColor: "white",
    borderRadius: 10000,
    padding: 10,
    elevation: 5,
  },
  buttonContainer: {
    position: "absolute",
    top: 30,
    left: 16,
    flexDirection: "row",
  },
  officeTypeButton: {
    marginTop: 20,
    marginRight: 10,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 8,
    elevation: 5,
  },
  officeTypeButtonconnect: {
    marginTop: 20,
    marginRight: 10,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 8,
    elevation: 5,
    backgroundColor: "lightgreen",
  },
  selectedButton: {
    backgroundColor: "lightblue",
  },
  overlay: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    elevation: 5,
  },
  overlayTextTitle: {
    fontSize: 24,
    marginBottom: 8,
  },
  overlayTextDescription: {
    fontSize: 16,
  },
  overlayCloseButton: {
    backgroundColor: "#24a0ed",
    height: 25,
    width: 50,
    fontSize: 16,
    justifyContent: "center",
    borderRadius: 5,
    color: "white",
    fontWeight: "bold",
    marginLeft: "auto",
  },
});

// Function to get pin color based on the type of office
const getPinColor = (type) => {
  switch (type) {
    case "Meeseva":
      return "red";
    case "Municipality":
      return "blue";
    case "Sachivalay":
      return "green";
    // Add more cases for other types of offices
    default:
      return "purple";
  }
};

export default MapviewScreen;
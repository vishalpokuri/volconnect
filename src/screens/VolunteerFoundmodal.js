import { Text, Image, View, StyleSheet, Button } from "react-native";
import { Ionicons } from "@expo/vector-icons";
const post = {
  id: "p1",
  createdAt: "4 m",
  User: {
    id: "u1",
    image:
      "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/vadim.jpg",
    name: "Vadim Savin",
    rating: 4.32,
  },
  description:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
  image: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/1.jpg",
  numberOfLikes: 11,
  numberOfShares: 2,
};
const VolunteerFoundModal = () => {
  return (
    <View style={styles.modalofvolunteer}>
      <Text style={styles.volunteerFound}>Volunteer Found!</Text>
      {/* Header */}
      <View style={styles.header}>
        <Image source={{ uri: post.User.image }} style={styles.profileImage} />
        <View>
          <Text style={styles.name}>{post.User.name}</Text>
        </View>
        {/* Star rating */}
        <View style={styles.rating}>
          <Ionicons name="md-star" size={20} color="#b7dd29" />
          <Text style={styles.ratingtext}>{post.User.rating} </Text>
        </View>
      </View>
      <Text style={styles.descriptionVolunteer}> description</Text>
      <View style={styles.connectButton}>
        <Button title="Connect" />
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
  },
  volunteerFound: {
    fontWeight: "500",
    padding: 20,
    fontSize: 18,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  //header
  header: {
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
  description: {
    padding: 10,
    lineHeight: 20,
    letterSpacing: 0.3,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
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
  descriptionVolunteer: {
    paddingLeft: 10,
  },
});
export default VolunteerFoundModal;

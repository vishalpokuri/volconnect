export const getNearbyVolunteers = (userLocation, maxDistance) => {
  if (!userLocation || !userLocation.coords) {
    console.error("Invalid userLocation:", userLocation);
    return [];
  }
  const volunteers = [
    {
      id: 2,
      name: "Jane",
      image:
        "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/elon.png",
      coords: {
        latitude: 12.968567,
        longitude: 79.155889,
      },
      rating: 3.8,
      description: "Always ready to assist!",
    },
    {
      id: 3,
      name: "Bob",
      image:
        "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/jeff.jpeg",
      coords: {
        latitude: 12.976,
        longitude: 79.164,
      },
      rating: 4.2,
      description: "Helping others is my passion.",
    },
    {
      id: 4,
      name: "Alice",
      image:
        "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/zuck.jpeg",
      coords: {
        latitude: 12.977,
        longitude: 79.166,
      },
      rating: 4.0,
      description: "Friendly and dependable!",
    },

    // Volunteers outside the 10km radius
    {
      id: 5,
      name: "Mike",
      image:
        "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/zuck.jpeg",
      coords: {
        latitude: 12.95,
        longitude: 79.14,
      },
      rating: 3.0,
      description: "I'm a volunteer from afar.",
    },
    {
      id: 6,
      name: "Sara",
      image:
        "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/vadim1.JPG",
      coords: {
        latitude: 12.93,
        longitude: 79.18,
      },
      rating: 4.7,
      description: "Committed to making a difference!",
    },
  ];

  const nearbyVolunteers = volunteers.filter((volunteer) => {
    // console.log(volunteer);
    if (!volunteer.coords) {
      console.error("Invalid volunteer:", volunteer);
      return false;
    }

    const distance = getDistanceFromLatLonInKm(
      userLocation.coords.latitude,
      userLocation.coords.longitude,
      volunteer.coords.latitude,
      volunteer.coords.longitude
    );

    return distance <= maxDistance;
  });

  return nearbyVolunteers;
};
const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
  var R = 6371; 
  var dLat = deg2rad(lat2 - lat1);
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var distance = R * c; 
  return distance;
};
const deg2rad = (deg) => {
  return deg * (Math.PI / 180);
};

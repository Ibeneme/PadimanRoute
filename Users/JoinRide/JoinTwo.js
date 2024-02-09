import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  StyleSheet,
  TextInput,
  View,
  Alert,
  Modal,
  ActivityIndicator,TouchableOpacity
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useNavigation, useRoute } from "@react-navigation/native";
// import Checkbox from "expo-checkbox";
import { passengersRequest } from "../../Redux/Ride/Ride";
import { useDispatch } from "react-redux";

const RideSummary = () => {
  const handleEllipsisPress = () => {
    setModalVisible(true);
  };
  const dispatch = useDispatch();
  const handleEllipsisPressClose = () => {
    setModalVisible(false);
  };
  const closeModal = () => {
    setModalVisible(false); // Close the modal
  };

  const navigation = useNavigation();
  const headerStyle = {
    backgroundColor: "white",
  };

  const headerTitleStyle = {
    color: "#000",
    borderBottomWidth: 0,
  };

  const headerTintColor = "#000";
  const route = useRoute();
  const [Err, setERR] = useState("");
  const { destination, travelling_date, current_city } = route.params;
  const [loading, setLoadin] = useState("");
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Ride Summary",
      headerStyle,
      headerTitleStyle: {
        ...headerTitleStyle,
        fontFamily: "Bold",
      },
      headerTintColor,
      headerBackTitleVisible: false,
    });
  }, [navigation]);

  const handleTravelToChange = (text) => {
    setTravelTo(text);
    if (text === "Overseas") {
      Alert.alert("Coming Soon");
    }
  };

  const handleDeliverParcel = () => {
    setLoadin(true);
    const formattedDate = new Date(travelling_date).toISOString().split("T")[0];
    console.log(formattedDate, "formattedDate");

    const payload = {
      destination: destination,
      travelling_date: formattedDate,
      current_city: current_city,
    };

    console.log(payload, "payload");
    dispatch(passengersRequest(payload))
      .then((result) => {
        setLoadin(false);
        console.log("Parcel delivered successfully:", result);
        if (result?.meta?.requestStatus === "fulfilled") {
          navigation.navigate("RideSuccess");
        } else {
          setERR("Please go back and fill your details correctly");
        }
      })
      .catch((error) => {
        setLoadin(false);
        console.error("Error delivering parcel:", error);
      });
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: "#f4f4f4",
        flex: 1,
        flexGrow: 1,
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 16,
        paddingBottom: 24,
        height: "100%",
        marginBottom: -96,
      }}
    >
      <ScrollView
        style={{
          backgroundColor: "white",
          flex: 1,
          flexGrow: 1,
          padding: 12,
          margin: 12,
        }}
      >
        <View>
          <View
            style={{
              backgroundColor: "#515FDF12",
              justifyContent: "center",
              alignItems: "center",
              width: 48,
              height: 48,
              borderRadius: 3333,
              marginTop: 24,
            }}
          >
            <FontAwesome5 name="truck" size={18} color="#515FDF" />
          </View>
          <Text
            style={{
              fontSize: 20,
              fontFamily: "SemiBold",
              marginTop: 12,
            }}
          >
            Ride Summary
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontFamily: "Regular",
              color: "gray",
              marginTop: 2,
              marginBottom: 24,
            }}
          >
            Read Carefully before making request
          </Text>
        </View>

        <View style={{ marginTop: 24 }}>
          <Text style={{ fontSize: 16, fontFamily: "SemiBold" }}>
            Where are you travelling from?
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: "gray",
              lineHeight: 21,
              marginBottom: 24,
            }}
          >
            {destination}
          </Text>
        </View>
        <View style={{ marginTop: 24 }}>
          <Text style={{ fontSize: 16, fontFamily: "SemiBold" }}>
            What date are you travelling?
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: "gray",
              lineHeight: 21,
              marginBottom: 24,
            }}
          >
            {travelling_date?.toLocaleDateString("en-GB")}
          </Text>
        </View>
        <View style={{ marginTop: 24 }}>
          <Text style={{ fontSize: 16, fontFamily: "SemiBold" }}>
            Which city are you traveling from?
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: "gray",
              lineHeight: 21,
              marginBottom: 24,
            }}
          >
            {current_city}
          </Text>
        </View>

        <View>
          <TouchableOpacity
            style={{
              color: "#515FDF",
              padding: 16,
              backgroundColor: "#515FDF",
              fontFamily: "Regular",
              borderRadius: 6,
              marginTop: 48,
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 200,
            }}
            onPress={handleDeliverParcel}
          >
            <Text
              style={{
                fontSize: 16,
                fontFamily: "SemiBold",
                color: "white",
              }}
            >
              Next
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RideSummary;
const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "#00000050",
    flex: 1,
    flexGrow: 1,
    bottom: 0,
    position: "relative",
  },
  modalContainerView: {
    paddingTop: 32,
    paddingBottom: 96,
    bottom: 0,
    position: "absolute",
    width: "100%",
    backgroundColor: "#ffff",
    borderRadius: 21,
    padding: 16,
    gap: 24,
    // alignItems: "center",
    //justifyContent: "center",
  },
  textInput: {
    height: 50,
    fontFamily: "Regular",
    fontSize: 16,
    borderColor: "#d9d9d9",
    borderWidth: 1,
    borderRadius: 4,
    padding: 12,
    marginTop: 6,
    marginBottom: 12,
  },
  checkbox: {},
});

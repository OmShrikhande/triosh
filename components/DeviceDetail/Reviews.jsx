import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Rating } from "react-native-ratings";
import { Colors } from "./../../constants/Colors";
import { db } from "../../configs/FirebaseConfigs";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore"; // Import arrayRemove for delete functionality
import { useUser } from "@clerk/clerk-expo";
import * as Haptics from "expo-haptics"; // For haptic feedback on interaction

export default function Reviews({ device }) {
  const [rating, setRating] = useState(4); // Store rating input
  const [userInput, setUserInput] = useState(""); // Store review comment input
  const { user } = useUser(); // Get user data from Clerk

  // Handle review submission
  const onSubmit = async () => {
    if (!device?.id) {
      ToastAndroid.show("Device not found", ToastAndroid.SHORT);
      return;
    }
    if (!user) {
      ToastAndroid.show("User not found", ToastAndroid.SHORT);
      return;
    }

    const docRef = doc(db, "Devices", device?.id);

    try {
      await updateDoc(docRef, {
        Reviews: arrayUnion({
          rating: rating,
          comment: userInput,
          userName: user?.fullName || "Anonymous",
          userImage: user?.imageUrl || "",
          userId: user?.id, // Store user ID for authentication
        }),
      });
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success); // Haptic feedback
      ToastAndroid.show("Comment Added Successfully!", ToastAndroid.SHORT);
      setUserInput(""); // Clear input after submission
    } catch (error) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error); // Haptic feedback
      console.error("Error adding comment: ", error);
      ToastAndroid.show("Failed to add comment", ToastAndroid.SHORT);
    }
  };

  // Handle review deletion
  const onDelete = async (review) => {
    const docRef = doc(db, "Devices", device?.id);

    Alert.alert("Delete Review", "Are you sure you want to delete this review?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        onPress: async () => {
          try {
            await updateDoc(docRef, {
              Reviews: arrayRemove(review), // Remove the selected review
            });
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning); // Haptic feedback
            ToastAndroid.show("Review deleted", ToastAndroid.SHORT);
          } catch (error) {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error); // Haptic feedback
            console.error("Error deleting review: ", error);
            ToastAndroid.show("Failed to delete review", ToastAndroid.SHORT);
          }
        },
      },
    ]);
  };

  // Separate positive and negative comments
  const positiveReviews = device?.Reviews?.filter((review) => review.rating >= 4) || [];
  const negativeReviews = device?.Reviews?.filter((review) => review.rating < 4) || [];

  // Determine which reviews to display
  const displayedReviews = [];
  if (positiveReviews.length > 0) {
    displayedReviews.push(positiveReviews[0]); // Add one positive review
  }
  if (negativeReviews.length > 0) {
    displayedReviews.push(negativeReviews[0]); // Add one negative review
  }

  // If there are less than 2 reviews, add another review of the same type if available
  while (displayedReviews.length < 2) {
    if (positiveReviews.length > displayedReviews.length) {
      displayedReviews.push(positiveReviews[displayedReviews.length]);
    } else if (negativeReviews.length > displayedReviews.length) {
      displayedReviews.push(negativeReviews[displayedReviews.length]);
    } else {
      break; // No more reviews to add
    }
  }

  return (
    <ScrollView
      style={{
        padding: 20,
        backgroundColor: "#f5f5f5", // Light background
        height: "100%",
      }}
    >
      <Text
        style={{
          fontFamily: "flux-bold",
          fontSize: 25,
        }}
      >
        Reviews
      </Text>

      <View>
        {/* Rating Input */}
        <Rating
          showRating={false}
          imageSize={25} // Increase image size for better visibility
          onFinishRating={(rating) => setRating(rating)}
          style={{ paddingVertical: 10 }}
        />
        {/* Comment Input */}
        <TextInput
          numberOfLines={3}
          value={userInput}
          onChangeText={(value) => setUserInput(value)}
          style={{
            fontFamily: "flux",
            fontSize: 16,
            borderWidth: 1,
            padding: 10,
            borderColor: "#ddd", // Softer border color
            borderRadius: 10, // Softer corners
            marginBottom: 10,
            backgroundColor: "#fff",
            width: "100%",
            textAlignVertical: "top",
            shadowColor: "#000", // Add shadow for better depth
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.2,
            shadowRadius: 2,
          }}
          placeholder="Write your review here..."
        />

        {/* Submit Button */}
        <TouchableOpacity
          onPress={onSubmit}
          disabled={!userInput} // Disable button if no input
          style={{
            padding: 12,
            backgroundColor: userInput ? Colors.PRIMARY : "#ccc",
            borderRadius: 5,
            marginTop: 10,
            shadowColor: "#000", // Add shadow for button
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
          }}
        >
          <Text
            style={{
              fontFamily: "flux-medium",
              fontSize: 16,
              textAlign: "center",
              color: userInput ? "#fff" : "#999",
            }}
          >
            Submit
          </Text>
        </TouchableOpacity>
      </View>

      {/* Display Reviews */}
      <View>
        {displayedReviews.length > 0 ? (
          displayedReviews.map((item, index) => (
            <View
              key={index} // Provide unique key
              style={{
                flexDirection: "row",
                gap: 10,
                alignItems: "center",
                padding: 15,
                borderWidth: 1,
                borderColor: "#ddd",
                borderRadius: 15,
                marginBottom: 10,
                backgroundColor: "#fff",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.2,
                shadowRadius: 3,
                marginTop: 20,
              }}
            >
              {/* User Image */}
              <Image
                source={{ uri: item.userImage }}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 99,
                  borderColor: Colors.PRIMARY,
                  borderWidth: 2,
                }}
              />

              <View style={{ flex: 1 }}>
                {/* User Name */}
                <Text style={{ fontFamily: "flux-bold", marginBottom: 4 }}>
                  {item.userName}
                </Text>

                {/* Rating Stars */}
                <Rating
                  imageSize={18}
                  readonly
                  startingValue={item.rating}
                  style={{ alignItems: "flex-start", marginBottom: 5 }}
                />

                {/* Review Comment */}
                <Text style={{ marginBottom: 5 }}>{item.comment}</Text>

                {/* Delete Button - Only visible if the review belongs to the current user */}
                {item.userId === user?.id && (
                  <TouchableOpacity
                    onPress={() => onDelete(item)}
                    style={{
                      alignSelf: "flex-start",
                      padding: 6,
                      backgroundColor: "red",
                      borderRadius: 5,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "flux-medium",
                        color: "#fff",
                        fontSize: 12,
                      }}
                    >
                      Delete
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))
        ) : (
          <Text
            style={{
              fontFamily: "flux-medium",
              fontSize: 18,
              color: "#888",
              textAlign: "center",
              marginVertical: 20,
            }}
          >
            Wow, still no comments? I guess this device is so good (or bad) that nobody knows what to say!
          </Text>
        )}
      </View>
    </ScrollView>
  );
}

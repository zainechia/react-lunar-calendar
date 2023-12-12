// firebase-messaging-sw.js

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { onBackgroundMessage } from "firebase/messaging/sw";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA6i1Kzm2ivDX1ssUgE0axmEENvJwT4nI4",
  authDomain: "react-lunar-calendar.firebaseapp.com",
  projectId: "react-lunar-calendar",
  storageBucket: "react-lunar-calendar.appspot.com",
  messagingSenderId: "980430086639",
  appId: "1:980430086639:web:aecc9a42d1bcf997f7161a",
  measurementId: "G-0CYPNVKE4B",
};

// Public VAPID Key
const PUBLIC_VAPID_KEY =
  "BLJXUiLcX4gTMu3PJ2cTy7gzGJaeKYkOYt-oStvaNGmBqV3ZKRv2InWzwddpMsKm8Zf2PGEaHTX7M9nyaoR6gHc";

// Get registration token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.
function getRegistrationToken(messaging) {
  getToken(messaging, { vapidKey: PUBLIC_VAPID_KEY })
    .then((currentToken) => {
      if (currentToken) {
        // Send the token to your server and update the UI if necessary
        // ...
        console.log("currentToken: ", currentToken);
      } else {
        // Show permission request UI
        console.log(
          "No registration token available. Request permission to generate one."
        );
        // ...
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
      // ...
    });
}

function requestPermission() {
  console.log("Requesting permission...");
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("Notification permission granted.");

      // Initialize Firebase
      const app = initializeApp(firebaseConfig);

      // Initialize Firebase Cloud Messaging and get a reference to the service
      const messaging = getMessaging(app);

      getRegistrationToken(messaging);

      onMessage(messaging, (payload) => {
        console.log("Message received. ", payload);
        // ...
      });
    } else {
      console.log("Do not have permission!");
    }
  });
}

requestPermission();

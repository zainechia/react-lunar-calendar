// Profile.js
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import EventCalendar from "./EventCalendar";
import { Stack } from "@mui/material";
import {
  databases,
  account,
  COLLECTION_ID,
  DATABASE_ID,
} from "../appwrite/appwriteConfig";
import { Query } from "appwrite";
import NavBar from "./NavBar";
import Login from "./Login";
import { Snackbar, Alert } from "@mui/material";
import OneSignal from "react-onesignal";

// Check for events happening within the next hour in Appwrite
const checkEventsWithinNextHour = async (
  databases,
  databaseId,
  collectionId
) => {
  try {
    // Get the current time
    const currentTime = new Date();

    // Calculate the time one hour from now
    const nextHour = new Date(currentTime.getTime() + 60 * 60 * 1000);

    // Query for events starting within the next hour
    const query = [
      Query.greaterThan("startTime", currentTime.toISOString()), // Events starting after the current time
      Query.lessThan("startTime", nextHour.toISOString()), // Events starting before the next hour
    ];
    console.log(OneSignal.Client);
    console.log("currentTime", currentTime.toISOString());
    console.log("nextHour", nextHour.toISOString());
    console.log("query", query);

    const documents = await databases.listDocuments(
      databaseId,
      collectionId,
      query
    );
    console.log("documents", documents);
    return documents;
  } catch (error) {
    throw error;
  }
};

function Profile() {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState();
  const [data, setData] = useState([]); // State to manage events data
  const [error, setError] = useState(null); // State to manage the error
  const effectRan = useRef(false); // useRef to ensure OneSignal.init only runs once

  // OneSignal.init and initProfile
  useEffect(() => {
    if (!effectRan.current) {
      // console.log(process.env.REACT_APP_ONE_SIGNAL_APP_ID);
      OneSignal.init({ appId: process.env.REACT_APP_ONE_SIGNAL_APP_ID }).then(
        async () => {
          await initProfile();
        }
      );
    }
    try {
      // Use the helper function to check events within the next hour
      const eventsWithinNextHour = checkEventsWithinNextHour(
        databases,
        DATABASE_ID,
        COLLECTION_ID
      );

      // Do something with eventsWithinNextHour
      // Iterate over eventsWithinNextHour
      // Find userID for that event
      // Use sendOneSignalNotification helper function to notify userID - create notification using filters for userID data tag
      // Keep count of number of times notification sent, make sure only send once
      // Cronjob Appwrite function will run every minute

      log("Events within the next hour:", eventsWithinNextHour);
    } catch (error) {
      error("Error checking events within the next hour:", error.message);
    }

    return () => (effectRan.current = true);
  }, []);

  const handleLogout = async () => {
    try {
      await account.deleteSession("current");
      navigate("/");
    } catch (error) {
      setError(error.message); // Failure: Set the error message in the state
    }
  };

  // Initialise profile by getting user details and events data from Appwrite,
  // setting OneSignal External User and sending tags to OneSignal
  const initProfile = async () => {
    try {
      // Appwrite
      const user = await account.get();
      setUserDetails(user);

      const data = await databases.listDocuments(COLLECTION_ID, [
        Query.equal("userId", user.$id),
      ]);
      setData(data.documents);

      // OneSignal
      setOneSignalExternalUserId(user);
      sendTags(user);

      console.log("user", user);
    } catch (error) {
      setError(error.message); // Failure: Set the error message in the state
    }
  };

  const handleCloseAlert = () => {
    setError(null); // Clear the error state when the alert is closed
  };

  const sendTags = (user) => {
    OneSignal.sendTag("name", user.name);
    OneSignal.sendTag("email", user.email);
    OneSignal.sendTag("user_id", user.$id);
  };

  // Set OneSignal external user ID upon successful OneSignal init
  const setOneSignalExternalUserId = (user) => {
    OneSignal.setExternalUserId(user.$id)
      .then(() => {
        console.log("Set external user_id: " + user.$id);
      })
      .catch((error) => {
        console.log("errror", error);
      });
  };

  return (
    <>
      {/* Snackbar for displaying error */}
      <Snackbar
        open={Boolean(error)} // Show Snackbar only when there's an error
        autoHideDuration={6000}
        onClose={handleCloseAlert}
      >
        <Alert severity="error" onClose={handleCloseAlert}>
          {error}
        </Alert>
      </Snackbar>

      {userDetails && (
        <>
          <NavBar userDetails={userDetails} onLogout={handleLogout} />
          <Stack minWidth="100%" minHeight="100vh" justifyContent="center">
            <EventCalendar
              userId={userDetails.$id}
              data={data}
              onDataChange={(events) => setData(events)}
            />
          </Stack>
        </>
      )}
    </>
  );
}

export default Profile;

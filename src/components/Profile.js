// Profile.js
import React, { useState, useEffect, useRef } from "react";
import { account } from "../appwrite/appwriteConfig";
import { useNavigate, Link } from "react-router-dom";
import EventCalendar from "./EventCalendar";
import { Stack } from "@mui/material";
import { databases, COLLECTION_ID } from "../appwrite/appwriteConfig";
import { Query } from "appwrite";
import NavBar from "./NavBar";
import Login from "./Login";
import { Snackbar, Alert } from "@mui/material";
import OneSignal from "react-onesignal";

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
    return () => (effectRan.current = true);
  }, []);

  console.log("userDetails", userDetails);

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
    } catch (error) {
      setError(error.message); // Failure: Set the error message in the state
    }
  };

  const handleCloseAlert = () => {
    setError(null); // Clear the error state when the alert is closed
  };

  const sendTags = () => {
    OneSignal.sendTag("user_id", userDetails.$id)
      .then(() => {
        console.log("Sent user_id: " + userDetails.$id);
      })
      .catch((error) => {
        console.log("errror", error);
      });
  };

  // Set OneSignal external user ID upon successful OneSignal init
  const setOneSignalExternalUserId = (user) => {
    OneSignal.setExternalUserId(user.$id)
      .then(() => {
        console.log("Sent external user_id: " + user.$id);
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

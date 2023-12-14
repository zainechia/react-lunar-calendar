import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Profile from "./components/Profile";
import PrivateRoute from "./components/PrivateRoute";
// import "./firebase-messaging-sw";
import { useState, useEffect } from "react";
import OneSignal from "react-onesignal";

function App() {
  useEffect(() => {
    // Call this from each page of your site to initialize OneSignal. This call is required before any other functions can be used.
    OneSignal.init({
      appId: process.env.REACT_APP_ONE_SIGNAL_APP_ID,
    });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Profile from "./components/Profile";
import PrivateRoute from "./components/PrivateRoute";
// import "./firebase-messaging-sw";
// import runOneSignal from "./onesignal";
import { useState, useEffect } from "react";

function App() {
  // useEffect(() => {
  //   runOneSignal();
  // }, []);

  const ONE_SIGNAL_APP_ID = "c357b411-637d-4fad-a823-aaec67af5bff";

  useEffect(() => {
    OneSignal.init({
      appId: ONE_SIGNAL_APP_ID,
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

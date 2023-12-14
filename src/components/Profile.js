// Profile.js
import React, { useState, useEffect } from "react";
import { account } from "../appwrite/appwriteConfig";
import { useNavigate, Link } from "react-router-dom";
import EventCalendar from "./EventCalendar";
import { Stack } from "@mui/material";
import { databases, COLLECTION_ID } from "../appwrite/appwriteConfig";
import { Query } from "appwrite";
import NavBar from "./NavBar";
import Login from "./Login";
import { Snackbar, Alert } from "@mui/material";

function Profile() {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState();
  const [data, setData] = useState([]);
  const [error, setError] = useState(null); // State to manage the error

  useEffect(() => {
    getUserAndData();
  }, []);

  const handleLogout = async () => {
    try {
      await account.deleteSession("current");
      navigate("/");
    } catch (error) {
      setError(error.message); // Failure: Set the error message in the state
    }
  };

  const getUserAndData = async () => {
    try {
      const user = await account.get();
      setUserDetails(user);
      // localStorage.setItem("userId", user.$id);

      const data = await databases.listDocuments(COLLECTION_ID, [
        Query.equal("userId", user.$id),
      ]);
      setData(data.documents);
    } catch (error) {
      setError(error.message); // Failure: Set the error message in the state
    }
  };

  const handleCloseAlert = () => {
    setError(null); // Clear the error state when the alert is closed
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

// const Profile = ({ userDetails, onLogout }) => {
//   const [data, setData] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     getUserData();
//   }, []);

//   const getUserData = async () => {
//     try {
//       const userData = await databases.listDocuments("COLLECTION_ID", [
//         Query.equal("userId", userDetails.$id),
//       ]);
//       setData(userData.documents);
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   const handleCloseAlert = () => {
//     setError(null);
//   };

//   return (
//     <>
//       {/* Snackbar for displaying error */}
//       <Snackbar
//         open={Boolean(error)}
//         autoHideDuration={6000}
//         onClose={handleCloseAlert}
//       >
//         <Alert severity="error" onClose={handleCloseAlert}>
//           {error}
//         </Alert>
//       </Snackbar>

//       <NavBar userDetails={userDetails} onLogout={onLogout} />

//       <Stack minWidth="100%" minHeight="100vh" justifyContent="center">
//         <EventCalendar
//           userId={userDetails.$id}
//           data={data}
//           onDataChange={(events) => setData(events)}
//         />
//       </Stack>
//     </>
//   );
// };

export default Profile;

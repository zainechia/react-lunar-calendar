import React, { useState } from "react";
import { account } from "../appwrite/appwriteConfig";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Snackbar, Alert } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function Signup() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null); // State to manage the error
  const defaultTheme = createTheme();
  const ONE_SIGNAL_APP_ID = process.env.REACT_APP_ONE_SIGNAL_APP_ID;

  //Signup
  const signupUser = async (e) => {
    e.preventDefault();

    try {
      const response = await account.create(
        uuidv4(),
        user.email,
        user.password,
        user.name
      );
      const createdOneSignalUser = await fetch(
        `https://onesignal.com/api/v1/apps/${ONE_SIGNAL_APP_ID}/users`,
        { method: "POST" }
      );
      console.log("response ");
      console.log(createdOneSignalUser.json());
      // console.log(response);
      navigate("/"); // Success
    } catch (error) {
      // console.log(error.message);
      setError(error.message); // Failure: Set the error message in the state
    }
  };

  const handleCloseAlert = () => {
    setError(null); // Clear the error state when the alert is closed
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Simple Lunar Calendar
          </Typography>
          <Typography component="h1" variant="subtitle1">
            Sign up
          </Typography>
          <Box component="form" onSubmit={signupUser} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
              onChange={(e) => {
                setUser({ ...user, name: e.target.value });
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              onChange={(e) => {
                setUser({ ...user, email: e.target.value });
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={(e) => {
                setUser({ ...user, password: e.target.value });
              }}
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign up
            </Button>

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

            <Grid container>
              {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
              <Grid item>
                <Link href="/" variant="body2">
                  {"Already have an account? Login"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );

  // return (
  //   <>
  //     <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
  //       <div className="text-center text-2xl font-bold">Sign up</div>
  //       <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
  //         <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
  //           <form className="space-y-6" action="#" method="POST">
  //             <div>
  //               <label
  //                 htmlFor="name"
  //                 className="block text-sm font-medium text-gray-700"
  //               >
  //                 Name
  //               </label>
  //               <div className="mt-1">
  //                 <input
  //                   id="name"
  //                   name="name"
  //                   type="text"
  //                   autoComplete="name"
  //                   required
  //                   className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
  //                   onChange={(e) => {
  //                     setUser({
  //                       ...user,
  //                       name: e.target.value,
  //                     });
  //                   }}
  //                 />
  //               </div>
  //             </div>
  //             <div>
  //               <label
  //                 htmlFor="email"
  //                 className="block text-sm font-medium text-gray-700"
  //               >
  //                 Email address
  //               </label>
  //               <div className="mt-1">
  //                 <input
  //                   id="email"
  //                   name="email"
  //                   type="email"
  //                   className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
  //                   onChange={(e) => {
  //                     setUser({
  //                       ...user,
  //                       email: e.target.value,
  //                     });
  //                   }}
  //                 />
  //               </div>
  //             </div>

  //             <div>
  //               <label
  //                 htmlFor="password"
  //                 className="block text-sm font-medium text-gray-700"
  //               >
  //                 Password
  //               </label>
  //               <div className="mt-1">
  //                 <input
  //                   id="password"
  //                   name="password"
  //                   type="password"
  //                   autoComplete="current-password"
  //                   required
  //                   className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
  //                   onChange={(e) => {
  //                     setUser({
  //                       ...user,
  //                       password: e.target.value,
  //                     });
  //                   }}
  //                 />
  //               </div>
  //             </div>

  //             <div>
  //               <button
  //                 type="submit"
  //                 className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
  //                 onClick={signupUser}
  //               >
  //                 Sign up
  //               </button>
  //             </div>
  //           </form>
  //         </div>
  //       </div>
  //     </div>
  //   </>
  // );
}

export default Signup;

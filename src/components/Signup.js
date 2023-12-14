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
import axios from "axios";

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
  const ONE_SIGNAL_REST_API_KEY = process.env.REACT_APP_ONE_SIGNAL_REST_API_KEY;

  //Signup
  const signupUser = async (e) => {
    e.preventDefault();

    try {
      // Create account in Appwrite
      const response = await account.create(
        uuidv4(),
        user.email,
        user.password,
        user.name
      );

      // Create account in OneSignal
      const createdOneSignalUser = await axios.post(
        "https://onesignal.com/api/v1/players",
        {
          app_id: ONE_SIGNAL_APP_ID,
          device_type: 5, // 1 for iOS, 2 for Android, 3 for Amazon, 4 for Windows Phone, 5 for Chrome, 6 for Chrome Web Push, 7 for Firefox, etc.
          identifier: response.$id, // Unique identifier for the user, such as device token
          external_user_id: response.$id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${ONE_SIGNAL_REST_API_KEY}`,
          },
        }
      );

      console.log("response ");
      console.log(createdOneSignalUser);

      navigate("/"); // Success
    } catch (error) {
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
}

export default Signup;

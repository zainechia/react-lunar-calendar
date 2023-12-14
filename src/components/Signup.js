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

      // Create account in OneSignal, implemented following documentations https://documentation.onesignal.com/reference/create-user
      const options = {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          properties: {
            tags: { name: response.name, email: response.email },
            language: "en",
            // timezone_id: 'America\/Los_Angeles',
            // lat: 90,
            // long: 135,
            // country: 'US',
            // first_active: 1678215680,
            // last_active: 1678215682
          },
          identity: { external_id: response.$id },
        }),
      };

      fetch(
        `https://onesignal.com/api/v1/apps/${process.env.REACT_APP_ONE_SIGNAL_APP_ID}/users`,
        options
      )
        .then((response) => response.json())
        .then((response) => console.log(response))
        .catch((err) => console.error(err));

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

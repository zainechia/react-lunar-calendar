// NavBar.js
import React from "react";
import { AppBar, Toolbar, Typography, Button, Stack } from "@mui/material";

function NavBar({ userDetails, onLogout }) {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
        >
          <Typography variant="h6" component="div">
            Hello {userDetails ? userDetails.name : ""}, Welcome to Simple
            Chinese Calendar
          </Typography>
          <Button color="inherit" onClick={onLogout}>
            Logout
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;

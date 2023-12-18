import {
  Grid,
  Typography,
  useTheme,
  Paper,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";
import React from "react";
import moment from "moment";

function Event({ event, index, onDelete }) {
  const theme = useTheme();

  function handleDeleteClick() {
    onDelete && onDelete(event.id);
  }
  // console.log("event : ", event);
  return (
    <Grid>
      <Paper
        sx={{
          padding: "1rem",
          overflowY: "auto", // Enable vertical scrolling if needed
        }}
      >
        <Typography variant="h6">
          {index + 1}. {event.title}
        </Typography>
        <List>
          <ListItem>
            <ListItemText
              primary={`Date: ${moment(event.date).format("LL")}`}
            />
          </ListItem>

          <ListItem>
            <ListItemText
              primary={`Start Time: ${moment(event.startTime).format("LT")}`}
            />
          </ListItem>

          <ListItem>
            <ListItemText
              primary={`End Time: ${moment(event.endTime).format("LT")}`}
            />
          </ListItem>

          <ListItem>
            <ListItemText primary={`Event Details: ${event.details}`} />
          </ListItem>

          <Button variant="contained" onClick={handleDeleteClick}>
            Delete
          </Button>
        </List>
      </Paper>
    </Grid>
  );
}

export default Event;

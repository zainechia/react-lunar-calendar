import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Divider,
  Button,
  Box,
  Typography,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers";
import { Padding } from "@mui/icons-material";

function NewEventDialog({ addNewEvent, dayInfo, onClose, ...rest }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [error, setError] = useState("");

  function handleSelectStartTime(newStartTime) {
    setStartTime(newStartTime.$d);
  }

  function handleSelectEndTime(newEndTime) {
    // console.log("newEndTime : ", newEndTime.$d);
    setEndTime(newEndTime.$d);
  }

  function resetForm() {
    setTitle("");
    setContent("");
    setStartTime(null);
    setEndTime(null);
    setError("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!startTime || !endTime) {
      setError("Please select a Start Time and End Time.");
      return;
    }

    addNewEvent(title, content, dayInfo.date, startTime, endTime, hasNotified);

    onClose({}, "Some Reason");

    // Reset the form states
    resetForm();
  }

  return (
    <Dialog {...rest}>
      <DialogTitle>Add a new event on {dayInfo.date.format("LL")}</DialogTitle>
      <Divider light />
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            variant="outlined"
            label="Event Title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            fullWidth
            sx={{
              paddingBottom: "1rem",
            }}
          />
          <TextField
            variant="outlined"
            label="Event Details"
            type="text"
            multiline
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            fullWidth
            sx={{
              paddingBottom: "1rem",
            }}
          />
          <Box
            sx={{
              width: "100%",
              paddingBottom: "1rem",
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                label="Start Time"
                value={startTime}
                onChange={handleSelectStartTime}
              />
              <TimePicker
                label="End Time"
                value={endTime}
                onChange={handleSelectEndTime}
              />
            </LocalizationProvider>
          </Box>
          {error && (
            <Typography color="error" variant="caption" gutterBottom>
              {error}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onClose?.({}, "Some Reason")}>Cancel</Button>
          <Button type="submit">Add</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default NewEventDialog;

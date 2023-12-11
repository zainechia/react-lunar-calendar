import { Box, Grid, Typography, Dialog, DialogTitle } from "@mui/material";
import React, { useState } from "react";
import moment from "moment";
import Event from "./Event";
import NewEventDialog from "./NewEventDialog";

function Day({
  deleteEventHandler,
  addNewEventHandler,
  dayInfo,
  index,
  events,
}) {
  function getWeekDays() {
    return ["MON", "TUE", "WED", "THUR", "FRI", "SAT", "SUN"];
  }

  const weekDays = getWeekDays();
  // console.log("events:", events);

  // Use isSameDate to check if cell is same date as today
  const isSameDate = moment().isSame(dayInfo.date, "day");
  const chineseDateInfo = dayInfo.chineseDate;
  const activeEventsCount = events?.length || 0;

  const [showEvents, setShowEvents] = useState(false);

  function handleEventsClick() {
    setShowEvents(!showEvents);
  }

  // The state variable 'showNewEventDialog' is initially set to false
  const [showNewEventDialog, setShowNewEventDialog] = useState(false);

  function handleNewEventDialog() {
    setShowNewEventDialog(!showNewEventDialog);
  }

  return (
    <Grid
      item
      textAlign="center"
      height="8rem"
      overflow="auto"
      width={`${100 / 7}%`}
      sx={{
        border: "0.5px solid rgba(0,0,0,0.12)",
      }}
    >
      {index < 7 && (
        <>
          <Typography
            variant="caption"
            color="rgb(0,0,0,0,0.8)"
            sx={{ fontWeight: "bold" }}
          >
            {weekDays[index]}
          </Typography>{" "}
          <br />
        </>
      )}

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          padding: "0.5rem",
        }}
      >
        <Typography
          variant="caption"
          color={isSameDate ? "white" : undefined}
          sx={{
            backgroundColor: isSameDate ? "red" : "transparent",
            borderRadius: "50%",
            paddingInline: "0.4rem",
            cursor: "pointer",
          }}
          // When the day number is clicked, it sets 'showNewEventDialog' to true
          onClick={handleNewEventDialog}
        >
          {dayInfo.number}
        </Typography>

        <Typography variant="caption" color="primary">
          {`${chineseDateInfo.day}/${chineseDateInfo.month}`}
        </Typography>
      </Box>

      {/* Display number of events for each day */}
      {activeEventsCount > 0 && (
        <Grid container justifyContent="center">
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{
              // marginY: "0.2rem",
              cursor: "pointer",
            }}
            onClick={handleEventsClick}
          >
            {activeEventsCount} Event(s)
          </Typography>

          {/* Display list of events when clicked */}
          <Dialog open={showEvents} onClose={handleEventsClick}>
            <DialogTitle>
              {`Events On ${dayInfo.date.format("LL")}`}
            </DialogTitle>
            <Box>
              {events?.map((event, index) => (
                <Event
                  event={event}
                  index={index}
                  onDelete={deleteEventHandler}
                  key={event.id}
                />
              ))}
            </Box>
          </Dialog>
        </Grid>
      )}

      {/* Add new event modal */}
      <NewEventDialog
        open={showNewEventDialog} // Open dialog when 'showNewEventDialog' is true
        onClose={handleNewEventDialog}
        dayInfo={dayInfo}
        addNewEvent={addNewEventHandler}
      />
    </Grid>
  );
}

export default Day;

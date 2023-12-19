import { Typography, Paper, Grid } from "@mui/material";
import React from "react";
import useEventCalendar from "../hooks/useEventCalendar";
import Controls from "./Controls";
import Day from "./Day";
import { databases, COLLECTION_ID } from "../appwrite/appwriteConfig";
import { v4 as uuidv4 } from "uuid";

function EventCalendar({ userId, data, onDataChange }) {
  const { date, changeMonth, daysGrid } = useEventCalendar();
  // const userId = localStorage.getItem("userId");

  function addNewEventHandler(title, content, date, startTime, endTime) {
    if (title != "" && content != "") {
      const newDataArray = [...data]; // Create shallow copy of data

      const newEvent = {
        id: uuidv4(),
        title,
        details: content,
        date,
        startTime,
        endTime,
        userId,
      };

      // Create a new document/promise for the new event
      const promise = databases.createDocument(
        COLLECTION_ID,
        newEvent.id,
        newEvent
      );

      promise.then(
        // If successful promise, then push new event to new data array
        function (response) {
          newDataArray.push(newEvent);

          // When a new event is added, 'onDataChange' is called with the
          // updated array of events. This callback will notify the parent 'App'
          // component that the data has changed, and set data accordingly.
          onDataChange?.(newDataArray);
          console.log(response);
        },
        function (error) {
          console.log(error);
        }
      );
    }
  }

  function deleteEventHandler(id) {
    // Delete the event from the database
    databases.deleteDocument(COLLECTION_ID, id).then(
      function (response) {
        const updatedData = data.filter((event) => event.id != id);
        onDataChange?.(updatedData);
        // console.log(response);
      },
      function (error) {
        console.log(error);
      }
    );
  }
  // console.log("data :", data);

  return (
    <Paper
      sx={{
        width: "100%",
        border: "1px solid rgba(0,0,0,0.12)",
      }}
    >
      <Controls changeMonth={changeMonth} date={date} />
      <Grid container>
        {daysGrid.map((dayInfo, index) => {
          return (
            <Day
              dayInfo={dayInfo}
              index={index}
              events={data.filter((d) => dayInfo.date.isSame(d.date, "day"))}
              addNewEventHandler={addNewEventHandler}
              deleteEventHandler={deleteEventHandler}
              key={index}
            />
          );
        })}
      </Grid>
    </Paper>
  );
}

export default EventCalendar;

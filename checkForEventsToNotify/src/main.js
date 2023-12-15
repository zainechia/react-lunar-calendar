import {
    databases,
    DATABASE_ID,
    COLLECTION_ID,
  } from "../../src/appwrite/appwriteConfig";
import { Query } from "appwrite";

  // Check for events happening within the next hour in Appwrite
  const checkEventsWithinNextHour = async (databases, databaseId, collectionId) => {
    try {
      // Get the current time
      const currentTime = new Date();
  
      // Calculate the time one hour from now
      const nextHour = new Date(currentTime.getTime() + 60 * 60 * 1000);
  
      // Query for events starting within the next hour
      const query = [
        Query.greaterThan("startTime", currentTime.toISOString()), // Events starting after the current time
        Query.lessThan("startTime", nextHour.toISOString()), // Events starting before the next hour
      ];
  
      const { documents } = await databases.listDocuments(databaseId, collectionId, query);
      return documents;
    } catch (error) {
      throw error;
    }
  };
  
// This is your main Appwrite function
export default async ({ req, res, log, error }) => {
  // Log test messages to the console
  log('Hello, this message is to test log!');
  error('Hello, this message is to test error!');

  // The `req` object is the request sent by the client to trigger an action on the server

  // If request is GET, send this response just for testing purposes
  if (req.method === 'GET') {
      return res.send('This was a GET request');
  }

  try {
    // Use the helper function to check events within the next hour
    const eventsWithinNextHour = await checkEventsWithinNextHour(databases, DATABASE_ID, COLLECTION_ID);

    // Do something with eventsWithinNextHour
    log('Events within the next hour:', eventsWithinNextHour);
  } catch (error) {
    error('Error checking events within the next hour:', error.message);
  }

  // Check if the event type is a user-related event
//   if (req.body.event && req.body.event === 'users.create') {
//       log('User created:', req.body.payload.$id);
//   } else if (req.body.event && req.body.event === 'users.delete') {
//       log('User deleted:', req.body.payload.$id);
//   }

  // `res.json()` is a handy helper for sending JSON
  // return res.json({
  //     motto: 'Build like a team of hundreds_',
  //     learn: 'https://appwrite.io/docs',
  //     connect: 'https://appwrite.io/discord',
  //     getInspired: 'https://builtwith.appwrite.io',
  // });
};

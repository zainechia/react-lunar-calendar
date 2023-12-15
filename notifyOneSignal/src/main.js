import { Query, Client, Databases } from 'node-appwrite';
import * as OneSignal from 'onesignal-node';

// import { checkEventsWithinNextHour } from './helperFunctions';

// Helper function: Check for events happening within the next hour in Appwrite
const checkEventsWithinNextHour = async (log, databases, databaseId, collectionId) => {
  try {
    // Get the current time
    const currentTime = new Date();

    // Calculate the time one hour from now
    const nextHour = new Date(currentTime.getTime() + 60 * 60 * 1000);

    // Query for events starting within the next hour
    const query = [
      Query.greaterThanEqual("startTime", currentTime.toISOString()), // Events starting after the current time
      Query.lessThanEqual("startTime", nextHour.toISOString()), // Events starting before the next hour
    ];
    // log(OneSignal.Client)
    log("currentTime", currentTime.toISOString());
    log("nextHour", nextHour.toISOString());
    log("query", query);

    const documents = await databases.listDocuments(databaseId, collectionId, query);
    log("documents", documents)
    return documents;
  } catch (error) {
    throw error;
  }
};

// This is your Appwrite function
// It's executed each time we get a request
export default async ({ req, res, log, error }) => {
  // Why not try the Appwrite SDK?
  
  const client = new Client()
     .setEndpoint('https://cloud.appwrite.io/v1')
     .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
     .setKey(process.env.APPWRITE_API_KEY);
  const DATABASE_ID = "656fd0d5e096d5c69451";
  const COLLECTION_ID = "656fd11d07243c7e0ea1";
  const databases = new Databases(client, DATABASE_ID);

  // You can log messages to the console
  log('Hello, Logs!');

  // If something goes wrong, log an error
  error('Hello, Errors!');

  try {
    // Use the helper function to check events within the next hour
    const eventsWithinNextHour = await checkEventsWithinNextHour(
      log,
      databases,
      DATABASE_ID,
      COLLECTION_ID
    );

    // Do something with eventsWithinNextHour
    // Iterate over eventsWithinNextHour
    // Find userID for that event
    // Use sendOneSignalNotification helper function to notify userID - create notification using filters for userID data tag
    // Keep count of number of times notification sent, make sure only send once
    // Cronjob Appwrite function will run every minute

    log("Events within the next hour:", eventsWithinNextHour);
  } catch (error) {
    error("Error checking events within the next hour:", error.message);
  }

  // The `req` object contains the request data
  // if (req.method === 'GET') {
  //   // Send a response with the res object helpers
  //   // `res.send()` dispatches a string back to the client
  //   return res.send('Hello, World!');
  // }

  // `res.json()` is a handy helper for sending JSON
  return res.json({
    motto: 'Build like a team of hundreds_',
    learn: 'https://appwrite.io/docs',
    connect: 'https://appwrite.io/discord',
    getInspired: 'https://builtwith.appwrite.io',
  });
};

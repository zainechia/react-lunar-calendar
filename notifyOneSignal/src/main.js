import { Query, Client, Databases } from 'node-appwrite';
import * as OneSignal from 'node-onesignal';

// Helper function: Check for events happening within the next hour in Appwrite
const checkEventsWithinNextHour = async (log, database, databaseId, collectionId) => {
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

    const documents = await database.listDocuments(databaseId, collectionId, query);

    return documents;
  } catch (error) {
    throw error;
  }
};

// Send One Signal notification
const sendOneSignalNotification = async (oneSignalClient, oneSignalAppId, notificationContent) => {
  try {
    const notification = new OneSignal.Notification();
    notification.app_id = oneSignalAppId;

    notification.contents = {
      en: notificationContent
    }

    notification.included_segments = ["All"];

    log('Sending OneSignal notification...');
    const result = await oneSignalClient.createNotification(notification);
    log('OneSignal notification sent successfully:', result);
    return result;
  } catch (error) {
    error('Error sending OneSignal notification:', error.message);
    throw(error);
  }
};

// This is your Appwrite function
// It's executed each time we get a request
export default async ({ req, res, log, error }) => {
  // Appwrite constants
  const DATABASE_ID = "656fd0d5e096d5c69451";
  const COLLECTION_ID = "656fd11d07243c7e0ea1";
  
  // OneSignal constants
  const ONE_SIGNAL_APP_ID = "8c92528a-fc7e-4083-b4c9-2b5c21c1b2d8";
  const ONE_SIGNAL_USER_KEY = "YzNhYTIzMjgtMTE3Yy00ZGU3LWJlOWEtZjEwNzEyNjVjNThi";

  // Initialize Appwrite client and database
  const appwriteClient = new Client()
     .setEndpoint('https://cloud.appwrite.io/v1')
     .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
     .setKey(process.env.APPWRITE_API_KEY);
  const database = new Databases(appwriteClient);

  // Initialize OneSignal client
  const configuration = OneSignal.createConfiguration({
    userKey: ONE_SIGNAL_USER_KEY,
    appKey: ONE_SIGNAL_APP_ID,
  });
  const oneSignalClient = new OneSignal.DefaultApi(configuration);

  // Create notification content
  let notificationContent = "Hello World!";

  // Send notification to all users
  sendOneSignalNotification(oneSignalClient, ONE_SIGNAL_APP_ID, notificationContent);

  // You can log messages to the console
  log('Hello, Logs!');

  // If something goes wrong, log an error
  error('Hello, Errors!');

  try {
    // Use the helper function to check events within the next hour
    const eventsWithinNextHour = await checkEventsWithinNextHour(
      log,
      database,
      DATABASE_ID,
      COLLECTION_ID
    );

    log("Events within the next hour:");
    log(eventsWithinNextHour);
    
    // Do something with eventsWithinNextHour
    // Iterate over eventsWithinNextHour
    // Find userID for that event
    // Use sendOneSignalNotification helper function to notify userID - create notification using filters for userID data tag
    // Keep count of number of times notification sent, make sure only send once
    // Cronjob Appwrite function will run every minute

  } catch (error) {
    error("Error checking events within the next hour:", error.message);
    throw(error);
  }

  // `res.json()` is a handy helper for sending JSON
  return res.json({
    motto: 'Build like a team of hundreds_',
    learn: 'https://appwrite.io/docs',
    connect: 'https://appwrite.io/discord',
    getInspired: 'https://builtwith.appwrite.io',
  });
};

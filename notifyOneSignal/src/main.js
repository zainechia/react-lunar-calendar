import { Query, Client, Databases } from "node-appwrite";
import * as OneSignal from "@onesignal/node-onesignal";

// Appwrite constants
const DATABASE_ID = "656fd0d5e096d5c69451";
const COLLECTION_ID = "656fd11d07243c7e0ea1";

// OneSignal constants
const ONE_SIGNAL_APP_ID = "8c92528a-fc7e-4083-b4c9-2b5c21c1b2d8";
const ONE_SIGNAL_REST_API_KEY =
  "ZjJhOWIxNzQtMjE1Zi00ZTYxLTkyZDgtMTZlZDk4MDgxZGRl";
const ONE_SIGNAL_USER_KEY = "YzNhYTIzMjgtMTE3Yy00ZGU3LWJlOWEtZjEwNzEyNjVjNThi";

// Helper function: Check for events happening within the next hour in Appwrite
const getEventsWithinNextHour = async (
  log,
  database,
  databaseId,
  collectionId
) => {
  try {
    // Get the current time
    const currentTime = new Date();

    // Calculate the time one hour from now
    const nextHour = new Date(currentTime.getTime() + 60 * 60 * 1000);

    // Query for events starting within the next hour and has not been notified yet
    const query = [
      Query.greaterThanEqual("startTime", currentTime.toISOString()), // Events starting after the current time
      Query.lessThanEqual("startTime", nextHour.toISOString()), // Events starting before the next hour
      Query.equal("hasNotified", false), // Check for events that haven't been notified
    ];

    const documents = await database.listDocuments(
      databaseId,
      collectionId,
      query
    );

    log("Events within the next hour:");
    log(documents);

    return documents;
  } catch (err) {
    throw err;
  }
};

// Helper function: Send One Signal notification
const sendOneSignalNotification = async (
  log,
  oneSignalClient,
  oneSignalAppId,
  notificationContent,
  database,
  databaseId,
  collectionId,
  eventId,
  userId
) => {
  try {
    const notification = new OneSignal.Notification();
    notification.app_id = oneSignalAppId;
    notification.contents = {
      en: notificationContent,
    };

    notification.filters = [
      {
        field: "tag",
        key: "user_id",
        relation: "=",
        value: userId,
      },
    ];

    log("Sending OneSignal notification...");
    const result = await oneSignalClient.createNotification(notification);
    log("OneSignal notification sent successfully:", result);

    // Set hasNotified to true for the event
    await setEventNotificationStatusToTrue(
      log,
      database,
      databaseId,
      collectionId,
      eventId
    );

    return result;
  } catch (err) {
    throw err;
  }
};

// Helper function: Update hasNotified status for the event
const setEventNotificationStatusToTrue = async (
  log,
  database,
  databaseId,
  collectionId,
  eventId
) => {
  try {
    // Updated data in JSON format
    const updatedData = {
      hasNotified: true,
    };

    await database.updateDocument(
      databaseId,
      collectionId,
      eventId,
      updatedData
    );

    log(`Event ${eventId} notification status updated.`);
  } catch (err) {
    throw err;
  }
};

// This is your Appwrite function
// It's executed each time we get a request
export default async ({ req, res, log, error }) => {
  // Initialize Appwrite client and database
  const appwriteClient = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);
  const database = new Databases(appwriteClient);

  // Initialize OneSignal client
  const configuration = OneSignal.createConfiguration({
    userKey: ONE_SIGNAL_USER_KEY,
    appKey: ONE_SIGNAL_REST_API_KEY,
  });
  const oneSignalClient = new OneSignal.DefaultApi(configuration);

  // You can log messages to the console
  log("Hello, Logs!");

  // If something goes wrong, log an error
  error("Hello, Errors!");

  try {
    // Use the helper function to check events within the next hour
    const eventsWithinNextHour = await getEventsWithinNextHour(
      log,
      database,
      DATABASE_ID,
      COLLECTION_ID
    );

    // Iterate over each event
    for (const event of eventsWithinNextHour.documents) {
      log(`The event being iterated: ${event}`);
      const userId = event.userId;
      log(`Processing event for userId: ${userId}`);

      // Customize notification content based on specific event details if needed
      const notificationContent = `Event: ${event.title} is starting in an hour!`;

      // Send OneSignal notification to the specific user
      await sendOneSignalNotification(
        log,
        oneSignalClient,
        ONE_SIGNAL_APP_ID,
        notificationContent,
        database,
        DATABASE_ID,
        COLLECTION_ID,
        event.$id,
        userId
      );
    }
  } catch (err) {
    error("Error with Appwrite function:", err.message);
    throw err;
  }

  // `res.json()` is a handy helper for sending JSON
  return res.json({
    motto: "Build like a team of hundreds_",
    learn: "https://appwrite.io/docs",
    connect: "https://appwrite.io/discord",
    getInspired: "https://builtwith.appwrite.io",
  });
};

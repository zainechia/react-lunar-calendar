// // helperFunctions.js
// import { Query } from "appwrite";

// // Check for events happening within the next hour in Appwrite
// const checkEventsWithinNextHour = async (databases, databaseId, collectionId) => {
//   try {
//     // Get the current time
//     const currentTime = new Date();

//     // Calculate the time one hour from now
//     const nextHour = new Date(currentTime.getTime() + 60 * 60 * 1000);

//     // Query for events starting within the next hour
//     const query = [
//       Query.greaterThan("startTime", currentTime.toISOString()), // Events starting after the current time
//       Query.lessThan("startTime", nextHour.toISOString()), // Events starting before the next hour
//     ];

//     const { documents } = await databases.listDocuments(databaseId, collectionId, query);
//     return documents;
//   } catch (error) {
//     throw error;
//   }
// };

// // Send One Signal notification
// const sendOneSignalNotification = async (client, app, userId, notificationContent) => {
//   try {
//     const notification = new OneSignal.Notification();
//     notification.app_id = app.id;
//     // Name property may be required in some cases, for instance when sending an SMS.
//     notification.name = "test_notification_name";
//     notification.contents = notificationContent;

//     // You may want to customize this based on your needs
//     notification.include_player_ids = [userId];

//     const result = await client.createNotification(notification);
//     return result;
//   } catch (error) {
//     throw error;
//   }
// };

// export { sendOneSignalNotification, checkEventsWithinNextHour };
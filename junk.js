// import {
//   databases,
//   DATABASE_ID,
//   COLLECTION_ID,
// } from "./src/appwrite/appwriteConfig";
// import { Query } from "appwrite";
// import { Client, Databases } from "node-appwrite";

// // This is your main Appwrite function
// export default async ({ req, res, log, error }) => {
//   // Log test messages to the console
//   log("Hello, this message is to test log!");
//   error("Hello, this message is to test error!");

//   // The `req` object is the request sent by the client to trigger an action on the server
//   // If request is GET, send this response just for testing purposes
//   if (req.method === "GET") {
//     return res.send("This was a GET request");
//   }

//   const client = new Client()
//     .setEndpoint("https://cloud.appwrite.io/v1")
//     .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
//     .setKey(process.env.APPWRITE_API_KEY);

//   try {
//     // Use the helper function to check events within the next hour
//     const eventsWithinNextHour = await checkEventsWithinNextHour(
//       databases,
//       DATABASE_ID,
//       COLLECTION_ID
//     );

//     // Do something with eventsWithinNextHour
//     log("Events within the next hour:", eventsWithinNextHour);
//   } catch (error) {
//     error("Error checking events within the next hour:", error.message);
//   }

//   // Check if the event type is a user-related event
//   //   if (req.body.event && req.body.event === 'users.create') {
//   //       log('User created:', req.body.payload.$id);
//   //   } else if (req.body.event && req.body.event === 'users.delete') {
//   //       log('User deleted:', req.body.payload.$id);
//   //   }

//   // `res.json()` is a handy helper for sending JSON
//   // return res.json({
//   //     motto: 'Build like a team of hundreds_',
//   //     learn: 'https://appwrite.io/docs',
//   //     connect: 'https://appwrite.io/discord',
//   //     getInspired: 'https://builtwith.appwrite.io',
//   // });
// };

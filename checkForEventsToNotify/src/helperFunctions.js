// checkEventsHelperFunction.js
import { Query } from "appwrite";

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

    const response = await databases.listDocuments(databaseId, collectionId, query);
    return response;
  } catch (error) {
    throw error;
  }
};

export default checkEventsWithinNextHour;
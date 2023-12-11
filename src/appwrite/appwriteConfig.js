import { Client, Databases, Account } from "appwrite";

const client = new Client();
export const PROJECT_ID = process.env.REACT_APP_PROJECT_ID;
export const DATABASE_ID = process.env.REACT_APP_DATABASE_ID;
export const COLLECTION_ID = process.env.REACT_APP_COLLECTION_ID;

client.setEndpoint("https://cloud.appwrite.io/v1").setProject(PROJECT_ID); // Replace with your project ID

export const account = new Account(client);
export const databases = new Databases(client, DATABASE_ID);

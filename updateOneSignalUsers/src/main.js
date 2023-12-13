import { Client } from 'node-appwrite';

export default async ({ req, res, log, error }) => {
  // Log messages to the console
  log('Hello, Logs!');
  error('Hello, Errors!');

  // The `req` object contains the request data
  if (req.method === 'GET') {
      return res.send('Hello, World!');
  }

  // Check if the event type is a user-related event
  if (req.body.event && req.body.event === 'users.create') {
      console.log('User created:', req.body.payload.$id);
  } else if (req.body.event && req.body.event === 'users.delete') {
      console.log('User deleted:', req.body.payload.$id);
  }

  // `res.json()` is a handy helper for sending JSON
  return res.json({
      motto: 'Build like a team of hundreds_',
      learn: 'https://appwrite.io/docs',
      connect: 'https://appwrite.io/discord',
      getInspired: 'https://builtwith.appwrite.io',
  });
};
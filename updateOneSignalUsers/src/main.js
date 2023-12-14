// This is your Appwrite function
export default async ({ req, res, log, error }) => {
  // Log test messages to the console
  log('Hello, this message is to test log!');
  error('Hello, this message is to test errors!');

  // The `req` object is the request sent by the client to trigger an action on the server

  // If request is GET, send this response just for testing purposes
  if (req.method === 'GET') {
      return res.send('This was a GET request');
  }

  // If request is POST, send this response just for testing purposes
  if (req.method === 'POST') {
    log(req);
    return res.json({
      'sentData': req.body,
    })
  }
  
  //req.body example
  const example = {
    "$id":"42cf0a0e-3e8f-402e-9ad8-2e866caf3c44",
    "$createdAt":"2023-12-14T04:59:05.847+00:00",
    "$updatedAt":"2023-12-14T04:59:05.847+00:00",
    "name":"Enable17",
    "registration":"2023-12-14T04:59:05.845+00:00",
    "status":true,"labels":[],
    "passwordUpdate":"2023-12-14T04:59:05.845+00:00",
    "email":"enable17@hello.com",
    "phone":"",
    "emailVerification":false,
    "phoneVerification":false,
    "prefs":[],
    "accessedAt":"2023-12-14T04:59:05.845+00:00"};

  //delete one signal user function

  // Check if the event type is a user-related event
  if (req.body.event && req.body.event === 'users.create') {
      log('User created:', req.body.payload.$id);
  } else if (req.body.event && req.body.event === 'users.delete') {
      log('User deleted:', req.body.payload.$id);
  }

  // `res.json()` is a handy helper for sending JSON
  // return res.json({
  //     motto: 'Build like a team of hundreds_',
  //     learn: 'https://appwrite.io/docs',
  //     connect: 'https://appwrite.io/discord',
  //     getInspired: 'https://builtwith.appwrite.io',
  // });
};

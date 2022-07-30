// const { initializeApp, applicationDefault } = require("firebase-admin/app");

// const { getAuth } = require("firebase-admin/auth");

// initializeApp({
//   credential: applicationDefault(),
//   databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
// });

// getAuth()
//   .getUser("")
//   .then((userRecord) => {
//     // See the UserRecord reference doc for the contents of userRecord.
//     console.log(JSON.stringify(userRecord.displayName));
//   })
//   .catch((error) => {
//     console.log("Error fetching user data:", error);
//   });
require("dotenv").config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

client.messages
  .create({
    body: "Hello test",
    messagingServiceSid: "MG47585d77a89ffd094c292877f4c8f5e4",
    to: "+16788995204",
  })
  .then((message) => console.log(message.sid))
  .done();

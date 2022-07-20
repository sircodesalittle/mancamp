const { initializeApp, applicationDefault } = require("firebase-admin/app");

const { getAuth } = require("firebase-admin/auth");

initializeApp({
  credential: applicationDefault(),
  databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
});

getAuth()
  .getUser("")
  .then((userRecord) => {
    // See the UserRecord reference doc for the contents of userRecord.
    console.log(JSON.stringify(userRecord.displayName));
  })
  .catch((error) => {
    console.log("Error fetching user data:", error);
  });

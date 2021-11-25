const serviveAccount = require("./daangnmarket-wesopt-firebase-adminsdk-z9ie8-04e712548c");
const admin = require("firebase-admin");
const dotenv = require("dotenv");

dotenv.config();

let firebase;
if (admin.apps.length === 0) {
  firebase = admin.initializeApp({
    credential: admin.credential.cert(serviveAccount),
  });
} else {
  firebase = admin.app();
}

module.exports = {
  api: require("./src"),
};

var admin = require('firebase-admin');
var uid = process.argv[2];

var serviceAccount = require('./grid-dashboard-cb7ab-firebase-adminsdk-yb8fp-67b9b2caff.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

admin
  .auth()
  .setCustomUserClaims(uid, { admin: true })
  .then(() => {
    console.log('custom claims set for user', uid);
    process.exit();
  })
  .catch((err) => {
    console.log('error', err);
    process.exit(1);
  });

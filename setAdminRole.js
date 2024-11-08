const admin = require('firebase-admin');

// Initialize Firebase Admin SDK with service account key
const serviceAccount = require("C:/Users/xgyxg/Dropbox/FiveM/xyz_roleplay/xyz_doj/serviceAccountKey.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

// Set the admin role for a specific user by UID
async function setAdminRole(uid) {
    await admin.auth().setCustomUserClaims(uid, { role: 'admin' });
    console.log(`Admin role set for user with UID: ${uid}`);
}

// Call the function with the user’s UID
setAdminRole('ljsNZ9QJlPdvnX7tgkIICgQyL0e2'); // Replace 'USER_UID_HERE' with the UID of the user you want to make an admin

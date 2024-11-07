const admin = require("firebase-admin");

// Initialize Firebase Admin SDK with service account
const serviceAccount = require("C:/Users/xgyxg/Dropbox/FiveM/xyz_roleplay/xyz_doj/serviceAccountKey.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

async function setCustomUserClaims(uid, role) {
    await admin.auth().setCustomUserClaims(uid, { role });
    console.log(`Custom claims set for user ${uid}: ${role}`);
}

// Example usage
setCustomUserClaims("Q8z30ziIVFNmd8mEgPKCAxyB1m73", "pd"); // Replace USER_UID with actual user ID and "pd" or "dmv" as role


import admin from "../api/admin_config";


export async function checkCustomClaim(idToken) {
  
    try {
    // Verify the ID token
    const decodedToken = await admin.auth().verifyIdToken(idToken);

    // Extract custom claims from the decoded token
    const { customClaims } = decodedToken;

    // Check if the user has the custom claim
    if (customClaims && customClaims.admin === true) {
     return true;
    } else {
     return false;
    }
  } catch (error) {
    console.error('Error verifying token:', error);
  }
}
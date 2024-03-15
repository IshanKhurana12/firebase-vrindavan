import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from "../../firebase_config"; // Import your Firebase authentication instance
import { getAuth, getIdTokenResult } from 'firebase/auth';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        try {
          // Get the user's ID token result, which includes custom claims
          const tokenResult = await getIdTokenResult(authUser);
          // Extract custom claims from the ID token result
          const { claims } = tokenResult;
          // Set the user object with custom claims
    
          setUser({
            ...authUser,
            isAdmin: claims.admin || false,
            // Add other custom claims as needed
          });
        } catch (error) {
          console.error('Error fetching custom claims:', error);
          setUser(null);
        }
      } else {
        // User is signed out
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, loading };
};

export default useAuth;

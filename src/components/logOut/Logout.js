import React, { useState, useEffect } from 'react';
import { Auth, Hub } from 'aws-amplify';
import './logOut.css'; 

const signInUrl = 'https://qv-auth.auth.us-east-2.amazoncognito.com/oauth2/authorize?client_id=3pssbadflhtmscuqtlbvbd08m3&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F';
export const Logout = () => {
    console.log("You are viewving logout page");
    
  const [isSignedOut, setIsSignedOut] = useState(false);

  useEffect(() => {
    const checkAuthState = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        setIsSignedOut(false);
      } catch (error) {
        setIsSignedOut(true);
      }
    };
    checkAuthState();
    const authListener = (data) => {
      if (data.payload.event === 'signOut') {
        setIsSignedOut(true);
      }
    };
    Hub.listen('auth', authListener);
    return () => {
      Hub.remove('auth', authListener);
    };
  }, []);

  const handleSignIn = () => {
    // Redirect the user to the sign-in page
    window.location.href = signInUrl;
    console.log("logged out");
  };
  return (
    <div className={`sign-out-box ${isSignedOut ? 'visible' : ''}`}>
      {isSignedOut ? (
        <div className="message-container">
          <p className="message">You have successfully signed out.</p>
          <p onClick={handleSignIn} className="sign-in-link">
            Click here to sign in.
          </p>
        </div>
      ) : null}
    </div>
  );
};
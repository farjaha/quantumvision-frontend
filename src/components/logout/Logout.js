import React, { useState, useEffect } from 'react';
import { Auth, Hub } from 'aws-amplify';
import './signOutBox.css'; 


export const Logout = () => {
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
    window.location.href = 'https://qv-auth.auth.us-east-2.amazoncognito.com/oauth2/authorize?client_id=43fon06sj1bimq599r9b2tbice&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F'
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

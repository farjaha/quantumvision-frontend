import { useEffect, useState } from 'react';
import { Header } from '../header/Header';
import { UserInfo } from '../user_info/UserInfo';
// import { FilesList } from './files/FilesList';
import { Auth, Hub } from 'aws-amplify';

const signInUrl = 'https://qv-auth.auth.us-east-2.amazoncognito.com/oauth2/authorize?client_id=3pssbadflhtmscuqtlbvbd08m3&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F';

export const Home = () => {
    // const [isTokenExpired, setIsTokenExpired] = useState(false);

    // useEffect(() => {
    //     const checkTokenExpiration = async () => {
    //         try {
    //             const user = await Auth.currentAuthenticatedUser();
    //             const expirationTime = user.signInUserSession.idToken.payload.exp * 1000;
    //             const currentTime = new Date().getTime();

    //             if (currentTime >= expirationTime) {
    //                 console.log("Token is expired!!!");
    //                 setIsTokenExpired(true);
    //             }
    //             else {
    //                 console.log("Token is still valid!!!");
    //             }
    //         } catch (error) {
    //             console.error('Error checking token expiration:', error);
    //         }
    //     };
    //     checkTokenExpiration();

    //     const authListener = (data) => {
    //         if (data.payload.event === 'signOut') {
    //             setIsTokenExpired(false);
    //         }
    //     };

    //     Hub.listen('auth', authListener);

    //     return () => {
    //         Hub.remove('auth', authListener);
    //     }

    // }, []);

    async function handleSignOut() {
        try {
            window.location.href = signInUrl;
            await Auth.signOut();

        } catch (error) {
            console.error('Error signing out:', error);
        }
    }

    // const handleSignIn = () => {
    //     console.log("handleSignIn");
    //     window.location.href = signInUrl
    // };

    return (
        <>
            <Header />
            <UserInfo />
          <button onClick={handleSignOut} style={{ padding: '10px 40px', margin: '0 20px', border: 'none', background: 'grey' }}>Sign out</button>
        </>
    )
}
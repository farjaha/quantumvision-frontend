import { useEffect, useState } from 'react';
import { Header } from '../header/Header';
import { UserInfo } from '../user_info/UserInfo';
// import { FilesList } from './files/FilesList';
import { Auth } from 'aws-amplify';
import { async } from 'q';

export const Home = () => {
    const [isTokenExpired, setIsTokenExpired] = useState(false);

    useEffect(() => {
        const checkTokenExpiration = async () => {
            try {
                const user = await Auth.currentAuthenticatedUser();
                console.log(user)
            } catch (error) {
                console.error('Error checking token expiration:', error);
            }
        }
    })
//   async function handleSignOut() {
//     try {
//       await Auth.signOut();

//     } catch (error) {
//       console.error('Error signing out:', error);
//     }
//   }
  return (
    <>
      <Header />
      <UserInfo />
      {/* <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <button onClick={handleSignOut} style={{ padding: '10px 40px', margin: '0 20px', border: 'none', background: 'grey' }}>Sign out</button>
      </div> */}
    </>
  )
}
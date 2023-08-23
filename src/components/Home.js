import { Header } from './header/Header';
import { User } from './user/User';
import { FilesList } from './files/FilesList';
import { Auth } from 'aws-amplify';

export const Home = () => {
  async function handleSignOut() {
    try {
      await Auth.signOut();

    } catch (error) {
      console.error('Error signing out:', error);
    }
  }
  return (


    <>
      <Header />
      <User />
      <FilesList />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <button onClick={handleSignOut} style={{ padding: '10px 40px', margin: '0 20px', border: 'none', background: 'grey' }}>Sign out</button>
      </div>
    </>
  )
}



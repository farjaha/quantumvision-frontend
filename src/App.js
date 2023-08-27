import { Amplify } from 'aws-amplify';
import { Home } from './components/home/Home';

import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';
Amplify.configure(awsExports);

function App({ signOut, user }) {
  return (
    <>
      <Home handleSignOut={signOut}/>
    </>
  );
}

export default withAuthenticator(App, {hideSignUp: true});

import * as React from 'react';
import { Heading } from '@aws-amplify/ui-react';
import './header.css'

const welcome_message = "Welcome to Quantum Vision File Access";

// This component is representing the header part of the page
// Currently it includes the welcome message
export const Header = () => {
  return <Heading
    level={2}
    padding={'20px'}
    textAlign={'center'}
    color={'grey'}>
    {welcome_message}
  </Heading>;
};
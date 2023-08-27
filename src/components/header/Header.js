import * as React from 'react';
import { Heading } from '@aws-amplify/ui-react';
import './header.css'

const welcome_message="Welcome to Quantum Vision File Access"
export const Header = () => {
  return <Heading level={1} textAlign={'center'} color={'grey'} className='heading-style'>{welcome_message}</Heading>;
};
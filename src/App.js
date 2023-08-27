import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { Home } from './components/home/Home';
import { Logout } from './components/logout/Logout';
import {Amplify} from 'aws-amplify';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
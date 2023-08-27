import logo from './logo.svg';
import './App.css';
import { Home } from './components/home/Home';
import {Amplify} from 'aws-amplify';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

function App() {
  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;

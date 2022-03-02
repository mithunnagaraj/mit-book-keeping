import React from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import Home from './components/Home';
import LoginPage from './components/login/LoginPage';

function App() {
  const CLIENT_ID = process.env.REACT_APP_GOOGLE_DRIVE_CLIENT_ID;
  const user = useSelector(state => state.userSession.user);
  return (
    <div className="App">
        {/* <LoginPage></LoginPage>
         */}
         {CLIENT_ID}
         <Home></Home>
    </div>
  );
}

export default App;

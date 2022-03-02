import React from 'react';
import { useSelector } from 'react-redux';
import Login from './Login';
import Logout from './Logout';
import _ from 'lodash';
import Home from '../Home';

export default function LoginPage() {
    const user = useSelector(state => 
        state.userSession.user);
  return (
    <>
                {(_.isEmpty(user)) && <Login />}
                {!(_.isEmpty(user)) && <Home />}
                {/* <h2>The Hooks way</h2>
        <LoginHooks />
        <LogoutHooks />
        <br />
        If it does helped you feel free to star{' '}
        <a href="https://github.com/Sivanesh-S/react-google-authentication">
          Github Repo
        </a>{' '}
        😉 */}
            </>
  )
}

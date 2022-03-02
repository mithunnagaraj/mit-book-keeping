import { Button } from '@mui/material';
import { gapi } from 'gapi-script';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser, setIsSignedIn } from '../../store/reducer/user-session.reducer';

function Logout() {
  const user = useSelector(state =>
    state.userSession.user);
  const dispatch = useDispatch();
  const onSuccess = () => {
    console.log('Logout made successfully');
    alert('Bye ' + user.name + 'Logout made successfully ✌');
    dispatch(clearUser())
  };
  const handleSignOutClick = (event) => {
    gapi.auth2.getAuthInstance().signOut();
    dispatch(clearUser());
    dispatch(setIsSignedIn(false));
  };

  return (
    <div className='logout'>
      {/* <GoogleLogout
        clientId={GOOGLE_CLIENT_ID}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      ></GoogleLogout> */}
      <Button className='logout-button' variant="contained" onClick={() => handleSignOutClick()} >
        <div className="icons8-google"></div>Logout
      </Button>

    </div>
  );
}

export default Logout;

import { Button } from '@mui/material';
import { gapi } from 'gapi-script';
import React from 'react';
import { useDispatch } from 'react-redux';
import { DISCOVERY_DOCS, GOOGLE_API_KEY, GOOGLE_CLIENT_ID, SCOPES } from '../../app.constants';
import { setIsSignedIn, setUser, setUserToken } from '../../store/reducer/user-session.reducer';
// refresh token
import { refreshTokenSetup } from '../../utils/refreshToken';



function Login() {
  const dispatch = useDispatch();

  const onSuccess = (res) => {
    console.log('Login Success: currentUser:', res.tokenObj);
    dispatch(setUser(res.profileObj));
    dispatch(setUserToken(res.tokenObj));
    alert(
      `Logged in successfully welcome ${res.profileObj.name} 😍. \n See console for full profile object.`
    );
    refreshTokenSetup(res);
  };

  const onFailure = (res) => {
    console.log('Login failed: res:', res);
    alert(
      `Failed to login. 😢`
    );
  };

  const handleClientLoad = () => {
    gapi.load('client:auth2', initClient);
  };

  /**
   *  Initializes the API client library and sets up sign-in state
   *  listeners.
   */
  const initClient = () => {
    gapi.client
      .init({
        apiKey: GOOGLE_API_KEY,
        clientId: GOOGLE_CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      })
      .then(
        function () {
          if (gapi.auth2 && gapi.auth2.getAuthInstance()) {
            updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
          }
        },
        function (error) {
        }
      );
  };

  const updateSigninStatus = (isSignedIn) => {
    if (isSignedIn) {
      // Set the signed in user
      // setSignedInUser(gapi.auth2.getAuthInstance().currentUser.je.Qt);
      // list files if user is authenticated
      // listFiles();
      dispatch(setUser(gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile()));
      dispatch(setIsSignedIn(true))
    } else {
      // prompt user to sign in
      handleAuthClick();
    }
  };

  const handleAuthClick = (event) => {
    gapi.auth2.getAuthInstance().signIn().then(function () {
      dispatch(setIsSignedIn(true));
      dispatch(setUser(gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile()));
      dispatch(setUserToken(gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse()));
    }, function (error) { });
  };

  return (
    <div className="login">
      {/* <GoogleLogin
        clientId={GOOGLE_CLIENT_ID}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        style={{ marginTop: '100px' }}
        isSignedIn={true}
      /> */}
      <Button className='login-button' variant="contained" onClick={() => handleClientLoad()} >
        <div className="icons8-google"></div><span>Login</span>
      </Button>
    </div>
  );
}

export default Login;

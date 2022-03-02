import { FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { gapi } from 'gapi-script';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Appbar from './Appbar';
import DetailsPage from './DetailsPage';


function Home() {
    const years = ['2020', '2021', '2022'];
    const loadYears = () => {
        return years.map(year => <MenuItem key={year} value={year}>{year}</MenuItem>);
    }
    const handleYearChange = (event) => {
        setYear(event.target.value)
    }
    const userToken = useSelector(state =>
        state.userSession.userToken);

    const isSignedIn = useSelector(state => state.userSession.isSignedIn);


    const [year, setYear] = React.useState('');

    const [listDocumentsVisible, setListDocumentsVisibility] = useState(false);
    const [documents, setDocuments] = useState([]);
    const [isLoadingGoogleDriveApi, setIsLoadingGoogleDriveApi] = useState(false);
    const [isFetchingGoogleDriveFiles, setIsFetchingGoogleDriveFiles] = useState(false);
    const [signedInUser, setSignedInUser] = useState();
    const handleChange = (file) => { };

    /**
     * Print files.
     */
    const listFiles = (searchTerm = null) => {
        setIsFetchingGoogleDriveFiles(true);
        window.gapi.client.drive.files
            .list({
                pageSize: 10,
                fields: 'nextPageToken, files(id, name, mimeType, modifiedTime)',
                q: searchTerm,
            })
            .then(function (response) {
                setIsFetchingGoogleDriveFiles(false);
                setListDocumentsVisibility(true);
                const res = JSON.parse(response.body);
                // setDocuments(res.files);
            });
    };

    /**
     *  Sign in the user upon button click.
     */
    const handleAuthClick = (event) => {
        gapi.auth2.getAuthInstance().signIn();
    };

    /**
     *  Called when the signed in status changes, to update the UI
     *  appropriately. After a sign-in, the API is called.
     */
    const updateSigninStatus = (isSignedIn) => {
        if (isSignedIn) {
            // Set the signed in user
            // setSignedInUser(gapi.auth2.getAuthInstance().currentUser.je.Qt);
            setIsLoadingGoogleDriveApi(false);
            // list files if user is authenticated
            listFiles();
        } else {
            // prompt user to sign in
            handleAuthClick();
        }
    };

    /**
     *  Sign out the user upon button click.
     */
    const handleSignOutClick = (event) => {
        setListDocumentsVisibility(false);
        gapi.auth2.getAuthInstance().signOut();
    };

    /**
     *  Initializes the API client library and sets up sign-in state
     *  listeners.
     */
    /* const initClient = () => {
      setIsLoadingGoogleDriveApi(true);
      gapi.client
        .init({
          apiKey: GOOGLE_API_KEY,
          clientId: GOOGLE_CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES,
        })
        .then(
          function () {
            // Listen for sign-in state changes.
            debugger;
            gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
  
            // Handle the initial sign-in state.
            updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
          },
          function (error) {
          }
        );
    };
  
    const handleClientLoad = () => {
      gapi.load('client:auth2', initClient);
    }; */

    const showDocuments = () => {
        setListDocumentsVisibility(true);
    };

    const onClose = () => {
        setListDocumentsVisibility(false);
    };



    return (
        <div>
            <Appbar></Appbar>
            <Button variant="contained" onClick={() => listFiles()} >List</Button>
            <Container>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }} className="year-select">
                            <InputLabel style={{ display: 'flex' }} id="demo-simple-select-label">Year</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={year}
                                label="Year"
                                onChange={handleYearChange}
                            >
                                {loadYears()}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <DetailsPage></DetailsPage>
                    </Grid>
                </Grid>
            </Container>
        </div >
    )
}

export default Home
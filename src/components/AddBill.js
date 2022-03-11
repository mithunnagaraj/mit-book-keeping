import { PhotoCamera } from '@material-ui/icons';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Input, TextField } from '@mui/material';
import React from 'react';
import { ADD } from '../app.constants';

function AddBill() {
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = (action) => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const styled = {
        display: 'none'
    };

    return (
        <div>
            <Button variant="contained" onClick={() => handleClickOpen(ADD)}>Add Bill</Button>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Subscribe</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To subscribe to this website, please enter your email address here. We
                        will send updates occasionally.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="date"
                        label="Date"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="amount"
                        label="Amount"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="description"
                        label="Description"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <label htmlFor="contained-button-file" sx={{ m: 2 }}>
                        <Input accept="image/*" id="contained-button-file" multiple type="file" style={styled} />
                        <Button variant="contained" component="span" endIcon={<PhotoCamera />}>
                            Upload
                        </Button>
                    </label>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Add</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default AddBill
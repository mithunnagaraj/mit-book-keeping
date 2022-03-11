import { Button, Card, Link, Typography } from '@mui/material'
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { SHEET_ID } from '../app.constants';

function DetailsPage() {
    const userToken = useSelector(state =>
        state.userSession.userToken);


    const details = [{
        id:1,
        "date": "22/2/2022",
        "amount": "123",
        "actions": "edit"
    },
    {
        id:2,
        "date": "23/2/2022",
        "amount": "1233",
        "actions": "edit"
    },
    {
        id:3,
        "date": "25/2/2022",
        "amount": "1221",
        "actions": "edit"
    }];
    const columns = [
        { field: 'date', headerName: 'Date', width: 150 },
        { field: 'amount', headerName: 'Amount', width: 150 },
        {field: 'actions', headerName: 'Link To Bill', 

        renderCell: (params) => (
            <Link>{params.value}</Link>
          )}
      ];


    //   useEffect(() => {
    //         getSheetValues();
    //   })

      const getSheetValues = async () =>{
          var accessToken = userToken.access_token;
        const request = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/A1:B5`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken.access_token}`  
        }
        });
        const data = await request.json();
        console.log(data);
        debugger
        return data;
      }





    return (
        <div>
            <Button variant='outlined' onClick={() => getSheetValues()}>Load</Button>
            <Card className='main-card'>
                <div style={{ display: 'flex', height: '100%' }}>
                    <div style={{ flexGrow: 1 }}>
                        <DataGrid autoHeight  rows={details} columns={columns} />
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default DetailsPage
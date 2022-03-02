import { Card, Link, Typography } from '@mui/material'
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import React from 'react'

function DetailsPage() {
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
        {field: 'actions', headerName: 'Actions', 

        renderCell: (params) => (
            <Link>{params.value}</Link>
          )}
      ];
    return (
        <div>
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
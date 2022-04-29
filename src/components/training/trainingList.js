import React, { useState, useEffect, useMemo } from "react";
import { AgGridReact } from "ag-grid-react"
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit'

import { format, parseISO } from "date-fns";

import 'ag-grid-community/dist/styles/ag-grid.css';
import "ag-grid-community/dist/styles/ag-theme-material.css";
import Addtraining from "./Addtraining";

function Traininglist () {

    //trainings state to save all training data 
    const[trainings, setTrainings] = useState([]);

    //useEffect function to render data once the page is loaded
    useEffect(() => { fetchTrainings(); }, [])
    
    //fetching training data from the api
    const fetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => {
            if(response.ok) {
                return response.json(); 
            } else throw new Error (response.status)
        })
        .then(responseData => 
            setTrainings(responseData)
            )
        .catch(err => console.error(err))
    }

    //defining the each columns 
    const [columns] = useState([
        {headerName: 'Date', field: 'date', type: 'date', filter: 'agDateColumnFilter',
        cellRenderer: (params) =>
        format(parseISO(params.data.date), "dd-MM-yyyy"),
        },
        {headerName: 'Duration (min)', field: 'duration'},
        {headerName: 'Activity', field: 'activity'}, 
        {headerName: 'Customer', valueGetter(params) { return params.data.customer.firstname + ' ' + params.data.customer.lastname}}, 
        {
            headerName: '', 
            field: 'links.href',
            width: 80, 
            cellRenderer: params => 
            <IconButton>
                <EditIcon color="primary"/>
            </IconButton>
        },
        {
            headerName: '', 
            field: 'links.href',
            width: 80, 
            cellRenderer: params => 
            <IconButton>
                <DeleteIcon color="error"/>
            </IconButton>
        }
    ])

    //setting common properties for all columns
    const defaultColumnProps = useMemo(() => ({
        sortable: true,
        filter: true
    })); 

    return (
    <div className="ag-theme-material" style={{ height: 550, width: '90%', margin: 70}}>
        <h2>List of trainings</h2>
        <Addtraining />
        <AgGridReact
        defaultColDef={defaultColumnProps}
        columnDefs={columns}
        rowData={trainings}
        pagination={true}
        paginationPageSize={10}
        suppressCellFocus={true}
        />
    </div>
    ); 
}

export default Traininglist; 
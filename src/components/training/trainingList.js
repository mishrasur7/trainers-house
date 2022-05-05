//dependencies imported
import React, { useState, useEffect, useMemo } from "react";
import { AgGridReact } from "ag-grid-react"
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Snackbar from '@mui/material/Snackbar';

import { format, parseISO } from "date-fns";

import 'ag-grid-community/dist/styles/ag-grid.css';
import "ag-grid-community/dist/styles/ag-theme-material.css";
import Addtraining from "./Addtraining";

function Traininglist () {

    //trainings state to save all training data 
    const[trainings, setTrainings] = useState([]);

    //sets open state to false
    const[open, setOpen] = useState(false);

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

    //add training to customer
    const addTraining = (newTraining) => {
        fetch('https://customerrest.herokuapp.com/api/trainings', {
            method: 'POST', 
            headers: { 'Content-Type': 'application/json'}, 
            body: JSON.stringify(newTraining)
        })
        .then(response => {
            if(response.ok) {
                fetchTrainings(); 
            } else {
                alert('Something went wrong!')
            }
        })
        .catch(err => console.error(err))
    }

    //delete training of customer
    const deleteTraining = (link) => {
        if(window.confirm('Are you sure that you want to delete this training?')) {
            fetch('https://customerrest.herokuapp.com/api/trainings/' + link.data.id, {
                method: 'DELETE'
            })
            .then(response => {
                if(response.ok) {
                    fetchTrainings();
                    setOpen(true);  
                } else {
                    alert('Something went wrong!'); 
                }
            })
            .catch(err => console.error(err))
        }
    }

    //defining the each columns 
    const [columns] = useState([
        {headerName: 'Date', field: 'date', type: 'date', filter: 'agDateColumnFilter',
        cellRenderer: (params) =>
        format(parseISO(params.data.date), "dd.MM.yyyy"),
        },
        {headerName: 'Duration (min)', field: 'duration'},
        {headerName: 'Activity', field: 'activity'}, 
        {headerName: 'Customer', valueGetter(params) { return params.data.customer.firstname + ' ' + params.data.customer.lastname}},
        {
            headerName: '', 
            field: 'links.href',
            width: 80, 
            cellRenderer: params => 
            <IconButton onClick={() => deleteTraining(params)}>
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
        <h2 style={{padding: 10}}>List of trainings</h2>
        <Addtraining addTraining={addTraining}/>
        <AgGridReact
        defaultColDef={defaultColumnProps}
        columnDefs={columns}
        rowData={trainings}
        pagination={true}
        paginationPageSize={10}
        suppressCellFocus={true}
        />
         <Snackbar 
                open={open}
                autoHideDuration={3000}
                onClose={() => setOpen(false)}
                message='Training deleted successfully!'
            />
    </div>
    ); 
}

export default Traininglist; 
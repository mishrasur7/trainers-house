import React, { useState, useEffect, useMemo } from "react";
import { AgGridReact } from "ag-grid-react"

import 'ag-grid-community/dist/styles/ag-grid.css';
import "ag-grid-community/dist/styles/ag-theme-material.css";

function Trainings () {

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
        {headerName: 'Date', field: 'date'},
        {headerName: 'Duration (min)', field: 'duration'},
        {headerName: 'Activity', field: 'activity'}, 
        {headerName: 'Customer', valueGetter(params) { return params.data.customer.firstname + ' ' + params.data.customer.lastname}}
    ])

    //setting common properties for all columns
    const defaultColumnProps = useMemo(() => ({
        sortable: true,
        filter: true
    })); 

    return (
    <div className="ag-theme-material" style={{ height: 600, width: '90%', margin: 70}}>
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

export default Trainings; 
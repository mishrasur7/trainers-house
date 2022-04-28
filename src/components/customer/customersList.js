import React, { useState, useEffect, useMemo} from "react";
import { AgGridReact } from 'ag-grid-react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit'

import 'ag-grid-community/dist/styles/ag-grid.css';
import "ag-grid-community/dist/styles/ag-theme-material.css";
import AddCustomer from "./addCustomer";

function Customers () {
    //array state to save all customers
    const[customers, setCustomers] = useState([]);

    //fetch customers after the first render
   useEffect(() => { fetchCustomers(); }, [])

   //creating a function fetchCustomers to save customers data into customers state
    const fetchCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => {
            if(response.ok) {
                return response.json(); 
            } else {
                throw new Error (response.status);
            }
        })
        .then(responseData => setCustomers(responseData.content))
        .catch(err => console.error(err))
    }

    //defining each column for ag-grid table component
    const [columns] = useState([
        {headerName: 'First name', field: 'firstname', width: 130},
        {headerName: 'Last name', field: 'lastname', width: 130}, 
        {headerName: 'Street address', field: 'streetaddress', width: 175}, 
        {headerName: 'Postal code', field: 'postcode', width: 175},
        {headerName: 'City', field: 'city', width: 130}, 
        {headerName: 'Email', field: 'email', width: 175}, 
        {headerName: 'Phone number', field: 'phone', width: 175},
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
    ]);

    //setting the common props for all columns
    const defaultColumnProps = useMemo(() => ({
        sortable: true,
        filter: true
    })); 


    //displaying data in html page with ag-grid component
    return (
        <div className="ag-theme-material" style={{ height: 600, width: '90%', margin: 70}}>
            <h2>List of customers</h2>
            <AddCustomer />
            <AgGridReact
            defaultColDef={defaultColumnProps}
            columnDefs={columns}
            rowData={customers}
            pagination={true}
            paginationPageSize={10}
            suppressCellFocus={true}
            />
        </div>
        ); 
}

export default Customers; 

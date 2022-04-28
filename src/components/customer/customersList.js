import React, { useState, useEffect, useMemo} from "react";
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import "ag-grid-community/dist/styles/ag-theme-material.css";

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
        {headerName: 'First name', field: 'firstname', width: 150},
        {headerName: 'Last name', field: 'lastname', width: 150}, 
        {headerName: 'Street address', field: 'streetaddress', width: 200}, 
        {headerName: 'Postal code', field: 'postcode', width: 200},
        {headerName: 'City', field: 'city', width: 150}, 
        {headerName: 'Email', field: 'email', width: 200}, 
        {headerName: 'Phone number', field: 'phone', width: 200},
    ]);

    //setting the common props for all columns
    const defaultColumnProps = useMemo(() => ({
        sortable: true,
        filter: true
    })); 


    //displaying data in html page with ag-grid component
    return (
        <div className="ag-theme-material" style={{ height: 600, width: '90%', margin: 70}}>
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

//dependencies imported
import React, { useState, useEffect, useMemo, useCallback, useRef} from "react";
import { AgGridReact } from 'ag-grid-react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Snackbar from '@mui/material/Snackbar';


import 'ag-grid-community/dist/styles/ag-grid.css';
import "ag-grid-community/dist/styles/ag-theme-material.css";

import AddCustomer from "./Addcustomer";
import Updatecustomer from "./Updatecustomer";
import ExportCSV from "./ExportCSV";

function Customerlist () {
    //array state to save all customers
    const[customers, setCustomers] = useState([]);

    //sets open state to false
    const[open, setOpen] = useState(false); 

    //sets notification message upon deletion and edition
    const[message, setMessage] = useState(''); 

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

    //adds customer to database
    const addCustomer = (newCustomer) => {
        fetch('https://customerrest.herokuapp.com/api/customers', {
            method: 'POST', 
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify(newCustomer)
        })
        .then(response => {
            if(response.ok) {
                fetchCustomers();
                setMessage('Customer added successfully')
            } else {
                alert('Something went wrong!')
            }
        })
        .catch(err => console.error(err))
    }

    //update customer details
    const updateCustomer = (updatedCustomer, link) => {
        fetch(link[0].href, {
            method: 'PUT', 
            headers: { 'Content-Type': 'application/json'}, 
            body: JSON.stringify(updatedCustomer)
        })
        .then(response => {
            if(response.ok) {
                setOpen(true);
                setMessage('Customer updated successfully'); 
                fetchCustomers(); 
            } else {
                alert('Someting went wrong!')
            }
        })
        .catch(err => console.error(err))
    }

    //delete customer from database
    const deleteCustomer = (link) => {
        if(window.confirm('Are you sure that you want to delete this customer?')) {
            fetch(link.data.links[0].href, {method: 'DELETE'})
            .then(response => {
                if(!response.ok) {
                    alert('Something went wrong in deletion!') 
                } else {
                    setOpen(true);
                    setMessage('Customer deleted successfully') 
                    fetchCustomers();
                }
            })
            .catch(err => console.error(err))
        }
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
            field: 'links',
            width: 80, 
            cellRenderer: params =>
            <Updatecustomer params={params} updateCustomer={updateCustomer}/> 
        },
        {
            headerName: '', 
            field: 'links',
            width: 80, 
            cellRenderer: params => 
            <IconButton onClick={() => deleteCustomer(params)}>
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
            <ExportCSV customers={customers}/>
            <AddCustomer addCustomer={addCustomer} />
            <AgGridReact
            defaultColDef={defaultColumnProps}
            columnDefs={columns}
            rowData={customers}
            pagination={true}
            paginationPageSize={10}
            suppressCellFocus={true}    
            />
            <Snackbar 
                open={open}
                autoHideDuration={3000}
                onClose={() => setOpen(false)}
                message={message}
            />
        </div>
        ); 
}

export default Customerlist; 

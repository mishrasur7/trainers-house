//dependencies imported
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Button, IconButton } from "@mui/material";
import { AgGridReact } from 'ag-grid-react';
import GetAppIcon from '@mui/icons-material/GetApp';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

function ExportCSV ( { customers }) {

     //gridref for referencing the api which uses the useRef hook function
     const gridRef = useRef();

     //returns the document body
     const popupParent = useMemo(() => {
         return document.body;
     }, []);
     
     //exports data as csv file
     const onBtnExport = useCallback(() => {
         gridRef.current.api.exportDataAsCsv();
     }, []);

    //defining each column for csv table
    const [columns] = useState([
        {headerName: 'First name', field: 'firstname', width: 130},
        {headerName: 'Last name', field: 'lastname', width: 130}, 
        {headerName: 'Street address', field: 'streetaddress', width: 175}, 
        {headerName: 'Postal code', field: 'postcode', width: 175},
        {headerName: 'City', field: 'city', width: 130}, 
        {headerName: 'Email', field: 'email', width: 175}, 
        {headerName: 'Phone number', field: 'phone', width: 175}
    ]);

    return(
        <>
        <IconButton onClick={onBtnExport}>
            <GetAppIcon />
            <Button>Export customer data</Button>
        <AgGridReact
            ref={gridRef}
            rowData={customers}
            suppressExcelExport={true}
            popupParent={popupParent}
            columnDefs={columns}
        ></AgGridReact>
        </IconButton>
        </>
    ); 

}

export default ExportCSV; 
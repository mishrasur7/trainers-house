import React, { useState, useEffect} from "react";
import { Button } from "@mui/material";

function Addtraining () {
    //trainings state to save all training data 
    const[trainings, setTrainings] = useState([]);

    return (
        <>
        <Button variant="contained" style={{marginLeft: 1050}}>
            Add training 
        </Button>
        </>
    ); 
}

export default Addtraining; 
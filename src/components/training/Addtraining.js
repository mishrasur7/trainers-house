import React, { useState, useEffect} from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { MenuItem } from "@mui/material";

function Addtraining ( { addTraining }) {

    //sets open state to false
    const[open, setOpen] = useState(false); 
    
    //trainings state to save all training data 
    const[trainings, setTrainings] = useState({
        date: '', 
        duration: '', 
        activity: '',
        customer: '' 
    });

    //array state to save customer details
    const[customer, setCustomer] = useState([]); 

    //fetch customers after the first render
   useEffect(() => { fetchCustomers(); }, [])

    //creating a function fetchCustomers to save customers data into customer state
    const fetchCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => {
            if(response.ok) {
                return response.json(); 
            } else {
                throw new Error (response.status);
            }
        })
        .then(responseData => setCustomer(responseData.content))
        .catch(err => console.error(err))
    }

    //sets open state to true upon button click to add trainings
    const handleOpen = () => {
        setOpen(true); 
    }

    //sets open state to false upon button click to cancel
    const handleClose = () => {
        setOpen(false); 
    }

    //sets value to the trainings object state upon input change
    const handleChange = (event) => {
        setTrainings({...trainings, [event.target.name]: event.target.value}); 
    }

    //saves trainig details to database
    const handleSave = () => {
        addTraining(trainings); 
        setTrainings({
            date: '', 
            duration: '', 
            activity: '', 
            customer: ''
        })
        setOpen(false); 
    }


    return (
        <>
        <Button variant="contained" onClick={handleOpen} style={{marginLeft: 1050}}>
            Add training
        </Button>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add new training to customer</DialogTitle>
            <DialogContentText style={{marginLeft: 25}}>
                Please fill in training details to customer.
            </DialogContentText>
            <DialogContent>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel variant="filled">Customer</InputLabel>
              <Select
                name='customer'
                value={trainings.customer}
                onChange={handleChange}
              >
                  {
                      customer.map((customer, index) => (
                          <MenuItem key={index.toString()} value={customer.links[0].href}>
                          {customer.firstname + ' ' + customer.lastname} </MenuItem>
                      ))
                  }
              </Select>
            </FormControl>
            
            <TextField 
            margin="dense"
            name="date"
            type='date'
            value={trainings.date}
            onChange={handleChange}
            label='Date'
            fullWidth
            variant="standard"
            />
             <TextField 
            margin="dense"
            name="duration"
            value={trainings.duration}
            onChange={handleChange}
            label='Duration'
            fullWidth
            variant="standard"
            />
             <TextField 
            margin="dense"
            name="activity"
            value={trainings.activity}
            onChange={handleChange}
            label='Activity'
            fullWidth
            variant="standard"
            />
        </DialogContent>
         <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
        </DialogActions>
        </Dialog>
        </>
    ); 
}

export default Addtraining; 
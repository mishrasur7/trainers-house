import React, { useState } from "react";
import { Button, IconButton } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import EditIcon from '@mui/icons-material/Edit';


function Updatecustomer( { params, updateCustomer }) {
    //customer object state to save customer details
    const [customer, setCustomer] = useState({
        firstname: '', 
        lastname: '', 
        streetaddress: '', 
        postcode: '', 
        city: '', 
        email: '', 
        phone: ''
    })

    //open state set to false
    const[open, setOpen] = useState(false); 

    //sets open state to true 
    const handleClickOpen = () => {
        setCustomer({
            firstname: params.data.firstname, 
            lastname: params.data.lastname, 
            streetaddress: params.data.streetaddress, 
            postcode: params.data.postcode, 
            city: params.data.city, 
            email: params.data.email, 
            phone: params.data.phone
        })
        setOpen(true); 
    }

    //closes the dialogue box
    const handleClose = () => {
        setOpen(false); 
    }

    //saves customer data and closes the dialogue box
    const handleSave = () => {
        updateCustomer(customer, params.value); 
        setOpen(false)   
    }

    //common function to save each input data into customer state
    const inputchanged = (event) => {
        setCustomer({...customer, [event.target.name]: event.target.value})
    }

    return (
        <>
        <IconButton onClick={handleClickOpen}>
            <EditIcon color="primary"/>
        </IconButton>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Update customer</DialogTitle>
            <DialogContentText style={{marginLeft: 25}}>
                Please update as per your wish.
            </DialogContentText>
            <DialogContent>
            <TextField 
            margin="dense"
            name="firstname"
            value={customer.firstname}
            onChange={inputchanged}
            label='First name'
            fullWidth
            variant="standard"
            />
             <TextField 
            margin="dense"
            name="lastname"
            value={customer.lastname}
            onChange={inputchanged}
            label='Last name'
            fullWidth
            variant="standard"
            />
             <TextField 
            margin="dense"
            name="streetaddress"
            value={customer.streetaddress}
            onChange={inputchanged}
            label='Street address'
            fullWidth
            variant="standard"
            />
             <TextField 
            margin="dense"
            name="postcode"
            value={customer.postcode}
            onChange={inputchanged}
            label='Postcode'
            fullWidth
            variant="standard"
            />
             <TextField 
            margin="dense"
            name="city"
            value={customer.city}
            onChange={inputchanged}
            label='City'
            fullWidth
            variant="standard"
            />
             <TextField 
            margin="dense"
            name="email"
            value={customer.email}
            onChange={inputchanged}
            label='Email'
            fullWidth
            variant="standard"
            />
             <TextField 
            margin="dense"
            name="phone"
            value={customer.phone}
            onChange={inputchanged}
            label='Phone'
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

export default Updatecustomer; 
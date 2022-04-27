import logo from './logo.svg';
import { AppBar, Toolbar, Typography } from '@mui/material';
import {
  BrowserRouter,
  Routes, 
  Route, 
  Link
} from 'react-router-dom'
import './App.css';
import Customers from './components/customer/customersList';


function App() {
  return (
    <div className="App">
    <AppBar>
      <Toolbar>
        <Typography variant='h6'>Trainers house</Typography>
      </Toolbar>
    </AppBar>
   <Customers />
  </div>
  );
}

export default App;

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
import Trainings from './components/training/trainingList';


function App() {
  return (
    <div className="App">
    <AppBar>
      <Toolbar>
        <Typography variant='h6'>Trainers house</Typography>
      </Toolbar>
    </AppBar>
   <Trainings />
  </div>
  );
}

export default App;

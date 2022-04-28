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
    <BrowserRouter>
    <AppBar>
      <Toolbar>
        <Link to='/' style={{textDecoration:'none', marginLeft: 150, color:'white', fontWeight:'bold', fontSize: 20}}>Customers</Link>
        <Link to='/trainings' style={{textDecoration:'none', marginLeft: 100, color:'white', fontWeight:'bold', fontSize: 20}}>Trainings</Link>
        <Link to='/statistics' style={{textDecoration:'none', marginLeft: 100, color:'white', fontWeight:'bold', fontSize: 20}}>Statistics</Link>
        <Link to='/calendar' style={{textDecoration:'none', marginLeft: 100, color:'white', fontWeight:'bold', fontSize: 20}}>Calendar</Link>
      </Toolbar>
    </AppBar>
      <Routes>
        <Route exact path='/' element={<Customers />} />
        <Route exact path='/trainings' element={<Trainings />} />
      </Routes>
    </BrowserRouter>
  </div>
  );
}

export default App;

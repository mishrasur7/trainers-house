import logo from './logo.svg';
import { AppBar, Toolbar, Typography } from '@mui/material';
import {
  BrowserRouter,
  Routes, 
  Route, 
  Link
} from 'react-router-dom'
import './App.css';
import Customerlist from './components/customer/Customerlist';
import Traininglist from './components/training/Traininglist';
import Calendar from './components/Calender';
import Statistics from './components/Statistics';


function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <AppBar>
      <Toolbar>
        <Link to='/' style={{textDecoration:'none', marginLeft: 150, color:'white', fontWeight:'bold', fontSize: 20}}>Customers</Link>
        <Link to='/trainings' style={{textDecoration:'none', marginLeft: 100, color:'white', fontWeight:'bold', fontSize: 20}}>Trainings</Link>
        <Link to='/calendar' style={{textDecoration:'none', marginLeft: 100, color:'white', fontWeight:'bold', fontSize: 20}}>Calendar</Link>
        <Link to='/statistics' style={{textDecoration:'none', marginLeft: 100, color:'white', fontWeight:'bold', fontSize: 20}}>Statistics</Link>
      </Toolbar>
    </AppBar>
      <Routes>
        <Route exact path='/' element={<Customerlist />} />
        <Route exact path='/trainings' element={<Traininglist />} />
        <Route exact path='/calendar' element={<Calendar />} />
        <Route exact path='/statistics' element={<Statistics />} />
        
      </Routes>
    </BrowserRouter>
  </div>
  );
}

export default App;

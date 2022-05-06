//dependencies imported
import { AppBar, Toolbar } from '@mui/material';
import {
  BrowserRouter,
  Routes, 
  Route, 
  NavLink
} from 'react-router-dom'
import './App.css';
import Customerlist from './components/customer/Customerlist';
import Traininglist from './components/training/Traininglist';
import Calendar from './components/Calender';
import Statistics from './components/Statistics';

//defining common styles to all links in toolbar
const linkStyle = ({ isActive }) => {
  return {
    textDecoration: 'none', 
    marginLeft: 100, 
    color: 'white', 
    fontWeight: 'bold',
    fontSize: 23,
    backgroundColor: isActive ? 'black' : "",
    padding: isActive ? 12 : '' 
  };
}

function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <AppBar>
      <Toolbar className='toolbar'>
        <NavLink to='/' style= {linkStyle}>Customers </NavLink>
        <NavLink to='/trainings' style={linkStyle} className='link'>Trainings</NavLink>
        <NavLink to='/calendar' style={linkStyle} className='link'>Calendar</NavLink>
        <NavLink to='/statistics' style={linkStyle} className='link'>Statistics</NavLink>
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

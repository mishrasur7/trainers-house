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
import BasicRating from './components/Rating';

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
        <NavLink to='/' style= {linkStyle} className='link'>Customers </NavLink>
        <NavLink to='/trainings' style={linkStyle} className='link'>Trainings</NavLink>
        <NavLink to='/calendar' style={linkStyle} className='link'>Calendar</NavLink>
        <NavLink to='/statistics' style={linkStyle} className='link'>Bar Chart</NavLink>
        <NavLink to='/rating' style={linkStyle} className='link'>Rating</NavLink>
      </Toolbar>
    </AppBar>
      <Routes>
        <Route exact path='/' element={<Customerlist />} />
        <Route exact path='/trainings' element={<Traininglist />} />
        <Route exact path='/calendar' element={<Calendar />} />
        <Route exact path='/statistics' element={<Statistics />} />
        <Route exact path='/rating' element={<BasicRating />} />        
      </Routes>
    </BrowserRouter>
  </div>
  );
}

export default App;

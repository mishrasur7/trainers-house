//dependencies imported
import { AppBar, Toolbar } from '@mui/material';
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


//defining common styles to all links in toolbar
const linkStyle = {
   textDecoration:'none',
   marginLeft: 100,
   color:'white',
   fontWeight: 'bold',
   fontSize: 23
}

function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <AppBar>
      <Toolbar className='toolbar'>
        <Link to='/' style={linkStyle} className='link'>Customers </Link>
        <Link to='/trainings' style={linkStyle} className='link'>Trainings</Link>
        <Link to='/calendar' style={linkStyle} className='link'>Calendar</Link>
        <Link to='/statistics' style={linkStyle} className='link'>Statistics</Link>
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

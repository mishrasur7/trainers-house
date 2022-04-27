import logo from './logo.svg';
import { AppBar, Toolbar, Typography } from '@mui/material';
import {
  BrowserRouter,
  Routes, 
  Route, 
  Link
} from 'react-router-dom'
import './App.css';
import Customers from './components/customer/customers';
import Trainings from './components/training/trainings';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <AppBar>
        <Toolbar>
          <Typography>
            <Link to="/customers">Customers</Link>
          </Typography>
          <Typography>
           <Link to="/trainings">Trainings</Link>
          </Typography>
        </Toolbar>
      </AppBar>
        <Routes>
          <Route exact path='/customers' element={<Customers />}/>
          <Route exact path='/trainings' element={<Trainings />} />
        </Routes>
      </BrowserRouter>
    
    </div>
  );
}

export default App;

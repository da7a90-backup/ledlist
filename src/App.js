import './App.css';
import Header from './Header';
import Productlist from './Productlist';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { Routes, Route, Outlet, Link } from "react-router-dom";
import Modal from './Modal';

function App() {
  return (
    <div className="App">
    <Header></Header>
      <Routes>
        <Route path='/' element={<Productlist/>}></Route>
        <Route path='/details' element={<Modal/>}></Route>
      </Routes>
    </div>
  );
}

export default App;

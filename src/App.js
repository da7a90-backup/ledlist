import './App.css';
import Header from './Header';
import Productlist from './Productlist';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
function App() {
  return (
    <div className="App">
    <Header></Header>
    <Paper sx={{width:'100vw', background: 'linear-gradient(to top, #ffff 0%, #ffff 1%, #EBE8FC 100%);', border:'1px solid #2c6fbb', borderRadius:'15px 15px'}} elevation={5} square>
    <Typography sx={{marginTop: "80px", fontSize:'10px', padding:'5px'}}><i><b>For more details hover over or tap an element on the table or alternatively click the arrow icon to get the full product details.
    <br/> If you want to use advanced search and filtering click on the search or filter icons in the top right corner of the table.</b></i></Typography>
    </Paper>
    <Productlist></Productlist>
    </div>
  );
}

export default App;

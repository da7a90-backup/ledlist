import {useRef, memo, useState} from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { FormControl, FormGroup, FormLabel, TextField, Tooltip } from '@mui/material';
import { insertProduct} from './services/Data';
import { useLocation, useNavigate } from 'react-router-dom';
import { Autocomplete } from '@mui/material';
import { Chip } from '@mui/material';
import { Select } from '@mui/material';
import { MenuItem } from '@mui/material';


 const EPModal = ({}) => {

  const navigate = useNavigate();
  const {state} = useLocation();
  const {dark, classes, companies, locations} = state;
  

  const productName = useRef()
  const company = useRef() 
  const class_  = useRef()
  const companyHq = useRef()
  const [warehouse, setWarehouse] = useState()
  const yearReleased1 = useRef()
  const discountCode = useRef()
  const alexTested = useRef()
  const productLink = useRef()
  const youtubeReview = useRef()
  const discountedPrice = useRef()
  const shippingUsa = useRef()
  const shippingIntl = useRef()
  const discountedPerLed = useRef()
  const discountedPerOutput = useRef()
  const height = useRef()
  const width = useRef()
  const weight= useRef()
  const pulsing = useRef()
  const modularSupport = useRef()
  const inbuiltTimer = useRef()
  const stands = useRef()
  const warranty1 = useRef()
  const leds1 = useRef()
  const ledDualChip = useRef()
  const totalPowerOutput = useRef()
  const avCombinedPower = useRef()
  const peakPower = useRef()
  const wavelengths1 = useRef()
  const peakWavelengthsTested = useRef()
  const emfe= useRef()
  const emfeReading = useRef()
  const mag = useRef()
  const magReading = useRef()
  const flicker = useRef()
  const soundLevels = useRef()

  const currentYear = (new Date()).getFullYear();
const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));
const years = range(currentYear, currentYear - 50, -1); 
// [2019, 2018, 2017, 2016, ..., 1969]
  const handleAdd = async () => {
    const product = {
      info:{productName: productName.current || "",
      company: company.current || "",
      class: class_.current || "",
      companyHq: companyHq.current || "",
      warehouse: warehouse.join("\n") || "",
      discountCode: discountCode.current || "",
      productLink: productLink.current || "",
      alexTested: alexTested.current || 0,
      youtubeReview: youtubeReview.current || "",
      peakWavelengthsTested: peakWavelengthsTested.current || ""},
      cost:{
      discountedPrice: discountedPrice.current || 0,
      shippingUsa: shippingUsa.current || 0,
      shippingIntl: shippingIntl.current || 0,
      discountedPerLed: discountedPerLed.current || 0,
      discountedPerOutput: discountedPerOutput.current || 0,
      },
      yearReleased: yearReleased1.current || "2023" ,
      size:
      { 
      height: height.current || 0,
      width: width.current || 0,
      weight: weight.current || 0
      },
      features:{
      pulsing: pulsing.current || 0,
      modularSupport: modularSupport.current || 0,
      inbuiltTimer: inbuiltTimer.current || 0,
      stands: stands.current || 0
      },
      warranty: 
      {
        warranty: warranty1.current || 0
      },
      leds:
      {
      leds: leds1.current || 0,
      ledDualChip: ledDualChip.current || 0,
      totalPowerOutput: totalPowerOutput.current || 0,
      avCombinedPower: avCombinedPower.current || 0,
      peakPower: peakPower.current || 0
      },
      wavelengths: wavelengths1.current || {nm480: 0, nm610:0, nm630: 0, nm660: 0, nm810: 0, nm850: 0, nm930: 0, nm950: 0},
      nnemf:{
        emfe: `${emfe.current}${emfeReading.current}` || "Green",
        mag: `${mag.current}${magReading.current}` || "Green"
      },
      flickernsound:
      {
      flicker: flicker.current || 0,
      soundLevels: soundLevels.current || 0}
    }

    console.log(product)

    const insert = await insertProduct(product);

    if(insert.status === 200) {
      alert("product inserted in database!");
      handleClose();
    } else{
      alert("there was an error inserting the record in the database.")
    }
  }



/*   const handleClickOpen = () => {
    const passphrase = prompt("Please enter the password here");
    if(passphrase===null){
      return
    }
    if(passphrase!=="1xelA@fEr"){
      alert("you don't have access to this!")
      return
    }
    setOpen(true);
  }; */

  const handleClose = () => {
    navigate('/');
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={true}
        onClose={handleClose}
      >
        <AppBar sx={{ position: 'relative', background: dark ? 'black' : 'white', color: '#ED3838' }}>
          <Toolbar>
            <IconButton
              edge="start"
              sx={{color: '#ED3838'}}
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Product Details
            </Typography>
    
           <IconButton> 
           <Tooltip title="Save record"><div>  <SaveIcon sx={{color: '#ED3838'}} onClick={handleAdd}>
            </SaveIcon></div></Tooltip>
            </IconButton>
            
          </Toolbar>
        </AppBar>
        <FormControl>
        <FormLabel sx={{marginTop:'35px'}}>General Info</FormLabel>
        <FormGroup row>
        <FormGroup sx={{width: '15%'}}  column='column'>
        <h5>Product Name</h5>
        <TextField required onChange={(e)=>{productName.current = e.target.value}} ></TextField>
        </FormGroup>

        <FormGroup sx={{width: '10%'}} column='column'>
             <h5>Product Company</h5>
             <Autocomplete
             freeSolo
            disablePortal
            id="companies"
           options={companies}
           onChange={(e, newValue)=>{company.current = newValue}}
           renderInput={(params) => <TextField {...params} label="Company" ></TextField>}
          />
          </FormGroup>

          <FormGroup sx={{width: '10%'}}  column='column'>
              <h5>Company Location</h5>
        <Autocomplete
             freeSolo
            disablePortal
            id="locations"
           options={locations}
           onChange={(e, newValue)=>{companyHq.current = newValue}}
           renderInput={(params) => <TextField {...params} label="Location" ></TextField>}
          />
          </FormGroup>
          <FormGroup sx={{width: '20%'}} column='column'>
              <h5>Warehouse</h5>
              <Autocomplete
             freeSolo
            id="warehouses"
            multiple
            onChange={(event, newValue) => {
              setWarehouse([...newValue]);
              console.log(newValue)
            }}
           options={locations}
           renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                variant="outlined"
                label={option}
                {...getTagProps({ index })}
              />
            ))
          }
           renderInput={(params) => <TextField {...params} label="Location"></TextField>}
          />
          </FormGroup>
          </FormGroup>
          <FormGroup row>
          <FormGroup sx={{width: '20%'}}  column='column'>
          <h5>Product Class</h5>
          <Autocomplete
             freeSolo
            disablePortal
            id="classes"
           options={classes}
           onChange={(e, newValue)=>{class_.current = newValue}}
           renderInput={(params) => <TextField {...params} label="Class" ></TextField>}
          />
          </FormGroup>
          <FormGroup sx={{width: '10%'}}  column='column'>
          <h5>Year Released</h5>
          <Autocomplete 
          freeSolo
          disablePortal
          id="years"
          options={years}
          onChange={(e, newValue)=>{yearReleased1.current = newValue}} 
          renderInput={(params) => <TextField {...params} label="Year"></TextField>}
          />
          </FormGroup>
          <FormGroup column='column'>
          <h5>Discount Code</h5>
        <TextField required onChange={(e)=>{discountCode.current = e.target.value}}  ></TextField>
          </FormGroup>

          <FormGroup column='column'>
          <h5>Product Link</h5>
        <TextField required onChange={(e)=>{productLink.current = e.target.value}}  ></TextField>
          </FormGroup>

          <FormGroup column='column'>
          <h5>Youtube Review</h5>
        <TextField required onChange={(e)=>{youtubeReview.current = e.target.value}}  ></TextField>
          </FormGroup>


        </FormGroup>
        <FormLabel sx={{marginTop:'35px'}}>Cost and Dimensions</FormLabel>
        <FormGroup row>
        <FormGroup column='column'>
          <h5>Disounted Price (USD)</h5>
        <TextField required type="number" onChange={(e)=>{discountedPrice.current = e.target.value}}  ></TextField>
        </FormGroup>
        <FormGroup column='column'>
          <h5>Shipping U.S</h5>
          <TextField required type="number" onChange={(e)=>{shippingUsa.current = e.target.value}}  ></TextField>
        </FormGroup>
        <FormGroup column='column'>
          <h5>Shipping Intl</h5>
          <TextField required type="number" onChange={(e)=>{shippingIntl.current = e.target.value}}  ></TextField>
        </FormGroup>
        <FormGroup column='column'>
          <h5> $ Per Led</h5>
        <TextField required type="number" onChange={(e)=>{discountedPerLed.current = e.target.value}}  ></TextField>
        </FormGroup>
        <FormGroup column='column'>
          <h5>$ Per Output</h5>
        <TextField required type="number" onChange={(e)=>{discountedPerOutput.current = e.target.value}}  ></TextField>
        </FormGroup>
        <FormGroup column='column'>
          <h5>Height (inches)</h5>
        <TextField required type="number" onChange={(e)=>{height.current = e.target.value}}  ></TextField>
        </FormGroup>        
        <FormGroup column='column'>
        <h5>Width (inches)</h5>
        <TextField required type="number" onChange={(e)=>{width.current = e.target.value}}  ></TextField>
        </FormGroup>        
        <FormGroup column='column'>
        <h5>Weight (lb)</h5>
        <TextField required type="number" onChange={(e)=>{weight.current = e.target.value}}  ></TextField>
        </FormGroup>        
        </FormGroup>

        <FormLabel sx={{marginTop:'35px'}}>Features and Warranty</FormLabel>
        <FormGroup row>
        <FormGroup sx={{width: '10%'}} column='column'>
        <h5>Pulsing</h5>
        <Select required onChange={(e)=>{pulsing.current = e.target.value}}  >
          <MenuItem value={1}>Yes</MenuItem>
          <MenuItem value={0}>No</MenuItem>
        </Select>
        </FormGroup>        
        <FormGroup sx={{width: '10%'}} column='column'>
        <h5>Modular Support</h5>
        <Select required onChange={(e)=>{modularSupport.current = e.target.value}}  >
          <MenuItem value={1}>Yes</MenuItem>
          <MenuItem value={0}>No</MenuItem>
        </Select>
        </FormGroup>        
        <FormGroup sx={{width: '10%'}} column='column'>
        <h5>Stands Included</h5>
        <Select required onChange={(e)=>{stands.current = e.target.value}}  >
          <MenuItem value={1}>Yes</MenuItem>
          <MenuItem value={0}>No</MenuItem>
        </Select>
        </FormGroup>        
        <FormGroup sx={{width: '10%'}} column='column'>
        <h5>Inbuilt Timer</h5>
        <Select required onChange={(e)=>{inbuiltTimer.current = e.target.value}}  >
          <MenuItem value={1}>Yes</MenuItem>
          <MenuItem value={0}>No</MenuItem>
        </Select>
        </FormGroup>        
        <FormGroup column='column'>
        <h5>Warranty (years)</h5>
        <TextField required type="number" onChange={(e)=>{warranty1.current = e.target.value}}  ></TextField>
        </FormGroup>        
        </FormGroup>

        <FormLabel sx={{marginTop:'35px'}}>Power </FormLabel>
        <FormGroup row>
        <FormGroup column='column'>
        <h5>Number of LEDs</h5>
        <TextField required type="number" onChange={(e)=>{leds1.current = e.target.value}}  ></TextField>
        </FormGroup>        
        <FormGroup column='column'>
        <h5>LED Multi Chip</h5>
        <Select required onChange={(e)=>{ledDualChip.current = e.target.value}}  >
          <MenuItem value={1}>Yes</MenuItem>
          <MenuItem value={0}>No</MenuItem>
        </Select>
        </FormGroup>
        <FormGroup column='column'>
        <h5>Total Power Output (W)</h5>
        <TextField required type="number" onChange={(e)=>{totalPowerOutput.current = e.target.value}}  ></TextField>
        </FormGroup>
        <FormGroup column='column'>
        <h5>Average Combined Power (W)</h5>
        <TextField required type="number" onChange={(e)=>{avCombinedPower.current = e.target.value}}  ></TextField>
        </FormGroup>     
        <FormGroup column='column'>
        <h5>Peak Power (W)</h5>
        <TextField required type="number" onChange={(e)=>{peakPower.current = e.target.value}}  ></TextField>
        </FormGroup>  
        <FormGroup sx={{width: '15%'}} column='column'>
        <h5>Alex Tested</h5>
        <Select required onChange={(e)=>{alexTested.current = e.target.value}}  >
          <MenuItem value={1}>Yes</MenuItem>
          <MenuItem value={0}>No</MenuItem>
        </Select>
        </FormGroup>   
        </FormGroup>

        <FormLabel sx={{marginTop:'35px'}}>Number of LEDs emitting wavelengths </FormLabel>
        <FormGroup row>
        <FormGroup column='column'>
        <h5>480</h5>
        <TextField required type="number" onChange={(e)=>{wavelengths1.current = {...wavelengths1.current,nm480: e.target.value}}}  ></TextField>
        </FormGroup>     
        <FormGroup column='column'>
        <h5>610</h5>
        <TextField required type="number" onChange={(e)=>{wavelengths1.current = {...wavelengths1.current,nm610:e.target.value}}}  ></TextField>
        </FormGroup>     
        <FormGroup column='column'>
        <h5>630</h5>
        <TextField required type="number" onChange={(e)=>{wavelengths1.current = {...wavelengths1.current,nm630:e.target.value}}}  ></TextField>
        </FormGroup>     
        <FormGroup column='column'>
        <h5>660</h5>
        <TextField required type="number" onChange={(e)=>{wavelengths1.current = {...wavelengths1.current,nm660:e.target.value}}}  ></TextField>
        </FormGroup>     
        <FormGroup column='column'>
        <h5>810</h5>
        <TextField required type="number" onChange={(e)=>{wavelengths1.current = {...wavelengths1.current,nm810:e.target.value}}} ></TextField>
        </FormGroup>     
        <FormGroup column='column'>
        <h5>830</h5>
        <TextField required type="number" onChange={(e)=>{wavelengths1.current = {...wavelengths1.current,nm830:e.target.value}}} ></TextField>
        </FormGroup>     
        <FormGroup column='column'>
        <h5>850</h5>
        <TextField required type="number" onChange={(e)=>{wavelengths1.current = {...wavelengths1.current,nm850:e.target.value}}} ></TextField>
        </FormGroup>     
        <FormGroup column='column'>
        <h5>930</h5>
        <TextField required type="number" onChange={(e)=>{wavelengths1.current = {...wavelengths1.current,nm930:e.target.value}}} ></TextField>
        </FormGroup>     
        <FormGroup column='column'>
        <h5>950</h5>
        <TextField required type="number" onChange={(e)=>{wavelengths1.current = {...wavelengths1.current,nm950:e.target.value}}} ></TextField>
        </FormGroup>       
        </FormGroup>

        <FormLabel sx={{marginTop:'35px'}}>nnEMF</FormLabel>
        <FormGroup row>
        <FormGroup column='column'>
        <h5>EMF - Electric Field (color and reading) </h5>
        <Select required onChange={(e)=>{emfe.current = e.target.value}}  >
          <MenuItem value={"Green"}>Green</MenuItem>
          <MenuItem value={"Orange"}>Orange</MenuItem>
          <MenuItem value={"Yellow"}>Yellow</MenuItem>
        </Select>
        <TextField type="number" label="Electric Field Reading" onChange={(e)=>{emfeReading.current = e.target.value}} required ></TextField>
        </FormGroup>
        <FormGroup column='column'>
        <h5>EMF - Magnetic Field (color and reading)</h5>
        <Select required onChange={(e)=>{mag.current = e.target.value}}  >
          <MenuItem value={"Green"}>Green</MenuItem>
          <MenuItem value={"Orange"}>Orange</MenuItem>
          <MenuItem value={"Yellow"}>Yellow</MenuItem>
        </Select>
        <TextField type="number" label="Magnetic Field Reading" onChange={(e)=>{magReading.current = e.target.value}} required ></TextField>
        </FormGroup>
        </FormGroup>

        <FormLabel sx={{marginTop:'35px'}}>Flicker and Sound</FormLabel>
        <FormGroup row>
        <FormGroup sx={{width: '10%'}} column='column'>
        <h5>Flicker</h5>
        <Select required onChange={(e)=>{flicker.current = e.target.value}}  >
          <MenuItem value={1}>Yes</MenuItem>
          <MenuItem value={0}>No</MenuItem>
        </Select>
        </FormGroup>
        <FormGroup column='column'>
        <h5>Sound Levels (dB)</h5>
        <TextField required type="number" onChange={(e)=>{soundLevels.current = e.target.value}}  ></TextField>
        </FormGroup>
        </FormGroup>
        </FormControl>
      </Dialog>
    </div>
  );
}


export default memo(EPModal);
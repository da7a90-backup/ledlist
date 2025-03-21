import {useRef, memo, useState} from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import { FormControl, FormGroup, FormLabel, TextField, Tooltip } from '@mui/material';
import { PlusOneOutlined, Delete } from '@mui/icons-material';
import { updateRecord, deleteRecord } from './services/Data';
import { useLocation, useNavigate } from 'react-router-dom';
import { Autocomplete } from '@mui/material';
import { Chip } from '@mui/material';
import { Select } from '@mui/material';
import { MenuItem } from '@mui/material';
import {CircularProgress} from '@mui/material';



 const Modal = ({dark}) => {

  const [updateLoading, setUpdateLoading] = useState(false); 
  const navigate = useNavigate();
  const {state} = useLocation();
  const { _id, info, cost, shipping, value, yearReleased, leds, features, size, warranty, flickernsound, wavelengths, nnemf} = state.object;
  console.log(state.object)
  const allData = state.allData;
  const companies = [...new Set(allData.map((object)=>object.info.company))]
  const allWarehouses = allData.map((object)=>object.info.warehouse)
  const warehousesData = []
  for(let warehouseEntry of allWarehouses){
    warehousesData.push(...warehouseEntry)
  }
  const warehouses = [...new Set(warehousesData)]
  const locations = [...new Set(allData.map((object)=>object.info.companyHq))]
  const classes = [...new Set(allData.map((object)=>object.info.class))]

  const productName = useRef(info.productName) 

  const company = useRef(info.company) 
  const class_  = useRef(info.class)
  const discontinued = useRef(info.discontinued)
  const companyHq = useRef(info.companyHq)
  const [warehouse, setWarehouse] = useState(info.warehouse)
  const yearReleased1 = useRef(yearReleased)
  const discountCode = useRef(info.discountCode)
  const alexTested = useRef(info.alexTested)
  const productLink = useRef(info.productLink)
  const youtubeReview = useRef(info.youtubeReview)
  const discountedPrice = useRef(cost)
  const shippingUsa = useRef(shipping.shippingUsa)
  const shippingIntl = useRef(shipping.shippingIntl)
  const discountedPerLed = useRef(value.discountedPerLed)
  const discountedPerOutput = useRef(value.discountedPerOutput)
  const height = useRef(size.height)
  const width = useRef(size.width)
  const weight= useRef(size.weight)
  const pulsing = useRef(features.pulsing)
  const modularSupport = useRef(features.modularSupport)
  const inbuiltTimer = useRef(features.inbuiltTimer)
  const stands = useRef(features.stands)
  const warranty1 = useRef(warranty.warranty)
  const leds1 = useRef(leds.leds)
  const ledDualChip = useRef(leds.ledDualChip)
  const totalPowerOutput = useRef(leds.totalPowerOutput)
  const avCombinedPower = useRef(leds.avCombinedPower)
  const peakPower = useRef(leds.peakPower)
  const wavelengths1 = useRef(wavelengths)
  const peakWavelengthsTested = useRef(info.peakWavelengthsTested)
  const emfe= useRef(nnemf.emfe.replace(/\d+|^\s+|\s+$|\./g,''))
  const emfeReading = useRef(nnemf.emfe.match(/[+-]?\d+(\.\d+)?/g) ? nnemf.emfe.match(/[+-]?\d+(\.\d+)?/g)[0] : "")
  const mag = useRef(nnemf.mag.replace(/\d+|^\s+|\s+$|\./g,''))
  const magReading = useRef(nnemf.mag.match(/[+-]?\d+(\.\d+)?/g) ? nnemf.mag.match(/[+-]?\d+(\.\d+)?/g)[0] : "")
  const flicker = useRef(flickernsound.flicker)
  const soundLevels = useRef(flickernsound.soundLevels)


  const [edit, setEdit] = useState(true);

  const currentYear = (new Date()).getFullYear();
const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));
const years = range(currentYear, currentYear - 50, -1); 
// [2019, 2018, 2017, 2016, ..., 1969]


  const handleEdit = () => {
    setEdit(!edit);
  };

  const handleDeleteRecord = async () => {
    const sure = window.confirm("Are you sure you want to delete this product?");
    if(sure){
    const deleteRec = await deleteRecord(_id);
    
    if(deleteRec.status === 200) {
      alert("Product edited successfully!");
      handleClose();
    
    } else{
      alert("there was an error editing the record in the database.")
    }
    }
  }

  const handleEditRecord = async () => {

    setUpdateLoading(true);
    const product = {
      info:{productName: productName.current,
      discontinued: discontinued.current,
      company: company.current,
      class: class_.current,
      companyHq: companyHq.current,
      warehouse: warehouse.join("\n"),
      discountCode: discountCode.current,
      productLink: productLink.current,
      alexTested: alexTested.current,
      youtubeReview: youtubeReview.current,
      peakWavelengthsTested: peakWavelengthsTested.current},
      cost:{
      discountedPrice: discountedPrice.current,
      shippingUsa: shippingUsa.current,
      shippingIntl: shippingIntl.current,
      discountedPerLed: discountedPerLed.current,
      discountedPerOutput: discountedPerOutput.current,
      },
      yearReleased: yearReleased1.current,
      size:
      { 
      height: height.current,
      width: width.current,
      weight: weight.current
      },
      features:{
      pulsing: pulsing.current,
      modularSupport: modularSupport.current,
      inbuiltTimer: inbuiltTimer.current,
      stands: stands.current
      },
      warranty: 
      {
        warranty: warranty1.current
      },
      leds:
      {
      leds: leds1.current,
      ledDualChip: ledDualChip.current,
      totalPowerOutput: totalPowerOutput.current,
      avCombinedPower: avCombinedPower.current,
      peakPower: peakPower.current
      },
      wavelengths: wavelengths1.current,
      nnemf:{
      emfe: `${emfe.current}${emfeReading.current || ''}`,
      mag: `${mag.current}${magReading.current || ''}`
      },
      flickernsound:
      {
      flicker: flicker.current,
      soundLevels: soundLevels.current}
    }

    const insert = await updateRecord(product, _id);

    if(insert.status === 200) {
      alert("product edited successfully!");
      setUpdateLoading(false);
      handleClose();
    } else{
      alert("there was an error editing the record in the database.")
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
    window.location.reload();
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
              color="primary"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon style={{color: '#ED3838'}} />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Product Details
            </Typography>
            <IconButton>
            <Tooltip title="Delete record"><div> <Delete onClick={handleDeleteRecord} style={{color: '#ED3838'}}></Delete></div></Tooltip>
            </IconButton>
             <IconButton sx={{marginRight: '35px'}}> 
              <Tooltip title="Edit fields"><div><EditIcon onClick={handleEdit} style={{color: '#ED3838'}}>  
            </EditIcon></div></Tooltip>
            </IconButton>
            <IconButton> 
            <Tooltip title="Save edits"><div> <SaveIcon style={{color: '#ED3838'}} onClick={handleEditRecord}>
            </SaveIcon></div></Tooltip>
            </IconButton>

            <IconButton> 
            <Tooltip title="New record"><div> <PlusOneOutlined onClick={()=>navigate('/new',{state: {dark: dark, classes: classes, companies: companies, locations: locations}})} style={{color: '#ED3838'}}>  
            </PlusOneOutlined></div></Tooltip>
            </IconButton>
            
          </Toolbar>
        </AppBar>
        {updateLoading ? <CircularProgress></CircularProgress> : 
           <FormControl>
           <FormLabel sx={{marginTop:'35px'}}>General Info</FormLabel>
           <FormGroup row>
           <FormGroup sx={{width: '15%'}}  column='column'>
           <h5>Product Name</h5>
           <TextField required defaultValue={info.productName} onChange={(e)=>{productName.current = e.target.value}} disabled={edit}></TextField>
           </FormGroup>
   
<FormGroup sx={{width: '10%'}} column='column'>
  <h5>Product Company</h5>
  <Autocomplete
    freeSolo
    disablePortal
    id="companies"
    options={companies}
    defaultValue={info.company}
    onInputChange={(event, newInputValue) => {
      company.current = newInputValue || info.company;
    }}
    onChange={(event, newValue) => {
      company.current = newValue || info.company;
    }}
    renderInput={(params) => (
      <TextField 
        {...params}
        label="Company"
        defaultValue={info.company}
        disabled={edit}
      />
    )}
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
              renderInput={(params) => <TextField {...params} label={info.companyHq} defaultValue={info.companyHq} disabled={edit}></TextField>}
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
               }}
               defaultValue={[...warehouse]}
              options={warehouses}
              renderTags={(value, getTagProps) =>
               value.map((option, index) => (
                 <Chip
                   variant="outlined"
                   label={option}
                   {...getTagProps({ index })}
                 />
               ))
             }
              renderInput={(params) => <TextField {...params} label="Location" disabled={edit}></TextField>}
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
              renderInput={(params) => <TextField {...params} label={info.class} defaultValue={info.class} disabled={edit}></TextField>}
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
             renderInput={(params) => <TextField {...params} label={yearReleased1.current} defaultValue={yearReleased} disabled={edit}></TextField>}
             />
             </FormGroup>
             <FormGroup column='column'>
             <h5>Discount Code</h5>
           <TextField required defaultValue={info.discountCode} onChange={(e)=>{discountCode.current = e.target.value}} disabled={edit}></TextField>
             </FormGroup>
   
             <FormGroup column='column'>
             <h5>Product Link</h5>
           <TextField required defaultValue={info.productLink} onChange={(e)=>{productLink.current = e.target.value}} disabled={edit}></TextField>
             </FormGroup>
   
             <FormGroup column='column'>
             <h5>Youtube Review</h5>
           <TextField required defaultValue={info.youtubeReview} onChange={(e)=>{youtubeReview.current = e.target.value}} disabled={edit}></TextField>
             </FormGroup>
             <FormGroup sx={{width: '10%'}} column='column'>
           <h5>Still available</h5>
           <Select required defaultValue={info.discontinued} onChange={(e)=>{discontinued.current = e.target.value}} disabled={edit}>
             <MenuItem value={1}>Yes</MenuItem>
             <MenuItem value={0}>No</MenuItem>
           </Select>
           </FormGroup>  
   
           </FormGroup>
           <FormLabel sx={{marginTop:'35px'}}>Cost and Dimensions</FormLabel>
           <FormGroup row>
           <FormGroup column='column'>
             <h5>Disounted Price (USD)</h5>
           <TextField required type="number" defaultValue={cost} onChange={(e)=>{discountedPrice.current = e.target.value}} disabled={edit}></TextField>
           </FormGroup>
           <FormGroup column='column'>
             <h5>Shipping U.S</h5>
             <TextField required type="number" defaultValue={shipping.shippingUsa} onChange={(e)=>{shippingUsa.current = e.target.value}} disabled={edit}></TextField>
           </FormGroup>
           <FormGroup column='column'>
             <h5>Shipping Intl</h5>
             <TextField required type="number" defaultValue={shipping.shippingIntl} onChange={(e)=>{shippingIntl.current = e.target.value}} disabled={edit}></TextField>
           </FormGroup>
           <FormGroup column='column'>
             <h5> $ Per Led</h5>
           <TextField required type="number" defaultValue={value.discountedPerLed} onChange={(e)=>{discountedPerLed.current = e.target.value}} disabled={edit}></TextField>
           </FormGroup>
           <FormGroup column='column'>
             <h5>$ Per Output</h5>
           <TextField required type="number" defaultValue={value.discountedPerOutput} onChange={(e)=>{discountedPerOutput.current = e.target.value}} disabled={edit}></TextField>
           </FormGroup>
           <FormGroup column='column'>
             <h5>Height (inches)</h5>
           <TextField required type="number" defaultValue={size.height} onChange={(e)=>{height.current = e.target.value}} disabled={edit}></TextField>
           </FormGroup>        
           <FormGroup column='column'>
           <h5>Width (inches)</h5>
           <TextField required type="number" defaultValue={size.width} onChange={(e)=>{width.current = e.target.value}} disabled={edit}></TextField>
           </FormGroup>        
           <FormGroup column='column'>
           <h5>Weight (lb)</h5>
           <TextField required type="number" defaultValue={size.weight} onChange={(e)=>{weight.current = e.target.value}} disabled={edit}></TextField>
           </FormGroup>        
           </FormGroup>
   
           <FormLabel sx={{marginTop:'35px'}}>Features and Warranty</FormLabel>
           <FormGroup row>
           <FormGroup sx={{width: '10%'}} column='column'>
           <h5>Pulsing</h5>
           <Select required defaultValue={features.pulsing} onChange={(e)=>{pulsing.current = e.target.value}} disabled={edit}>
             <MenuItem value={1}>Yes</MenuItem>
             <MenuItem value={0}>No</MenuItem>
           </Select>
           </FormGroup>        
           <FormGroup sx={{width: '10%'}} column='column'>
           <h5>Modular Support</h5>
           <Select required defaultValue={features.modularSupport} onChange={(e)=>{modularSupport.current = e.target.value}} disabled={edit}>
             <MenuItem value={1}>Yes</MenuItem>
             <MenuItem value={0}>No</MenuItem>
           </Select>
           </FormGroup>        
           <FormGroup sx={{width: '10%'}} column='column'>
           <h5>Stands Included</h5>
           <Select required defaultValue={features.stands} onChange={(e)=>{stands.current = e.target.value}} disabled={edit}>
             <MenuItem value={1}>Yes</MenuItem>
             <MenuItem value={0}>No</MenuItem>
           </Select>
           </FormGroup>        
           <FormGroup sx={{width: '10%'}} column='column'>
           <h5>Inbuilt Timer</h5>
           <Select required defaultValue={features.inbuiltTimer} onChange={(e)=>{inbuiltTimer.current = e.target.value}} disabled={edit}>
             <MenuItem value={1}>Yes</MenuItem>
             <MenuItem value={0}>No</MenuItem>
           </Select>
           </FormGroup>        
           <FormGroup column='column'>
           <h5>Warranty (years)</h5>
           <TextField required type="number" defaultValue={warranty.warranty} onChange={(e)=>{warranty1.current = e.target.value}} disabled={edit}></TextField>
           </FormGroup>        
           </FormGroup>
   
           <FormLabel sx={{marginTop:'35px'}}>Power </FormLabel>
           <FormGroup row>
           <FormGroup column='column'>
           <h5>Number of LED Chips</h5>
           <TextField required type="number" defaultValue={leds.leds} onChange={(e)=>{leds1.current = e.target.value}} disabled={edit}></TextField>
           </FormGroup>        
           <FormGroup column='column'>
           <h5>LED Multi Chip</h5>
           <Select required defaultValue={leds.ledDualChip} onChange={(e)=>{ledDualChip.current = e.target.value}} disabled={edit}>
             <MenuItem value={1}>Yes</MenuItem>
             <MenuItem value={0}>No</MenuItem>
           </Select>
           </FormGroup>
           <FormGroup column='column'>
           <h5>Total Power Output (W)</h5>
           <TextField required type="number" defaultValue={leds.totalPowerOutput} onChange={(e)=>{totalPowerOutput.current = e.target.value}} disabled={edit}></TextField>
           </FormGroup>
           <FormGroup column='column'>
           <h5>Average Combined Power (W)</h5>
           <TextField required type="number" defaultValue={leds.avCombinedPower} onChange={(e)=>{avCombinedPower.current = e.target.value}} disabled={edit}></TextField>
           </FormGroup>     
           <FormGroup column='column'>
           <h5>Peak Power (W)</h5>
           <TextField required type="number" defaultValue={leds.peakPower} onChange={(e)=>{peakPower.current = e.target.value}} disabled={edit}></TextField>
           </FormGroup>  
           <FormGroup sx={{width: '15%'}} column='column'>
           <h5>Alex Tested</h5>
           <Select required defaultValue={info.alexTested} onChange={(e)=>{alexTested.current = e.target.value}} disabled={edit}>
             <MenuItem value={1}>Yes</MenuItem>
             <MenuItem value={0}>No</MenuItem>
           </Select>
           </FormGroup>   
           </FormGroup>
   
           <FormLabel sx={{marginTop:'35px'}}>Number of LEDs emitting wavelengths </FormLabel>
           <FormGroup row>
           <FormGroup column='column'>
           <h5>415</h5>
           <TextField required type="number" defaultValue={wavelengths['nm415']} onChange={(e)=>{wavelengths1.current = {...wavelengths1.current,nm415: e.target.value}}} disabled={edit}></TextField>
           </FormGroup>
           <FormGroup column='column'>
           <h5>480</h5>
           <TextField required type="number" defaultValue={wavelengths['nm480']} onChange={(e)=>{wavelengths1.current = {...wavelengths1.current,nm480: e.target.value}}} disabled={edit}></TextField>
           </FormGroup> 
           <FormGroup column='column'>
           <h5>590</h5>
           <TextField required type="number" defaultValue={wavelengths['nm590']} onChange={(e)=>{wavelengths1.current = {...wavelengths1.current,nm590: e.target.value}}} disabled={edit}></TextField>
           </FormGroup>     
           <FormGroup column='column'>
           <h5>610</h5>
           <TextField required type="number" defaultValue={wavelengths['nm610']} onChange={(e)=>{wavelengths1.current = {...wavelengths1.current,nm610:e.target.value}}} disabled={edit}></TextField>
           </FormGroup>     
           <FormGroup column='column'>
           <h5>630</h5>
           <TextField required type="number" defaultValue={wavelengths['nm630']} onChange={(e)=>{wavelengths1.current = {...wavelengths1.current,nm630:e.target.value}}} disabled={edit}></TextField>
           </FormGroup>     
           <FormGroup column='column'>
           <h5>660</h5>
           <TextField required type="number" defaultValue={wavelengths['nm660']} onChange={(e)=>{wavelengths1.current = {...wavelengths1.current,nm660:e.target.value}}} disabled={edit}></TextField>
           </FormGroup>     
           <FormGroup column='column'>
           <h5>810</h5>
           <TextField required type="number" defaultValue={wavelengths['nm810']} onChange={(e)=>{wavelengths1.current = {...wavelengths1.current,nm810:e.target.value}}}disabled={edit}></TextField>
           </FormGroup>     
           <FormGroup column='column'>
           <h5>830</h5>
           <TextField required type="number" defaultValue={wavelengths['nm830']} onChange={(e)=>{wavelengths1.current = {...wavelengths1.current,nm830:e.target.value}}}disabled={edit}></TextField>
           </FormGroup>     
           <FormGroup column='column'>
           <h5>850</h5>
           <TextField required type="number" defaultValue={wavelengths['nm850']} onChange={(e)=>{wavelengths1.current = {...wavelengths1.current,nm850:e.target.value}}}disabled={edit}></TextField>
           </FormGroup>     
           <FormGroup column='column'>
           <h5>930</h5>
           <TextField required type="number" defaultValue={wavelengths['nm930']} onChange={(e)=>{wavelengths1.current = {...wavelengths1.current,nm930:e.target.value}}}disabled={edit}></TextField>
           </FormGroup>     
           <FormGroup column='column'>
           <h5>950</h5>
           <TextField required type="number" defaultValue={wavelengths['nm950']} onChange={(e)=>{wavelengths1.current = {...wavelengths1.current,nm950:e.target.value}}}disabled={edit}></TextField>
           </FormGroup>  
           <FormGroup column='column'>
           <h5>1060</h5>
           <TextField required type="number" defaultValue={wavelengths['nm1060']} onChange={(e)=>{wavelengths1.current = {...wavelengths1.current,nm1060:e.target.value}}}disabled={edit}></TextField>
           </FormGroup>       
           </FormGroup>
   
           <FormLabel sx={{marginTop:'35px'}}>nnEMF</FormLabel>
           <FormGroup row>
           <FormGroup column='column'>
           <h5>EMF - Electric Field (color and reading) </h5>
           <Select required defaultValue={emfe.current} onChange={(e)=>{emfe.current = e.target.value}} disabled={edit}>
             <MenuItem value={"Green"}>Green</MenuItem>
             <MenuItem value={"Orange"}>Orange</MenuItem>
             <MenuItem value={"Red"}>Red</MenuItem>
           </Select>
           <TextField type="number" label="Electric Field Reading" onChange={(e)=>{emfeReading.current = e.target.value}} required defaultValue={emfeReading.current} disabled={edit}></TextField>
           </FormGroup>
           <FormGroup column='column'>
           <h5>EMF - Magnetic Field (color and reading)</h5>
           <Select required defaultValue={mag.current} onChange={(e)=>{mag.current = e.target.value}} disabled={edit}>
             <MenuItem value={"Green"}>Green</MenuItem>
             <MenuItem value={"Orange"}>Orange</MenuItem>
             <MenuItem value={"Red"}>Red</MenuItem>
           </Select>
           <TextField type="number" label="Magnetic Field Reading" onChange={(e)=>{magReading.current = e.target.value}} required defaultValue={magReading.current} disabled={edit}></TextField>
           </FormGroup>
           </FormGroup>
   
           <FormLabel sx={{marginTop:'35px'}}>Flicker and Sound</FormLabel>
           <FormGroup row>
           <FormGroup sx={{width: '10%'}} column='column'>
           <h5>Flicker</h5>
           <Select required defaultValue={flickernsound.flicker} onChange={(e)=>{flicker.current = e.target.value}} disabled={edit}>
             <MenuItem value={1}>Yes</MenuItem>
             <MenuItem value={0}>No</MenuItem>
           </Select>
           </FormGroup>
           <FormGroup column='column'>
           <h5>Sound Levels (dB)</h5>
           <TextField required type="number" defaultValue={flickernsound.soundLevels} onChange={(e)=>{soundLevels.current = e.target.value}} disabled={edit}></TextField>
           </FormGroup>
           </FormGroup>
           </FormControl>
        }
     
      </Dialog>
    </div>
  );
}


export default memo(Modal);
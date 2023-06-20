import {useRef, memo, useState} from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import { FormControl, FormGroup, FormLabel, TextField } from '@mui/material';
import { PlusOneOutlined, Delete } from '@mui/icons-material';
import { insertProduct, updateRecord, deleteRecord } from './services/Data';
import { useLocation, useNavigate } from 'react-router-dom';



 const Modal = ({}) => {

  const navigate = useNavigate();
  const {state} = useLocation();
  const { _id, info, cost, shipping, value, yearReleased, leds, features, size, warranty, flickernsound, wavelengths, nnemf} = state;
  console.log(info.productName);
  const productName = useRef(info.productName) 
  console.log(productName);

  const company = useRef(info.company) 
  const class_  = useRef(info.class)
  const companyHq = useRef(info.companyHq)
  const warehouse = useRef(info.warehouse.join('\n'))
  const yearReleased1 = useRef(yearReleased)
  const discountCode = useRef(info.discountCode)
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
  const emfe= useRef(nnemf.emfe)
  const mag = useRef(nnemf.mag)
  const flicker = useRef(flickernsound.flicker)
  const soundLevels = useRef(flickernsound.soundLevels)

  const [edit, setEdit] = useState(true);


  const handleEdit = () => {
    setEdit(!edit);
  };

  const handleAdd = async () => {
    const product = {
      info:{productName: productName.current,
      company: company.current,
      class: class_.current,
      companyHq: companyHq.current,
      warehouse: warehouse.current,
      discountCode: discountCode.current,
      productLink: productLink.current,
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
      emfe: emfe.current,
      mag: mag.current
      },
      flickernsound:
      {
      flicker: flicker.current,
      soundLevels: soundLevels.current}
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

  const handleDeleteRecord = async () => {
    const deleteRec = await deleteRecord(_id);

    if(deleteRec.status === 200) {
      alert("product edited successfully!");
      handleClose();
    } else{
      alert("there was an error editing the record in the database.")
    }

  }

  const handleEditRecord = async () => {

    const product = {
      info:{productName: productName.current,
      company: company.current,
      class: class_.current,
      companyHq: companyHq.current,
      warehouse: warehouse.current,
      discountCode: discountCode.current,
      productLink: productLink.current,
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
      emfe: emfe.current,
      mag: mag.current
      },
      flickernsound:
      {
      flicker: flicker.current,
      soundLevels: soundLevels.current}
    }
    const insert = await updateRecord(product, _id);

    if(insert.status === 200) {
      alert("product edited successfully!");
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
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={true}
        onClose={handleClose}
      >
        <AppBar sx={{ position: 'relative', background: 'white', color: '#2c6fbb' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="primary"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Product Details
            </Typography>
            <IconButton>
              <Delete onClick={handleDeleteRecord} color='primary'></Delete>
            </IconButton>
            <IconButton sx={{marginRight: '35px'}}> 
            <EditIcon onClick={handleEdit} color="primary">  
            </EditIcon>
            </IconButton>
           <IconButton> 
            <SaveIcon color="primary" onClick={handleEditRecord}>
            </SaveIcon>
            </IconButton>

            <IconButton> 
            <PlusOneOutlined onClick={handleAdd} color="primary">  
            </PlusOneOutlined>
            </IconButton>
            
          </Toolbar>
        </AppBar>
        <FormControl>
        <FormLabel>General Info</FormLabel>
        <FormGroup row>
        <FormGroup column='column'>
        <h5>Product Name</h5>
        <TextField defaultValue={info.productName} onChange={(e)=>{productName.current = e.target.value}} disabled={edit}></TextField>
        </FormGroup>

        <FormGroup column='column'>
             <h5>Product Company</h5>
        <TextField defaultValue={info.company} onChange={(e)=>{company.current = e.target.value}} disabled={edit}></TextField>
          </FormGroup>

          <FormGroup column='column'>
              <h5>Company Location</h5>
        <TextField defaultValue={info.companyHq} onChange={(e)=>{companyHq.current = e.target.value}} disabled={edit}></TextField>
          </FormGroup>
          <FormGroup column='column'>
              <h5>Company Warehouse (if multiple separate by carriage return)</h5>
        <TextField multiline={true} defaultValue={info.warehouse.join('\n')} onChange={(e)=>{warehouse.current = e.target.value}} disabled={edit}></TextField>
          </FormGroup>
          <FormGroup column='column'>
          <h5>Product Class</h5>
        <TextField defaultValue={info.class} onChange={(e)=>{class_.current = e.target.value}} disabled={edit}></TextField>
          </FormGroup>
          <FormGroup column='column'>
          <h5>Year Released</h5>
        <TextField defaultValue={yearReleased} onChange={(e)=>{yearReleased1.current = e.target.value}} disabled={edit}></TextField>
          </FormGroup>
          <FormGroup column='column'>
          <h5>Discount Code</h5>
        <TextField defaultValue={info.discountCode} onChange={(e)=>{discountCode.current = e.target.value}} disabled={edit}></TextField>
          </FormGroup>

          <FormGroup column='column'>
          <h5>Product Link</h5>
        <TextField defaultValue={info.productLink} onChange={(e)=>{productLink.current = e.target.value}} disabled={edit}></TextField>
          </FormGroup>

          <FormGroup column='column'>
          <h5>Youtube Review</h5>
        <TextField defaultValue={info.youtubeReview} onChange={(e)=>{youtubeReview.current = e.target.value}} disabled={edit}></TextField>
          </FormGroup>


        </FormGroup>
        <FormLabel>Cost and Dimensions</FormLabel>
        <FormGroup row>
        <FormGroup column='column'>
          <h5>Disounted Price</h5>
        <TextField defaultValue={cost} onChange={(e)=>{discountedPrice.current = e.target.value}} disabled={edit}></TextField>
        </FormGroup>
        <FormGroup column='column'>
          <h5>Shipping U.S</h5>
          <TextField defaultValue={shipping.shippingUsa} onChange={(e)=>{shippingUsa.current = e.target.value}} disabled={edit}></TextField>
        </FormGroup>
        <FormGroup column='column'>
          <h5>Shipping Intl</h5>
          <TextField defaultValue={shipping.shippingIntl} onChange={(e)=>{shippingIntl.current = e.target.value}} disabled={edit}></TextField>
        </FormGroup>
        <FormGroup column='column'>
          <h5> Discounted Per Led</h5>
        <TextField defaultValue={value.discountedPerLed} onChange={(e)=>{discountedPerLed.current = e.target.value}} disabled={edit}></TextField>
        </FormGroup>
        <FormGroup column='column'>
          <h5>Discounted Per Output</h5>
        <TextField defaultValue={value.discountedPerOutput} onChange={(e)=>{discountedPerOutput.current = e.target.value}} disabled={edit}></TextField>
        </FormGroup>
        <FormGroup column='column'>
          <h5>Height</h5>
        <TextField defaultValue={size.height} onChange={(e)=>{height.current = e.target.value}} disabled={edit}></TextField>
        </FormGroup>        
        <FormGroup column='column'>
        <h5>Width</h5>
        <TextField defaultValue={size.width} onChange={(e)=>{width.current = e.target.value}} disabled={edit}></TextField>
        </FormGroup>        
        <FormGroup column='column'>
        <h5>Weight</h5>
        <TextField defaultValue={size.weight} onChange={(e)=>{weight.current = e.target.value}} disabled={edit}></TextField>
        </FormGroup>        
        </FormGroup>

        <FormLabel>Features and Warranty</FormLabel>
        <FormGroup row>
        <FormGroup column='column'>
        <h5>Pulsing</h5>
        <TextField defaultValue={features.pulsing} onChange={(e)=>{pulsing.current = e.target.value}} disabled={edit}></TextField>
        </FormGroup>        
        <FormGroup column='column'>
        <h5>Modular Support</h5>
        <TextField defaultValue={features.modularSupport} onChange={(e)=>{modularSupport.current = e.target.value}} disabled={edit}></TextField>
        </FormGroup>        
        <FormGroup column='column'>
        <h5>Stands</h5>
        <TextField defaultValue={features.stands} onChange={(e)=>{stands.current = e.target.value}} disabled={edit}></TextField>
        </FormGroup>        
        <FormGroup column='column'>
        <h5>Inbuilt Timer</h5>
        <TextField defaultValue={features.inbuiltTimer} onChange={(e)=>{inbuiltTimer.current = e.target.value}} disabled={edit}></TextField>
        </FormGroup>        
        <FormGroup column='column'>
        <h5>Warranty</h5>
        <TextField defaultValue={warranty.warranty} onChange={(e)=>{warranty1.current = e.target.value}} disabled={edit}></TextField>
        </FormGroup>        
        </FormGroup>

        <FormLabel>LEDS, Power and Wavelengths</FormLabel>
        <FormGroup row>
        <FormGroup column='column'>
        <h5>LEDs</h5>
        <TextField defaultValue={leds.leds} onChange={(e)=>{leds1.current = e.target.value}} disabled={edit}></TextField>
        </FormGroup>        
        <FormGroup column='column'>
        <h5>LED Dual Chip</h5>
        <TextField defaultValue={leds.ledDualChip} onChange={(e)=>{ledDualChip.current = e.target.value}} disabled={edit}></TextField>
        </FormGroup>
        <FormGroup column='column'>
        <h5>Total Power Output</h5>
        <TextField defaultValue={leds.totalPowerOutput} onChange={(e)=>{totalPowerOutput.current = e.target.value}} disabled={edit}></TextField>
        </FormGroup>
        <FormGroup column='column'>
        <h5>Average Combined Power</h5>
        <TextField defaultValue={leds.avCombinedPower} onChange={(e)=>{avCombinedPower.current = e.target.value}} disabled={edit}></TextField>
        </FormGroup>     
        <FormGroup column='column'>
        <h5>Peak Power</h5>
        <TextField defaultValue={leds.peakPower} onChange={(e)=>{peakPower.current = e.target.value}} disabled={edit}></TextField>
        </FormGroup>     
        <FormGroup column='column'>
        <h5>480</h5>
        <TextField defaultValue={wavelengths['nm480']} onChange={(e)=>{wavelengths1.current = {...wavelengths1.current,nm480: e.target.value}}} disabled={edit}></TextField>
        </FormGroup>     
        <FormGroup column='column'>
        <h5>610</h5>
        <TextField defaultValue={wavelengths['nm610']} onChange={(e)=>{wavelengths1.current = {...wavelengths1.current,nm610:e.target.value}}} disabled={edit}></TextField>
        </FormGroup>     
        <FormGroup column='column'>
        <h5>630</h5>
        <TextField defaultValue={wavelengths['nm630']} onChange={(e)=>{wavelengths1.current = {...wavelengths1.current,nm630:e.target.value}}} disabled={edit}></TextField>
        </FormGroup>     
        <FormGroup column='column'>
        <h5>660</h5>
        <TextField defaultValue={wavelengths['nm660']} onChange={(e)=>{wavelengths1.current = {...wavelengths1.current,nm660:e.target.value}}} disabled={edit}></TextField>
        </FormGroup>     
        <FormGroup column='column'>
        <h5>810</h5>
        <TextField defaultValue={wavelengths['nm810']} onChange={(e)=>{wavelengths1.current = {...wavelengths1.current,nm810:e.target.value}}}disabled={edit}></TextField>
        </FormGroup>     
        <FormGroup column='column'>
        <h5>830</h5>
        <TextField defaultValue={wavelengths['nm830']} onChange={(e)=>{wavelengths1.current = {...wavelengths1.current,nm830:e.target.value}}}disabled={edit}></TextField>
        </FormGroup>     
        <FormGroup column='column'>
        <h5>850</h5>
        <TextField defaultValue={wavelengths['nm850']} onChange={(e)=>{wavelengths1.current = {...wavelengths1.current,nm850:e.target.value}}}disabled={edit}></TextField>
        </FormGroup>     
        <FormGroup column='column'>
        <h5>930</h5>
        <TextField defaultValue={wavelengths['nm930']} onChange={(e)=>{wavelengths1.current = {...wavelengths1.current,nm930:e.target.value}}}disabled={edit}></TextField>
        </FormGroup>     
        <FormGroup column='column'>
        <h5>950</h5>
        <TextField defaultValue={wavelengths['nm950']} onChange={(e)=>{wavelengths1.current = {...wavelengths1.current,nm950:e.target.value}}}disabled={edit}></TextField>
        </FormGroup>     
        <FormGroup column='column'>
        <h5>Peak Wavelengths Tested</h5>
        <TextField defaultValue={info.peakWavelengthsTested} onChange={(e)=>{peakWavelengthsTested.current = e.target.value}} disabled={edit}></TextField>
        </FormGroup>     

        </FormGroup>
        <FormLabel>nnEMF</FormLabel>
        <FormGroup row>
        <FormGroup column='column'>
        <h5>EMFE</h5>
        <TextField defaultValue={nnemf.emfe} onChange={(e)=>{emfe.current = e.target.value}} disabled={edit}></TextField>
        </FormGroup>
        <FormGroup column='column'>
        <h5>MAG</h5>
        <TextField defaultValue={nnemf.mag} onChange={(e)=>{mag.current = e.target.value}} disabled={edit}></TextField>
        </FormGroup>
        </FormGroup>

        <FormLabel>Flicker and Sound</FormLabel>
        <FormGroup row>
        <FormGroup column='column'>
        <h5>Flicker</h5>
        <TextField defaultValue={flickernsound.flicker} onChange={(e)=>{flicker.current = e.target.value}} disabled={edit}></TextField>
        </FormGroup>
        <FormGroup column='column'>
        <h5>Sound Levels</h5>
        <TextField defaultValue={flickernsound.soundLevels} onChange={(e)=>{soundLevels.current = e.target.value}} disabled={edit}></TextField>
        </FormGroup>
        </FormGroup>
        </FormControl>
      </Dialog>
    </div>
  );
}


export default memo(Modal);
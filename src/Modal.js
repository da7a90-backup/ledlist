import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import ArrowForwarIosIcon from '@mui/icons-material/ArrowForwardIos';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import Fab from '@mui/material/Fab';
import { FormControl, FormGroup, FormLabel, TextField } from '@mui/material';
import { PlusOneOutlined, Delete } from '@mui/icons-material';
import { insertProduct, updateRecord, deleteRecord } from './services/Data';



const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Modal({data,index}) {

  const { _id, info, cost, yearReleased, leds, features, size, warranty, flickernsound, wavelengths, nnemf} = data;


  const [open, setOpen] = React.useState(false);
  const [edit, setEdit] = React.useState(true);
  const [add, setAdd] = React.useState('');
  const [productName, setProductName] = React.useState(info.productName) 
  const [company, setCompany] = React.useState(info.company) 
  const [class_, setProductClass] = React.useState(info.class)
  const [companyHq, setCompanyHq] = React.useState(info.companyHq)
  const [yearReleased1, setYearReleased] = React.useState(yearReleased)
  const [discountCode, setDiscountCode] = React.useState(info.discountCode)
  const [productLink, setProductLink] = React.useState(info.productLink)
  const [youtubeReview, setYoutubeReview] = React.useState(info.youtubeReview)
  const [discountedPrice, setDiscountedPrice] = React.useState(cost.discountedPrice)
  const [shippingUsa, setShippingUsa] = React.useState(cost.shippingUsa)
  const [shippingIntl, setShippingIntl] = React.useState(cost.shippingIntl)
  const [discountedPerLed, setDiscountedPerLed] = React.useState(cost.discountedPerLed)
  const [discountedPerOutput, setDiscountedPerOutput] = React.useState(cost.discountedPerOutput)
  const [height, setHeight] = React.useState(size.height)
  const [width, setWidth] = React.useState(size.width)
  const [weight, setWeight] = React.useState(size.weight)
  const [pulsing, setPulsing] = React.useState(features.pulsing)
  const [modularSupport, setModularSupport] = React.useState(features.modularSupport)
  const [inbuiltTimer, setInbuiltTimer] = React.useState(features.inbuiltTimer)
  const [stands, setStands] = React.useState(features.stands)
  const [warranty1, setWarranty] = React.useState(warranty.warranty)
  const [leds1, setLeds] = React.useState(leds.leds)
  const [ledDualChip, setLedDualChip] = React.useState(leds.ledDualChip)
  const [totalPowerOutput, setTotalPowerOutput] = React.useState(leds.totalPowerOutput)
  const [avCombinedPower, setAvCombinedPower] = React.useState(leds.avCombinedPower)
  const [peakPower, setPeakPower] = React.useState(leds.peakPower)
  const [wavelengths1, setWaveLengths] = React.useState(wavelengths)
  const [peakWavelengthsTested, setPeakWavelengthsTested] = React.useState(info.peakWavelengthsTested)
  const [emfe, setEmfe] = React.useState(nnemf.emfe)
  const [mag, setMag] = React.useState(nnemf.mag)
  const [flicker, setFlicker] = React.useState(flickernsound.flicker)
  const [soundLevels, setSoundLevels] = React.useState(flickernsound.soundLevels)

  const handleEdit = () => {
    setEdit(!edit);
  };

  const handleAdd = async () => {
    const product = {
      info:{productName,
      company,
      class: class_,
      companyHq,
      discountCode,
      productLink,
      youtubeReview,
      peakWavelengthsTested},
      cost:{
      discountedPrice,
      shippingUsa,
      shippingIntl,
      discountedPerLed,
      discountedPerOutput,
      },
      yearReleased: yearReleased1,
      size:
      { 
      height,
      width,
      weight
      },
      features:{
      pulsing,
      modularSupport,
      inbuiltTimer,
      stands
      },
      warranty: 
      {
        warranty: warranty1
      },
      leds:
      {
      leds: leds1,
      ledDualChip,
      totalPowerOutput,
      avCombinedPower,
      peakPower
      },
      wavelengths:
      {
      wavelengths1 
      },
      nnemf:{
      emfe,
      mag
      },
      flickernsound:
      {
      flicker,
      soundLevels}
    }

    console.log(product)

    const insert = await insertProduct(product);

    if(insert.status === 200) {
      alert("product inserted in database!");
      setOpen(false)
    } else{
      alert("there was an error inserting the record in the database.")
    }
  }

  const handleDeleteRecord = async () => {
    const deleteRec = await deleteRecord(_id);

    if(deleteRec.status === 200) {
      alert("product edited successfully!");
      setOpen(false)
    } else{
      alert("there was an error editing the record in the database.")
    }

  }

  const handleEditRecord = async () => {
    const product = {
      info:{productName,
      company,
      class: class_,
      companyHq,
      discountCode,
      productLink,
      youtubeReview,
      peakWavelengthsTested},
      cost:{
      discountedPrice,
      shippingUsa,
      shippingIntl,
      discountedPerLed,
      discountedPerOutput,
      },
      yearReleased: yearReleased1,
      size:
      { 
      height,
      width,
      weight
      },
      features:{
      pulsing,
      modularSupport,
      inbuiltTimer,
      stands
      },
      warranty: 
      {
        warranty: warranty1
      },
      leds:
      {
      leds: leds1,
      ledDualChip,
      totalPowerOutput,
      avCombinedPower,
      peakPower
      },
      wavelengths:
      {
      wavelengths1 
      },
      nnemf:{
      emfe,
      mag
      },
      flickernsound:
      {
      flicker,
      soundLevels}
    }

    console.log(product)


    const insert = await updateRecord(product, _id);

    if(insert.status === 200) {
      alert("product edited successfully!");
      setOpen(false)
    } else{
      alert("there was an error editing the record in the database.")
    }
  }

  const handleClickOpen = () => {
    const passphrase = prompt("Please enter the password here");
    if(passphrase===null){
      return
    }
    if(passphrase!=="1xelA@fEr"){
      alert("you don't have access to this!")
      return
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
    <IconButton onClick={handleClickOpen}>
      {index}
      </IconButton>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative', background: 'white', color: '#2c6fbb' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Product Details
            </Typography>
            <IconButton>
              <Delete onClick={handleDeleteRecord} autoFocus color='inherit'></Delete>
            </IconButton>
            <IconButton sx={{marginRight: '35px'}}> 
            <EditIcon onClick={handleEdit} autoFocus color="inherit">  
            </EditIcon>
            </IconButton>
           <IconButton> 
            <SaveIcon autoFocus color="inherit" onClick={handleEditRecord}>
            </SaveIcon>
            </IconButton>

            <IconButton> 
            <PlusOneOutlined onClick={handleAdd} autoFocus color="inherit">  
            </PlusOneOutlined>
            </IconButton>
            
          </Toolbar>
        </AppBar>
        <FormControl>
        <FormLabel>General Info</FormLabel>
        <FormGroup row>
        <FormGroup column='column'>
        <h5>Product Name</h5>
        <TextField defaultValue={info.productName} onChange={(e)=>{setProductName(e.target.value)}} disabled={edit}></TextField>
        </FormGroup>

        <FormGroup column='column'>
             <h5>Product Company</h5>
        <TextField defaultValue={info.company} onChange={(e)=>{setCompany(e.target.value)}} disabled={edit}></TextField>
          </FormGroup>

          <FormGroup column='column'>
              <h5>Company Location</h5>
        <TextField defaultValue={info.companyHq} onChange={(e)=>{setCompanyHq(e.target.value)}} disabled={edit}></TextField>
          </FormGroup>
          <FormGroup column='column'>
          <h5>Product Class</h5>
        <TextField defaultValue={info.class} onChange={(e)=>{setProductClass(e.target.value)}} disabled={edit}></TextField>
          </FormGroup>
          <FormGroup column='column'>
          <h5>Year Released</h5>
        <TextField defaultValue={yearReleased} onChange={(e)=>{setYearReleased(e.target.value)}} disabled={edit}></TextField>
          </FormGroup>
          <FormGroup column='column'>
          <h5>Discount Code</h5>
        <TextField defaultValue={info.discountCode} onChange={(e)=>{setDiscountCode(e.target.value)}} disabled={edit}></TextField>
          </FormGroup>

          <FormGroup column='column'>
          <h5>Product Link</h5>
        <TextField defaultValue={info.productLink} onChange={(e)=>{setProductLink(e.target.value)}} disabled={edit}></TextField>
          </FormGroup>

          <FormGroup column='column'>
          <h5>Youtube Review</h5>
        <TextField defaultValue={info.youtubeReview} onChange={(e)=>{setYoutubeReview(e.target.value)}} disabled={edit}></TextField>
          </FormGroup>


        </FormGroup>
        <FormLabel>Cost and Dimensions</FormLabel>
        <FormGroup row>
        <FormGroup column='column'>
          <h5>Disounted Price</h5>
        <TextField defaultValue={cost.discountedPrice} onChange={(e)=>{setDiscountedPrice(e.target.value)}} disabled={edit}></TextField>
        </FormGroup>
        <FormGroup column='column'>
          <h5>Shipping U.S</h5>
          <TextField defaultValue={cost.shippingUsa} onChange={(e)=>{setShippingUsa(e.target.value)}} disabled={edit}></TextField>
        </FormGroup>
        <FormGroup column='column'>
          <h5>Shipping Intl</h5>
          <TextField defaultValue={cost.shippingIntl} onChange={(e)=>{setShippingIntl(e.target.value)}} disabled={edit}></TextField>
        </FormGroup>
        <FormGroup column='column'>
          <h5> Discounted Per Led</h5>
        <TextField defaultValue={cost.discountedPerLed} onChange={(e)=>{setDiscountedPerLed(e.target.value)}} disabled={edit}></TextField>
        </FormGroup>
        <FormGroup column='column'>
          <h5>Discounted Per Output</h5>
        <TextField defaultValue={cost.discountedPerOutput} onChange={(e)=>{setDiscountedPerOutput(e.target.value)}} disabled={edit}></TextField>
        </FormGroup>
        <FormGroup column='column'>
          <h5>Height</h5>
        <TextField defaultValue={size.height} onChange={(e)=>{setHeight(e.target.value)}} disabled={edit}></TextField>
        </FormGroup>        
        <FormGroup column='column'>
        <h5>Width</h5>
        <TextField defaultValue={size.width} onChange={(e)=>{setWidth(e.target.value)}} disabled={edit}></TextField>
        </FormGroup>        
        <FormGroup column='column'>
        <h5>Weight</h5>
        <TextField defaultValue={size.weight} onChange={(e)=>{setWeight(e.target.value)}} disabled={edit}></TextField>
        </FormGroup>        
        </FormGroup>

        <FormLabel>Features and Warranty</FormLabel>
        <FormGroup row>
        <FormGroup column='column'>
        <h5>Pulsing</h5>
        <TextField defaultValue={features.pulsing} onChange={(e)=>{setPulsing(e.target.value)}} disabled={edit}></TextField>
        </FormGroup>        
        <FormGroup column='column'>
        <h5>Modular Support</h5>
        <TextField defaultValue={features.modularSupport} onChange={(e)=>{setModularSupport(e.target.value)}} disabled={edit}></TextField>
        </FormGroup>        
        <FormGroup column='column'>
        <h5>Stands</h5>
        <TextField defaultValue={features.stands} onChange={(e)=>{setStands(e.target.value)}} disabled={edit}></TextField>
        </FormGroup>        
        <FormGroup column='column'>
        <h5>Inbuilt Timer</h5>
        <TextField defaultValue={features.inbuiltTimer} onChange={(e)=>{setInbuiltTimer(e.target.value)}} disabled={edit}></TextField>
        </FormGroup>        
        <FormGroup column='column'>
        <h5>Warranty</h5>
        <TextField defaultValue={warranty.warranty} onChange={(e)=>{setWarranty(e.target.value)}} disabled={edit}></TextField>
        </FormGroup>        
        </FormGroup>

        <FormLabel>LEDS, Power and Wavelengths</FormLabel>
        <FormGroup row>
        <FormGroup column='column'>
        <h5>LEDs</h5>
        <TextField defaultValue={leds.leds} onChange={(e)=>{setLeds(e.target.value)}} disabled={edit}></TextField>
        </FormGroup>        
        <FormGroup column='column'>
        <h5>LED Dual Chip</h5>
        <TextField defaultValue={leds.ledDualChip} onChange={(e)=>{setLedDualChip(e.target.value)}} disabled={edit}></TextField>
        </FormGroup>
        <FormGroup column='column'>
        <h5>Total Power Output</h5>
        <TextField defaultValue={leds.totalPowerOutput} onChange={(e)=>{setTotalPowerOutput(e.target.value)}} disabled={edit}></TextField>
        </FormGroup>
        <FormGroup column='column'>
        <h5>Average Combined Power</h5>
        <TextField defaultValue={leds.avCombinedPower} onChange={(e)=>{setAvCombinedPower(e.target.value)}} disabled={edit}></TextField>
        </FormGroup>     
        <FormGroup column='column'>
        <h5>Peak Power</h5>
        <TextField defaultValue={leds.peakPower} onChange={(e)=>{setPeakPower(e.target.value)}} disabled={edit}></TextField>
        </FormGroup>     
        <FormGroup column='column'>
        <h5>480</h5>
        <TextField defaultValue={wavelengths['nm480']} onChange={(e)=>{setWaveLengths({...wavelengths1,nm480: e.target.value})}} disabled={edit}></TextField>
        </FormGroup>     
        <FormGroup column='column'>
        <h5>610</h5>
        <TextField defaultValue={wavelengths['nm610']} onChange={(e)=>{setWaveLengths({...wavelengths1,nm610:e.target.value})}} disabled={edit}></TextField>
        </FormGroup>     
        <FormGroup column='column'>
        <h5>630</h5>
        <TextField defaultValue={wavelengths['nm630']} onChange={(e)=>{setWaveLengths({...wavelengths1,nm630:e.target.value})}} disabled={edit}></TextField>
        </FormGroup>     
        <FormGroup column='column'>
        <h5>660</h5>
        <TextField defaultValue={wavelengths['nm660']} onChange={(e)=>{setWaveLengths({...wavelengths1,nm660:e.target.value})}} disabled={edit}></TextField>
        </FormGroup>     
        <FormGroup column='column'>
        <h5>810</h5>
        <TextField defaultValue={wavelengths['nm810']} onChange={(e)=>{setWaveLengths({...wavelengths1,nm810:e.target.value})}}disabled={edit}></TextField>
        </FormGroup>     
        <FormGroup column='column'>
        <h5>830</h5>
        <TextField defaultValue={wavelengths['nm830']} onChange={(e)=>{setWaveLengths({...wavelengths1,nm830:e.target.value})}}disabled={edit}></TextField>
        </FormGroup>     
        <FormGroup column='column'>
        <h5>850</h5>
        <TextField defaultValue={wavelengths['nm850']} onChange={(e)=>{setWaveLengths({...wavelengths1,nm850:e.target.value})}}disabled={edit}></TextField>
        </FormGroup>     
        <FormGroup column='column'>
        <h5>930</h5>
        <TextField defaultValue={wavelengths['nm930']} onChange={(e)=>{setWaveLengths({...wavelengths1,nm930:e.target.value})}}disabled={edit}></TextField>
        </FormGroup>     
        <FormGroup column='column'>
        <h5>950</h5>
        <TextField defaultValue={wavelengths['nm950']} onChange={(e)=>{setWaveLengths({...wavelengths1,nm950:e.target.value})}}disabled={edit}></TextField>
        </FormGroup>     
        <FormGroup column='column'>
        <h5>Peak Wavelengths Tested</h5>
        <TextField defaultValue={info.peakWavelengthsTested} onChange={(e)=>{setPeakWavelengthsTested(e.target.value)}} disabled={edit}></TextField>
        </FormGroup>     

        </FormGroup>
        <FormLabel>nnEMF</FormLabel>
        <FormGroup row>
        <FormGroup column='column'>
        <h5>EMFE</h5>
        <TextField defaultValue={nnemf.emfe} onChange={(e)=>{setEmfe(e.target.value)}} disabled={edit}></TextField>
        </FormGroup>
        <FormGroup column='column'>
        <h5>MAG</h5>
        <TextField defaultValue={nnemf.mag} onChange={(e)=>{setMag(e.target.value)}} disabled={edit}></TextField>
        </FormGroup>
        </FormGroup>

        <FormLabel>Flicker and Sound</FormLabel>
        <FormGroup row>
        <FormGroup column='column'>
        <h5>Flicker</h5>
        <TextField defaultValue={flickernsound.flicker} onChange={(e)=>{setFlicker(e.target.value)}} disabled={edit}></TextField>
        </FormGroup>
        <FormGroup column='column'>
        <h5>Sound Levels</h5>
        <TextField defaultValue={flickernsound.soundLevels} onChange={(e)=>{setSoundLevels(e.target.value)}} disabled={edit}></TextField>
        </FormGroup>
        </FormGroup>
        </FormControl>
      </Dialog>
    </div>
  );
}
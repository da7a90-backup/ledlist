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



const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Modal(props) {
  const [open, setOpen] = React.useState(false);
  const [edit, setEdit] = React.useState(true);

  const handleEdit = () => {
    setEdit(!edit);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
    <IconButton onClick={handleClickOpen}>
      <ArrowForwarIosIcon>
      </ArrowForwarIosIcon>
      </IconButton>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative', background: 'white', color: '#9c27b0' }}>
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
            <SaveIcon autoFocus color="inherit" onClick={handleClose}>
            </SaveIcon>
            </IconButton>
            
          </Toolbar>
        </AppBar>
        <FormControl>
        <FormLabel>General Info</FormLabel>
        <FormGroup row>
        <TextField defaultValue={props.productName} disabled={edit}></TextField>
        <TextField defaultValue={props.info.company} disabled={edit}></TextField>
        <TextField defaultValue={props.info.class} disabled={edit}></TextField>
        <TextField defaultValue={props.info.yearReleased} disabled={edit}></TextField>
        <TextField defaultValue={props.info.discountCode} disabled={edit}></TextField>
        <TextField defaultValue={props.info.productLink} disabled={edit}></TextField>
        <TextField defaultValue={props.info.youtubeReview} disabled={edit}></TextField>

        </FormGroup>
        <FormLabel>Cost and Dimensions</FormLabel>
        <FormGroup row>
        <TextField defaultValue={props.cost.discountedPrice} disabled={edit}></TextField>
        <TextField defaultValue={props.cost.shippingUsa} disabled={edit}></TextField>
        <TextField defaultValue={props.cost.shippingAus} disabled={edit}></TextField>
        <TextField defaultValue={props.cost.shippingUk} disabled={edit}></TextField>
        <TextField defaultValue={props.size.height} disabled={edit}></TextField>
        <TextField defaultValue={props.size.width} disabled={edit}></TextField>
        <TextField defaultValue={props.size.weight} disabled={edit}></TextField>
        <TextField defaultValue={props.size.cableLength} disabled={edit}></TextField>
        </FormGroup>
        <FormLabel>Features and Warranty</FormLabel>
        <FormGroup row>
        <TextField defaultValue={props.features.pulsing} disabled={edit}></TextField>
        <TextField defaultValue={props.features.modularSupport} disabled={edit}></TextField>
        <TextField defaultValue={props.features.stands} disabled={edit}></TextField>
        <TextField defaultValue={props.features.inbuiltTimer} disabled={edit}></TextField>
        <TextField defaultValue={props.warranty.warranty} disabled={edit}></TextField>
        <TextField defaultValue={props.warranty.returnPolicy} disabled={edit}></TextField>
        </FormGroup>
        <FormLabel>LEDS and Wavelengths</FormLabel>
        <FormGroup row>
        <TextField defaultValue={props.leds.leds} disabled={edit}></TextField>
        <TextField defaultValue={props.leds.ledDualChip} disabled={edit}></TextField>
        <TextField defaultValue={props.leds.ledChipPower} disabled={edit}></TextField>
        <TextField defaultValue={props.wavelengths['480']} disabled={edit}></TextField>
        <TextField defaultValue={props.wavelengths['610']} disabled={edit}></TextField>
        <TextField defaultValue={props.wavelengths['630']} disabled={edit}></TextField>
        <TextField defaultValue={props.wavelengths['660']} disabled={edit}></TextField>
        <TextField defaultValue={props.wavelengths['810']} disabled={edit}></TextField>
        <TextField defaultValue={props.wavelengths['830']} disabled={edit}></TextField>
        <TextField defaultValue={props.wavelengths['850']} disabled={edit}></TextField>
        <TextField defaultValue={props.wavelengths['930']} disabled={edit}></TextField>
        <TextField defaultValue={props.wavelengths['950']} disabled={edit}></TextField>
        <TextField defaultValue={props.wavelengths.peakWavelengthsTested} disabled={edit}></TextField>
        </FormGroup>
        <FormLabel>Power and defaultValue</FormLabel>
        <FormGroup row>
        <TextField defaultValue={props.power.totalPowerOutput} disabled={edit}></TextField>
        <TextField defaultValue={props.power.avCombinedPower} disabled={edit}></TextField>
        <TextField defaultValue={props.power.peakPower} disabled={edit}></TextField>
        <TextField defaultValue={props.power.wattageDraw} disabled={edit}></TextField>
        <TextField defaultValue={props.value.discountedPerLed} disabled={edit}></TextField>
        <TextField defaultValue={props.value.discountedPerOutput} disabled={edit}></TextField>
        </FormGroup>
        <FormLabel>nnEMF</FormLabel>
        <FormGroup row>
        <TextField defaultValue={props.nnemf.emf3i} disabled={edit}></TextField>
        <TextField defaultValue={props.nnemf.emf6i} disabled={edit}></TextField>
        <TextField defaultValue={props.nnemf.mag3i} disabled={edit}></TextField>
        <TextField defaultValue={props.nnemf.mag6i} disabled={edit}></TextField>
        <TextField defaultValue={props.nnemf.mico3i} disabled={edit}></TextField>
        <TextField defaultValue={props.nnemf.mico6i} disabled={edit}></TextField>
        </FormGroup>
        <FormLabel>Flicker and Sound</FormLabel>
        <FormGroup row>
        <TextField defaultValue={props.flickernsound.flicker} disabled={edit}></TextField>
        <TextField defaultValue={props.flickernsound.soundLevels} disabled={edit}></TextField>
        </FormGroup>
        </FormControl>

        <Fab onClick={handleEdit} sx={{  position: 'absolute', bottom: 16, right: 16,}}>
          <EditIcon autoFocus color="inherit">  
            </EditIcon></Fab>
      </Dialog>
    </div>
  );
}
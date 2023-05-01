import React, {useState, memo} from "react";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Zoom from '@mui/material/Zoom';
import FormLabel from "@mui/material/FormLabel";
import FormGroup from "@mui/material/FormGroup";
import { Popover } from "@mui/material";
import { ArrowBackIos, HelpOutline } from "@mui/icons-material";
import { FormControl } from "@mui/material";
import { IconButton } from "@mui/material";

const CustomHintButton = ({col, sortBy, setSortBy})=>{

    const [anchorEl, setAnchorEl] = useState(null);


    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const open = Boolean(anchorEl);

             
    if(!col || !col.data || !col.data[0])
    return ;

  let columProperties = Object.keys(col.data[0].data[col.colPosition]);

  const conditionalRendering = (sortBy) => {
    if(sortBy === 'height' || sortBy === 'width' || sortBy ==='weight')
     {
      return sortBy === columProperties[columProperties.length - 1] 
    }
     else {
       return sortBy === columProperties[columProperties.length - 2]
      }
  }
  

  const onClickSortByForwrd = () => {
    conditionalRendering(sortBy) ?
      setSortBy(columProperties[0]) :
      setSortBy(columProperties[ columProperties.indexOf(sortBy) + 1]);
  }


  return <>
  <IconButton onClick={onClickSortByForwrd}><ArrowForwardIosIcon></ArrowForwardIosIcon></IconButton>
    </>
  }

export default memo(CustomHintButton); // IMPORTANT


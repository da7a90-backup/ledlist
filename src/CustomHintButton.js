import React, {useState, memo} from "react";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Zoom from '@mui/material/Zoom';
import FormLabel from "@mui/material/FormLabel";
import FormGroup from "@mui/material/FormGroup";
import { Popover } from "@mui/material";
import { ArrowBackIos, Check, HelpOutline } from "@mui/icons-material";
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
  
  const onClickSortByBack = () => {
    sortBy === 0 ? setSortBy(columProperties.length-1) : setSortBy(sortBy - 1)
  }
  const onClickSortByForwrd = () => {
    sortBy === columProperties.length-1 ? setSortBy(0) : setSortBy(sortBy + 1)
  }


  return <>
  <IconButton onClick={handleClick}><HelpOutline></HelpOutline></IconButton>
  <Popover 
    TransitionComponent={Zoom}
    onClose={handleClose}
    open={open}
    anchorEl={anchorEl}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
    }}
    componentsProps={{
        popover: {
            sx: {
                background: '#ffff',
                color: '#000',
                fontSize: "1em",
                //width: "200px",
                border: '1px solid #2c6fbb',
                borderRadius: "10px 10px",
                boxShadow: "5px 5px 5px 5px rgb(0 0 0 / 20%), 0px 5px 6px 0px rgb(0 0 0 / 14%), 0px 4px 10px 0px rgb(0 0 0 / 12%)"
              }
        }
      }}
    > 
    <React.Fragment> 

<FormGroup>
<FormControl>   
<FormLabel>Sort By</FormLabel>
<FormGroup row={true}>
  <IconButton onClick={onClickSortByBack}><ArrowBackIos/></IconButton>{columProperties[sortBy]}<IconButton onClick={onClickSortByForwrd}><ArrowForwardIosIcon/></IconButton>
  </FormGroup>
</FormControl>
</FormGroup>
  </React.Fragment>
    </Popover>
    </>
  }

export default memo(CustomHintButton); // IMPORTANT

